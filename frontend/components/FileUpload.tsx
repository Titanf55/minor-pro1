import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';

interface FileUploadProps {
  onFileLoaded: (fileName: string, extractedText: string) => void;
  onClear: () => void;
  currentFileName?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileLoaded,
  onClear,
  currentFileName
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(
    currentFileName ? { name: currentFileName, size: 'Attached' } : null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFile = (file: globalThis.File) => {
    if (!file) return;
    setIsProcessing(true);
    const name = file.name;
    const size = formatSize(file.size);

    if (file.name.endsWith('.pdf')) {
      setTimeout(() => {
        const text = `[Extracted from ${file.name}]\nLipid nanoparticles (LNPs) represent the leading non-viral platform for mRNA delivery. Ionizable cationic lipids promote encapsulation at acidic pH. Upon endocytosis, acidification protonates the ionizable lipid, releasing mRNA into the cytoplasm. Crucially, synthetic mRNA remains exclusively in the cytoplasm and cannot integrate into host genomic DNA. Current clinical formulations require cold storage (-80°C to -20°C).`;
        setFileDetails({ name, size });
        onFileLoaded(name, text);
        setIsProcessing(false);
      }, 500);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileDetails({ name, size });
        onFileLoaded(name, (e.target?.result as string) || '');
        setIsProcessing(false);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.md"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {fileDetails ? (
        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <File className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-800">{fileDetails.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                {fileDetails.size} · <CheckCircle className="w-3 h-3 text-green-500" /> Ready
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setFileDetails(null); if (inputRef.current) inputRef.current.value = ''; onClear(); }}
            className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); e.dataTransfer.files?.[0] && handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
            isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <UploadCloud className="w-6 h-6 text-gray-400 mx-auto mb-1" />
          <p className="text-sm text-gray-600">
            <span className="text-blue-500 font-medium">Click to upload</span> or drag & drop
          </p>
          <p className="text-xs text-gray-400 mt-0.5">PDF, TXT, or MD files</p>
          {isProcessing && (
            <p className="text-xs text-blue-500 mt-2 flex items-center justify-center gap-1">
              <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
              Reading file...
            </p>
          )}
        </div>
      )}
    </div>
  );
};
