'use server';

import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

/**
 * Brief: use the prompt to transform the image, choose the model
 */
export default async function transformImageWithModel(
  prompt: string,
  image: string
): Promise<string> {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const version =
    '30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f';
  const firstPrediction = await replicate.predictions.create({
    version,
    input: {
      prompt,
      image,
    },
  });

  let prediction;
  const startTime = Date.now();
  const timeout = 10000;

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
    if (data.status === 'completed' || Date.now() - startTime > timeout) {
      prediction = data;
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay between each poll
  }

  return prediction.output[0];
}
