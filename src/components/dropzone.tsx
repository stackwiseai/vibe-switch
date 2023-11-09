import React, { useCallback } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

// Define the type for the component's props
interface DropzoneProps {
  onImageDropped: (file: File) => void; // assuming onImageDropped accepts a File object
}

const Dropzone: React.FC<DropzoneProps> = ({ onImageDropped }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onImageDropped(acceptedFiles[0]);
    },
    [onImageDropped]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="lil-button cursor-pointer select-none" {...getRootProps()}>
      <div className="m-auto">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>
            <FaUpload className="icon" />
            Upload image
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
