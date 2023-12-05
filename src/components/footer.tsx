import React from 'react';
import Dropzone from './dropzone';
import { FaCode, FaInfoCircle, FaDownload } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Link from 'next/link';

// Define the types for the props that the component accepts
interface FooterProps {
  events: { image?: string }[]; // This assumes that events is an array of objects that may have an image property
  startOver: (e: any) => Promise<void>;
  handleImageDropped: (file: File) => void;
}

const Footer: React.FC<FooterProps> = ({
  events,
  startOver,
  handleImageDropped,
}) => {
  return (
    <footer className="w-full my-8">
      {/* <div className="text-center">
        <Link href="/about" className="lil-button">
          <FaInfoCircle className="icon" />
          What is this?
        </Link>

        {events.length > 1 && (
          <button className="lil-button" onClick={startOver}>
            <AiOutlineCloseCircle className="icon" />
            Start over
          </button>
        )}

        <Dropzone onImageDropped={handleImageDropped} />

        {events.length > 2 && events.some((ev) => ev.image) && (
          <Link
            className="lil-button"
            target="_blank"
            rel="noopener noreferrer"
            href={events.findLast((ev) => ev.image)?.image || ''}
          >
            <FaDownload className="icon" />
            Download image
          </Link>
        )}

        <Link
          href="https://github.com/stackwiseai/vibe-switch"
          className="lil-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode className="icon" />
          Fork repo
        </Link>
      </div>

      <div className="text-center lil-text mt-8">
        <div className="inline-block py-2 px-4 rounded-lg bg-blue-200">
          🤔 Are you a developer and want to build something similar? Check out
          the{' '}
          <Link
            href="https://github.com/stackwiseai/vibe-switch#readme"
            target="_blank"
          >
            README
          </Link>
          .
        </div>
      </div> */}

      {/* <div className="text-center lil-text mt-8">
        Powered by{' '}
        <Link
          target="_blank"
          href="https://www.timothybrooks.com/instruct-pix2pix?utm_source=project&utm_campaign=vibeswitch"
        >
          InstructPix2Pix
        </Link>
        ,{' '}
        <Link
          target="_blank"
          href="https://replicate.com/lucataco/fuyu-8b?utm_source=project&utm_campaign=vibeswitch"
        >
          Fuyu (Adept)
        </Link>
        ,{' '}
        <Link target="_blank" href="https://openai.com/api/">
          OpenAI
        </Link>
        ,{' '}
        <Link
          target="_blank"
          href="https://js.langchain.com/docs/get_started/installation"
        >
          Langchain
        </Link>
        ,{' '}
        <Link
          href="https://replicate.com/timothybrooks/instruct-pix2pix?utm_source=project&utm_campaign=vibeswitch"
          target="_blank"
        >
          Replicate
        </Link>
        ,{' '}
        <Link href="https://vercel.com/templates/ai" target="_blank">
          Vercel
        </Link>
        , and{' '}
        <Link href="https://github.com/stackwiseai/vibe-switch" target="_blank">
          GitHub
        </Link>
      </div> */}
    </footer>
  );
};

export default Footer;
