import React, { ChangeEvent } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  as?: 'input' | 'textarea' | 'select';
  options?: Array<{ value: string; label: string }>;
}

const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  as = 'input',
  options = [],
}: FormFieldProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 font-medium text-gray-700">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 resize-none h-[25vh] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-800"
        />
      ) : as === 'select' ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-800"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-zinc-800"
        />
      )}
    </div>
  );
};

export default FormField;
