'use client';
import describeImageWithPrompt from '../../stacks/replicate/describeImage';
import switchVibeWithElon from '../../stacks/openai/switchVibeWithElon';
import textToSpeech from '../../stacks/elevenlabs/textToSpeech';
import transformImageWithModel from '../../stacks/replicate/transformImageWithModel';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Messages from '@/components/messages';
import PromptForm from '@/components/prompt-form';
import Footer from '@/components/footer';
import { fuyuPrompt } from '@/lib/prompts/fuyu';

import prepareImageFileForUpload from '@/lib/prepare-image-file-for-upload';
import { getRandomSeed, Seed, convertImageToBase64 } from '@/lib/seeds';
import { appName, appMetaDescription, appSubtitle } from '@/lib/constants';
import { fewShotExamples } from '@/lib/prompts/base';
import Link from 'next/link';

interface Event {
  image?: string;
  prompt?: string;
  ai?: string;
  desc?: string;
}

export interface Prediction {
  id: string;
  status: string;
  output?: string[];
  detail?: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [seed] = useState<Seed>(getRandomSeed());
  const [currPrediction, setCurrPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    setEvents([{ image: seed.image }]); // , { ai: 'What should we change?' }
  }, [seed.image]);

  const handleImageDropped = async (imageFile: File) => {
    try {
      const imageUrl = await prepareImageFileForUpload(imageFile);
      setEvents(events.concat([{ image: imageUrl }]));
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const handleSubmit = async () => {
    const lastImage = events.findLast((ev) => ev.image)?.image;

    if (!lastImage) {
      setError('No image to process');
      setIsProcessing(false);
      return;
    }

    setError(null);
    setIsProcessing(true);

    const myEvents = [...events];
    setEvents(myEvents);

    const base64Image = await convertImageToBase64(lastImage);

    const imageDescription = await describeImageWithPrompt(
      base64Image,
      fuyuPrompt
    );

    setEvents((prevEvents) => [...prevEvents, { desc: imageDescription }]);
    const lastVibe = events.findLast((ev) => ev.ai)?.ai;

    const vibeString = await switchVibeWithElon(
      fewShotExamples,
      imageDescription,
      lastVibe
    );

    const [vibeResponse, transformation] = vibeString.split('Transformation:');

    setEvents((prevEvents) => [...prevEvents, { ai: vibeResponse }]);

    const speech = await textToSpeech('aPEXVxiTAkCk4Di4NDnV', vibeResponse);
    const audio = new Audio(speech.fileName);
    audio.play();

    const imageData = await transformImageWithModel(vibeResponse, base64Image);

    setEvents((prevEvents) => [
      ...prevEvents,
      {
        image: imageData,
      },
      { ai: `Vibe Switch: ${transformation}` },
    ]);

    setIsProcessing(false);
  };

  const startOver = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEvents(events.slice(0, 1));
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div>
      <Head>
        <title>{appName}</title>
        <meta name="description" content={appMetaDescription} />
        <meta property="og:title" content={appName} />
        <meta property="og:description" content={appMetaDescription} />
      </Head>

      <main className="container max-w-[700px] mx-auto p-5">
        <hgroup>
          <h1 className="text-center text-5xl font-bold m-6">{appName}</h1>
          <p className="text-center text-xl opacity-60 m-6">
            {appSubtitle}{' '}
            <Link href="https://stackwise.ai/" target="_blank">
              A <span className="text-blue-900">Stackwise</span> creation.
            </Link>
          </p>
        </hgroup>

        <Messages
          events={events}
          isProcessing={isProcessing}
          onUndo={(index) => {
            setEvents(
              events.slice(0, index - 1).concat(events.slice(index + 1))
            );
          }}
          prediction={currPrediction}
        />

        <PromptForm
          isFirstPrompt={events.length === 1}
          onSubmit={handleSubmit}
          disabled={isProcessing}
        />

        <div className="mx-auto w-full">
          {error && <p className="bold text-red-500 pb-5">{error}</p>}
        </div>

        <Footer
          events={events}
          startOver={startOver}
          handleImageDropped={handleImageDropped}
        />
      </main>
    </div>
  );
}
