'use client';

import Head from 'next/head';
import Link from 'next/link';
import { BsArrowLeftShort } from 'react-icons/bs';

import { appName } from '@/lib/constants';

export default function About() {
  return (
    <div>
      <Head>
        <title>{appName}</title>
      </Head>

      <main className="container max-w-[600px] mx-auto p-5">
        <h1 className="text-center text-5xl font-bold m-6">{appName}</h1>

        <p className="prose">
          Vibe Switch is an open-source website offering a unique way to alter
          images through text descriptions. Simply upload a photo, click `Vibe
          Switch``, and the AI will create a new image reflecting those
          adjustments. This tool is perfect for creatively transforming the
          atmosphere or mood of your pictures, using straightforward text-based
          commands.
        </p>

        <p className="prose">
          The image descriptions are powered by{' '}
          <Link href="https://www.adept.ai/blog/fuyu-8b">Fuyu</Link>, a cutting
          edge open-source machine learning model from Adept.
        </p>

        <p className="prose">
          The Vibe Switch requests are powered by{' '}
          <Link href="https://openai.com/">OpenAI</Link>, a cutting edge machine
          learning language model.
        </p>

        <p className="prose">
          The image generation is powered by{' '}
          <Link href="https://www.timothybrooks.com/instruct-pix2pix/">
            InstructPix2Pix
          </Link>
          , an open-source machine learning model that combines the knowledge
          from <Link href="https://openai.com/api/">GPT-3</Link> and{' '}
          <Link href="https://replicate.com/stability-ai/stable-diffusion?utm_source=project&utm_campaign=paintbytext">
            Stable Diffusion
          </Link>{' '}
          to generate a large dataset of image editing examples. This model was
          created at the University of California, Berkeley by{' '}
          <Link href="https://timothybrooks.com/about">Tim Brooks</Link>,{' '}
          <Link href="http://www.holynski.org/">Aleksander Holynski</Link>, and{' '}
          <Link href="https://people.eecs.berkeley.edu/~efros/">
            Alexei A. Efros
          </Link>
          .
        </p>

        <p className="prose">
          The image models are hosted on, replicate{' '}
          <Link href="https://replicate.com/timothybrooks/instruct-pix2pix?utm_source=project&utm_campaign=vibeswitch">
            InstructPix2Pix
          </Link>
          <Link href="https://replicate.com/lucataco/fuyu-8b?utm_source=project&utm_campaign=vibeswitch">
            Fuyu
          </Link>
          , which exposes a cloud API for running predictions. This website is
          built with Next.js and hosted on
          <Link href="https://vercel.com/templates/ai">Vercel</Link>. The source
          code is publicly available on{' '}
          <Link href="https://github.com/stackwiseai/vibe-switch">GitHub</Link>.
          Pull requests welcome!
        </p>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="bg-black text-white rounded-md text-small inline-block p-3 flex-none"
          >
            <BsArrowLeftShort className="icon" />
            Back to modifying vibes
          </Link>
        </div>
      </main>
    </div>
  );
}
