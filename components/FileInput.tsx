import Image from 'next/image';
import React from 'react';
import { Upload } from 'lucide-react';

interface FileInputProps {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  previewUrl: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  type: 'video' | 'image';
}

const FileInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => (
  <section className="file-input mt-8 space-y-2">
    <label htmlFor={id} className="block font-medium text-sm text-gray-700">
      {label}
    </label>

    <input
      type="file"
      id={id}
      accept={accept}
      hidden
      ref={inputRef}
      onChange={onChange}
    />

    {!previewUrl ? (
      <figure
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border border-dashed border-gray-400 h-[150px] rounded-md p-6 flex flex-col items-center justify-center text-gray-600"
      >
        <Upload size={32} />
        <p className="mt-2 text-sm">Click to upload your {id}</p>
      </figure>
    ) : (
      <div className="relative bg-gray-100 p-4 rounded-md space-y-2">
        {type === 'video' ? (
          <video
            src={previewUrl}
            controls
            className="w-full h-auto max-h-64 rounded-md"
          />
        ) : (
          <div className="relative w-full h-64">
            <Image
              src={previewUrl}
              alt={`Selected ${id}`}
              fill
              className="object-contain rounded-md"
            />
          </div>
        )}

        <button
          type="button"
          onClick={onReset}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
        >
          <Image
            src="/assets/icons/close.svg"
            alt="Close Icon"
            width={16}
            height={16}
          />
        </button>

        <p className="text-sm text-gray-700">{file?.name}</p>
      </div>
    )}
  </section>
);

export default FileInput;
