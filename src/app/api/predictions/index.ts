import packageData from '../../../../package.json';
import type { NextApiRequest, NextApiResponse } from 'next';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
  userAgent: `${packageData.name}/${packageData.version}`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  // remove null and undefined values
  req.body = Object.entries(req.body).reduce(
    (a, [k, v]) => (v == null ? a : { ...a, [k]: v }),
    {} as { [key: string]: any }
  );

  let prediction;
  if (process.env.USE_REPLICATE_DEPLOYMENT) {
    console.log('Using deployment');
    prediction = await replicate.deployments.predictions.create(
      'replicate',
      'paint-by-text',
      {
        input: req.body,
      }
    );
  } else {
    console.log('Not using deployment');
    const version =
      '30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f';
    prediction = await replicate.predictions.create({
      version,
      input: req.body,
    });
  }

  console.log({ prediction });

  res.status(201).json(prediction);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
