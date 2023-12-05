'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Messages from '@/components/messages';
import PromptForm from '@/components/prompt-form';
import Footer from '@/components/footer';

import prepareImageFileForUpload from '@/lib/prepare-image-file-for-upload';
import { getRandomSeed, Seed, convertImageToBase64 } from '@/lib/seeds';
import { appName, appMetaDescription, appSubtitle } from '@/lib/constants';
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
    setEvents([{ image: seed.image }]);
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











    

    // get description of the image
    const imageDescription = ''

    setEvents((prevEvents) => [...prevEvents, { desc: imageDescription }]);

    // get openai to generate a different vibe
    const changedVibeToElon = ''

    setEvents((prevEvents) => [...prevEvents, { ai: changedVibeToElon }]);

    // for fun, talk like Elon
    const speech = ''

    // switch the picture to the different vibe
    const newImage = ''
















    setEvents((prevEvents) => [
      ...prevEvents,
      {
        image: newImage,
      },
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
