import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
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

  try {
    // Check if body.image is defined and is a valid data URL
    if (
      !body.image ||
      typeof body.image !== 'string' ||
      !body.image.startsWith('data:image/')
    ) {
      throw new Error('Invalid or missing image data');
    }

    const base64Data = body.image.split(',')[1];
    if (!base64Data) {
      throw new Error('No base64 data found in image data URL');
    }
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Load the image using sharp
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (metadata.format !== 'jpeg') {
      const jpgBuffer = await image.jpeg().toBuffer();
      body.image = `data:image/jpeg;base64,${jpgBuffer.toString('base64')}`;
    }
  } catch (e) {
    console.log(e);
  }

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

  return new Response(JSON.stringify(prediction), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
