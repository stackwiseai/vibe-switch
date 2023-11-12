'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Messages from '@/components/messages';
import PromptForm from '@/components/prompt-form';
import Footer from '@/components/footer';

import prepareImageFileForUpload from '@/lib/prepare-image-file-for-upload';
import { getRandomSeed, Seed, convertImageToBase64 } from '@/lib/seeds';
import { appName, appMetaDescription, appSubtitle } from '@/lib/constants';

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

interface Event {
  image?: string;
  prompt?: string;
  ai?: string;
  fuyu?: string;
}

export interface Prediction {
  id: string;
  status: string;
  output?: string[];
  detail?: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
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

    const fuyuResponse = await fetch('/api/fuyu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    let fuyu = await fuyuResponse.json();

    if (fuyuResponse.status !== 201) {
      setError(fuyu.detail);
      return;
    }

    setEvents((prevEvents) => [...prevEvents, { fuyu: fuyu.substring(1) }]);
    const lastVibe = events.findLast((ev) => ev.ai)?.ai;

    const aiResponse = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: fuyu.substring(1),
        prevVibe: lastVibe,
      }),
    });
    let vibeString = await aiResponse.json();

    if (aiResponse.status !== 201) {
      setError(vibeString.detail);
      return;
    }

    const [vibeResponse, transformation] = vibeString.split('Transformation:');

    setEvents((prevEvents) => [...prevEvents, { ai: vibeResponse }]);

    const predictionBody = {
      prompt: vibeResponse,
      image: base64Image,
    };

    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(predictionBody),
    });
    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(500);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }

      // just for bookkeeping
      setPredictions(predictions.concat([prediction]));
      setCurrPrediction(prediction);

      if (prediction.status === 'succeeded') {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            image: prediction.output?.[prediction.output.length - 1],
          },
          { ai: `Vibe Switch: ${transformation}` },
          // { ai: 'What should we change now?' },
        ]);
      }
    }

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
        <meta
          property="og:image"
          content="https://paintbytext.chat/opengraph.jpg"
        />
      </Head>

      <main className="container max-w-[700px] mx-auto p-5">
        <hgroup>
          <h1 className="text-center text-5xl font-bold m-6">{appName}</h1>
          <p className="text-center text-xl opacity-60 m-6">{appSubtitle}</p>
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
