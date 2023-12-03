'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Brief: switch the vibe of the img and make it sound like elon, keep it super short and make it funny
 */
export default async function switchVibeWithElon(
  fewShotExamples: string,
  imageDescription: string,
  lastVibe: string | undefined
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Based on these few-shot examples ${fewShotExamples}, transform the vibe of this image ${imageDescription} in less then 2 short and witty sentences. The last image had a ${lastVibe} feel. Now, we're aiming for something different. Please respond in a style reminiscent of Elon Musk – think big, innovative, with a touch of daring futurism, but infuse your response with a subtle humor. Keep it brief and to the point. Your explanation should reflect a leap in creativity and technology, similar to Musk's approach, but with an unexpectedly witty twist. Vibe switch:`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return response.choices[0].message.content ?? '';
}
