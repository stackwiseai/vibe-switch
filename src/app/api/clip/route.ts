import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function POST(req: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const body = await req.json();

  const version =
    'lucataco/clip-interrogator:14d81f8a13e8ef87cc9b5eb7d03f5940fc7010e7226e93af612c5f0f4df1a35f';
  const prediction = await replicate.run(version, {
    input: {
      mode: 'fast',
      image: body.image,
      clip_model_name: 'ViT-bigG-14/laion2b_s39b_b160k',
    },
  });

  return new Response(JSON.stringify(prediction), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const runtime = 'edge';
