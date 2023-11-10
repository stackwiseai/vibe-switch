const API_HOST = process.env.REPLICATE_API_HOST || 'https://api.replicate.com';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`${API_HOST}/v1/predictions/${params.id}`, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`, // Access environment variables via `env`
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    const error = await response.json();
    return new Response(JSON.stringify({ detail: error.detail }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const prediction = await response.json();

  console.log(prediction);
  return new Response(JSON.stringify(prediction), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const fetchCache = 'only-no-store';
