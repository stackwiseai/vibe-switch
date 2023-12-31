import React, { useEffect, useRef } from 'react';
import { RxReload as UndoIcon } from 'react-icons/rx';
import Image from 'next/image';
import PulseLoader from 'react-spinners/PulseLoader';
import Message from './message';
import { Prediction } from '../app/page';
import Link from 'next/link';

// Define the types for the individual event objects and the props
interface Event {
  image?: string;
  prompt?: string;
  ai?: string;
  fuyu?: string;
}

interface MessagesProps {
  events: Event[];
  isProcessing: boolean;
  onUndo?: (index: number) => void;
  prediction: Prediction | null;
}

const Messages: React.FC<MessagesProps> = ({
  events,
  isProcessing,
  onUndo,
  prediction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (events.length > 2 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [events.length]);

  return (
    <section className="w-full">
      {events.map((ev, index) => {
        if (ev.image) {
          return (
            <Message
              key={'image-' + index}
              sender="replicate"
              shouldFillWidth
              isSameSender
            >
              <Image
                alt={
                  ev.prompt
                    ? `The result of the prompt "${ev.prompt}" on the previous image`
                    : 'The source image'
                }
                width="512"
                height="512"
                priority={true}
                className="w-full h-auto rounded-lg"
                src={ev.image}
              />

              {onUndo && index > 0 && index === events.length - 1 && (
                <div className="mt-2 text-right">
                  <button className="lil-button" onClick={() => onUndo(index)}>
                    <UndoIcon className="icon" /> Undo and try a different
                    change
                  </button>
                </div>
              )}
            </Message>
          );
        }

        if (ev.prompt) {
          return (
            <Message key={'prompt-' + index} sender="user">
              {ev.prompt}
            </Message>
          );
        }

        if (ev.ai) {
          return (
            <Message key={'ai-' + index} sender="replicate" isSameSender>
              {ev.ai}
            </Message>
          );
        }

        if (ev.fuyu) {
          return (
            <Message key={'fuyu-' + index} sender="replicate">
              {ev.fuyu}
            </Message>
          );
        }

        return null;
      })}

      {isProcessing && (
        <Message sender="replicate">
          <div className="flex flex-col justify-center items-center px-2 py-1 ">
            <PulseLoader color="#999" size={7} />
            {prediction && prediction.status == 'starting' ? (
              <p className="text-center text-sm">
                Starting Replicate container, this can sometimes
                <br /> take 3-5 min
                <Link
                  className="text-blue-500"
                  href="https://replicate.com/docs/how-does-replicate-work#cold-boots"
                >
                  {' '}
                  while the model boots up
                </Link>
                ...
              </p>
            ) : null}
          </div>
        </Message>
      )}

      <div ref={messagesEndRef} />
    </section>
  );
};

export default Messages;
