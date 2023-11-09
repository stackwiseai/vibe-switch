import React, { ReactNode } from 'react';

interface MessageProps {
  sender: 'replicate' | 'user'; // Assuming 'sender' can only be 'user' or 'other'
  shouldFillWidth?: boolean;
  isSameSender?: boolean;
  children: ReactNode;
}

const Message: React.FC<MessageProps> = ({
  sender,
  shouldFillWidth = false,
  isSameSender = false,
  children,
}) => {
  return (
    <div className={`w-full ${sender === 'user' ? 'text-right' : ''}`}>
      <div
        className={`p-3 rounded-lg ${
          shouldFillWidth ? 'w-full' : 'inline-block'
        } ${
          sender === 'user'
            ? 'ml-16 bg-blue-600 text-white'
            : 'bg-gray-200 text-black'
        } ${isSameSender ? 'mt-2' : 'mt-8'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Message;
