import React, { useEffect, useRef } from 'react';
import { RxReload as UndoIcon } from 'react-icons/rx';
import Image from 'next/image';
import PulseLoader from 'react-spinners/PulseLoader';
import Message from './message';

// Define the types for the individual event objects and the props
interface Event {
  image?: string;
  prompt?: string;
}

interface MessagesProps {
  events: Event[];
  isProcessing: boolean;
  onUndo?: (index: number) => void;
}

const Messages: React.FC<MessagesProps> = ({
  events,
  isProcessing,
  onUndo,
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
            <React.Fragment key={'image-' + index}>
              <Message sender="replicate" shouldFillWidth>
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
                    <button
                      className="lil-button"
                      onClick={() => onUndo(index)}
                    >
                      <UndoIcon className="icon" /> Undo and try a different
                      change
                    </button>
                  </div>
                )}
              </Message>

              {(isProcessing || index < events.length - 1) && (
                <Message sender="replicate" isSameSender>
                  {index === 0
                    ? 'What should we change?'
                    : 'What should we change now?'}
                </Message>
              )}
            </React.Fragment>
          );
        }

        if (ev.prompt) {
          return (
            <Message key={'prompt-' + index} sender="user">
              {ev.prompt}
            </Message>
          );
        }

        return null;
      })}

      {isProcessing && (
        <Message sender="replicate">
          <PulseLoader color="#999" size={7} />
        </Message>
      )}

      <div ref={messagesEndRef} />
    </section>
  );
};

export default Messages;
