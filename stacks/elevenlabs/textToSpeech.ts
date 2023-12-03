'use server';

import fs from 'fs';
import axios from 'axios';

interface OutType {
  fileName: string;
}

/**
 * Brief: text to speech using the voice id
 */
export default async function textToSpeech(
  id: string,
  text: string
): Promise<OutType> {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${id}`,
    {
      model_id: 'eleven_turbo_v2',
      text: text,
      voice_settings: {
        similarity_boost: 0.8,
        stability: 0.5,
      },
    },
    {
      headers: {
        Accept: 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        cache: 'no-store',
      },
      responseType: 'stream',
    }
  );

  const fileName = `${id}.mp3`;
  const filePath = `public/${fileName}`;

  const writeStream = fs.createWriteStream(filePath);
  response.data.pipe(writeStream);

  return new Promise((resolve, reject) => {
    const responseJson = {
      fileName: fileName,
    };
    writeStream.on('finish', () => resolve(responseJson));

    writeStream.on('error', reject);
  });
}
