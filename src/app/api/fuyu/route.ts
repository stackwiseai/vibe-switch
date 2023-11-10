import fs from 'fs';
import path from 'path';
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

  const filePath = path.join(
    process.cwd(),
    'src',
    'lib',
    'prompts',
    'fuyu.txt'
  );

  const prompt = fs.readFileSync(filePath, 'utf8');

  const version =
    'lucataco/fuyu-8b:42f23bc876570a46f5a90737086fbc4c3f79dd11753a28eaa39544dd391815e9';
  const prediction = await replicate.run(version, {
    input: {
      image: body.image,
      prompt: prompt,
      max_new_tokens: 512,
    },
  });

  console.log(prediction);

  return new Response(JSON.stringify(prediction), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
