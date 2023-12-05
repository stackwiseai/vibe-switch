import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// POST method handler
export async function POST(req: Request, res: Response) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN not set');
  }

  const body = await req.json();

  const createPrediction = await replicate.predictions.create({
    version: '42f23bc876570a46f5a90737086fbc4c3f79dd11753a28eaa39544dd391815e9',
    input: {
      image: body.image,
      prompt: body.prompt,
    },
  });

  const prediction = await pollPredictionStatus(createPrediction.id);

  // Send the successful prediction response
  return new Response(JSON.stringify(prediction.output), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function pollPredictionStatus(predictionId: string) {
  const url = `https://api.replicate.com/v1/predictions/${predictionId}`;
  const headers = { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` };

  let isCompleted = false;

  while (!isCompleted) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(
        `Error fetching prediction status: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.status === 'succeeded' || data.status === 'failed') {
      isCompleted = true;
      return data; // Return the final data
    }

    // Wait for a short period before polling again
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  }
}
