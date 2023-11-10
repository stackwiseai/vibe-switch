import React, { useEffect, useState, FormEvent } from 'react';
import Message from './message';

// Define the props that the component expects
interface PromptFormProps {
  initialPrompt: string;
  isFirstPrompt: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  disabled?: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({
  initialPrompt,
  isFirstPrompt,
  onSubmit,
  disabled = false,
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrompt('');
    onSubmit(e);
  };

  if (disabled) {
    return null; // You should return null instead of undefined in a component.
  }

  return (
    <form onSubmit={handleSubmit} className="animate-in fade-in duration-700">
      <div className="flex mt-8">
        <input
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
        />

        {!disabled && (
          <button
            className="bg-black text-white rounded-r-md text-small inline-block p-3 flex-none"
            type="submit"
          >
            Paint
          </button>
        )}
      </div>
    </form>
  );
};

export default PromptForm;
