import { vibeSwitchTemplate } from '../../../lib/prompts/base';
import { ChatOpenAI } from 'langchain/chat_models/openai';

export async function POST(req: Request) {
  const body = await req.json();

  const model = new ChatOpenAI({});

  const chain = vibeSwitchTemplate.pipe(model);

  const result = await chain.invoke({
    originalDescription: body.description,
    prevVibe: body.prevVibe
      ? `\nThe previous vibe of the image was ${body.prevVibe}. Make sure to do something different this time around.`
      : '',
  });

  return new Response(JSON.stringify(result.content), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const runtime = 'edge';
