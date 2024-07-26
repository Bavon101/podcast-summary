// src/pages/api/podcast-summary.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

// Disable Next.js's default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      try {
        // Check if a link or a file is provided
        const podcastLink = Array.isArray(fields.link) ? fields.link[0] : fields.link;
        const podcastFiles = files.audio;
        const podcastFile = Array.isArray(podcastFiles) ? podcastFiles[0] : podcastFiles;

        let transcript = '';

        if (podcastLink) {
          // Download the podcast from the provided link
          const response = await axios.get(podcastLink, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');

          // Save the file temporarily
          const tempFilePath = '/tmp/podcast.mp3';
          fs.writeFileSync(tempFilePath, buffer);

          transcript = await transcribeAudio(tempFilePath);

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
        } else if (podcastFile) {
          // Read the uploaded file
          transcript = await transcribeAudio(podcastFile.filepath);
        } else {
          res.status(400).json({ error: 'No podcast link or audio file provided' });
          return;
        }

        // Generate the summary
        const summary = await summarizeText(transcript);

        res.status(200).json({ summary });
      } catch (error) {
        console.error('Error processing the podcast:', error);
        res.status(500).json({ error: 'Error processing the podcast' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

const transcribeAudio = async (filePath: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('model', 'whisper-1');

  const response = await axios.post(
    'https://api.openai.com/v1/audio/transcriptions',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders(),
      },
    }
  );

  return response.data.text;
};

const summarizeText = async (text: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes podcast transcripts.',
        },
        {
          role: 'user',
          content: `Summarize the following podcast transcript:\n\n${text}`,
        },
      ],
      max_tokens: 150,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};

export default handler;
