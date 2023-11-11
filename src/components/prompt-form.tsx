import React, { useEffect, useState, FormEvent } from 'react';
import Message from './message';

// Define the props that the component expects
interface PromptFormProps {
  initialPrompt: string;
  isFirstPrompt: boolean;
  onSubmit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  disabled?: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({
  onSubmit,
  disabled = false,
}) => {
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSubmit(e);
  };

  if (disabled) {
    return null; // You should return null instead of undefined in a component.
  }

  return (
    <form className="">
      <div className="flex ">
        {/* <input
          id="prompt-input"
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Your message..."
          className={`block w-full flex-grow${
            disabled ? ' rounded-md' : ' rounded-l-md'
          }`}
          disabled={disabled}
        /> */}

        {!disabled && (
          <button
            onClick={(e) => handleSubmit(e)}
            className="mt-8 animate-in fade-in duration-700 bg-black mx-auto text-white rounded-md text-small inline-block p-3 flex-none"
            type="submit"
          >
            Switch Vibe
          </button>
        )}
      </div>
    </form>
  );
};

export default PromptForm;
