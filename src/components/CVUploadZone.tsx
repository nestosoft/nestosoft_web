import React, { useState, useCallback } from 'react';

interface CVUploadZoneProps {
  onFileUpload: (file: File) => void;
  isActive: boolean;
  className?: string;
}

const CVUploadZone: React.FC<CVUploadZoneProps> = ({ onFileUpload, isActive, className = '' }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isActive) {
      setIsDragOver(true);
    }
  }, [isActive]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (!isActive) return;

    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      alert('Please upload a PDF file only.');
      return;
    }

    const file = pdfFiles[0];
    setIsUploading(true);
    
    try {
      await onFileUpload(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [isActive, onFileUpload]);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) return;
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file only.');
      return;
    }

    setIsUploading(true);
    
    try {
      await onFileUpload(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  }, [isActive, onFileUpload]);

  if (!isActive) return null;

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
        isDragOver 
          ? 'border-blue-400 bg-blue-400/5' 
          : 'border-white/20 bg-white/5'
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-8 text-center">
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-white/70">Uploading your CV...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-white text-lg font-medium">Drop your CV here</p>
              <p className="text-white/60 text-sm">or click to browse</p>
            </div>
            <div className="text-xs text-white/40">
              Only PDF files are accepted
            </div>
          </div>
        )}
        
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
      </div>
      
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-400/10 rounded-lg flex items-center justify-center">
          <div className="text-blue-400 text-lg font-medium">Drop to upload</div>
        </div>
      )}
    </div>
  );
};

export default CVUploadZone;
