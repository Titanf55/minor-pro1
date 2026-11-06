import React, { useRef } from 'react';
import { Clipboard, Trash2 } from 'lucide-react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  onClear?: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 7,
  onClear
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch {
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePaste}
            className="text-xs text-gray-400 hover:text-gray-700 px-1.5 py-0.5 rounded hover:bg-gray-100 inline-flex items-center gap-1"
          >
            <Clipboard className="w-3 h-3" /> Paste
          </button>
          {onClear && value && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-gray-400 hover:text-red-500 px-1.5 py-0.5 rounded hover:bg-red-50 inline-flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 resize-y placeholder:text-gray-400"
      />
    </div>
  );
};
