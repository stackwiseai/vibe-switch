import React from 'react';
import Dropzone from './dropzone';
import { FaCode, FaInfoCircle, FaDownload } from 'react-icons/fa';
import { AiOutlineCloseCircle as StartOverIcon } from 'react-icons/ai';
import Link from 'next/link';

// Define the types for the props that the component accepts
interface FooterProps {
  events: { image?: string }[]; // This assumes that events is an array of objects that may have an image property
  startOver: () => void;
  handleImageDropped: (file: File) => void;
}

const Footer: React.FC<FooterProps> = ({
  events,
  startOver,
  handleImageDropped,
}) => {
  return (
    <footer className="w-full my-8">
      <div className="text-center">
        <Link href="/about" className="lil-button">
          <a>
            <FaInfoCircle className="icon" />
            What is this?
          </a>
        </Link>

        {events.length > 1 && (
          <button className="lil-button" onClick={startOver}>
            <StartOverIcon className="icon" />
            Start over
          </button>
        )}

        <Dropzone onImageDropped={handleImageDropped} />

        {events.length > 2 && events.some((ev) => ev.image) && (
          <Link href={events.findLast((ev) => ev.image)?.image || ''} passHref>
            <a className="lil-button" target="_blank" rel="noopener noreferrer">
              <FaDownload className="icon" />
              Download image
            </a>
          </Link>
        )}

        <Link
          href="https://github.com/replicate/instruct-pix2pix-demo"
          passHref
        >
          <a className="lil-button" target="_blank" rel="noopener noreferrer">
            <FaCode className="icon" />
            Fork repo
          </a>
        </Link>
      </div>

      <div className="text-center lil-text mt-8">
        <div className="inline-block py-2 px-4 border border-yellow-200 rounded-lg bg-[#fef6aa]">
          🤔 Are you a developer and want to learn how to build this? Check out
          the{' '}
          <Link
            href="https://github.com/replicate/paint-with-words#readme"
            passHref
          >
            <a target="_blank">README</a>
          </Link>
          .
        </div>
      </div>

      <div className="text-center lil-text mt-8">
        Powered by{' '}
        <Link href="https://www.timothybrooks.com/instruct-pix2pix/" passHref>
          <a target="_blank">InstructPix2Pix</a>
        </Link>
        ,{' '}
        <Link
          href="https://replicate.com/timothybrooks/instruct-pix2pix?utm_source=project&utm_campaign=paintbytext"
          passHref
        >
          <a target="_blank">Replicate</a>
        </Link>
        ,{' '}
        <Link href="https://vercel.com/templates/ai" passHref>
          <a target="_blank">Vercel</a>
        </Link>
        , and{' '}
        <Link
          href="https://github.com/replicate/instruct-pix2pix-demo"
          passHref
        >
          <a target="_blank">GitHub</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
