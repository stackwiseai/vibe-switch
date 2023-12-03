'use server';

import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

/**
 * Brief: find a model to get a description of the image. this description should be guided by the prompt
 */
export default async function describeImageWithPrompt(
  image: string,
  prompt: string
): Promise<string> {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const version =
    '42f23bc876570a46f5a90737086fbc4c3f79dd11753a28eaa39544dd391815e9';
  const firstPrediction = await replicate.predictions.create({
    version,
    input: {
      image,
      prompt,
    },
  });

  let prediction;

  while (true) {
    prediction = await fetch(
      `https://api.replicate.com/v1/predictions/${firstPrediction.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
        cache: 'no-store',
      }
    );

    const data = await prediction.json();
    if (data.status === 'succeeded') {
      prediction = data;
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay between each poll
  }

  return prediction.output;
}
