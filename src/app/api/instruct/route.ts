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

  // remove null and undefined values
  const cleanBody = Object.entries(body).reduce(
    (a, [k, v]) => (v == null ? a : { ...a, [k]: v }),
    {} as { [key: string]: any }
  );

  const version =
    'timothybrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f';
  const prediction: any = await replicate.run(version, {
    input: cleanBody,
  });

  return new Response(JSON.stringify(prediction[0]), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const runtime = 'edge';
