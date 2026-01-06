'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';
import { Upload } from 'lucide-react';

export default function IdentityUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { uploadIdentity, currentStep, completedSteps, leadStatus } = useAppStore();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          uploadIdentity(files);
          router.push('/applicant-review');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Identity Document Upload</h1>
          <p className="mb-4 text-gray-600">
            Please upload a clear photo or scan of your government-issued ID (e.g., passport, driver's license, national ID).
            Accepted formats: JPG, PNG, PDF.
          </p>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Files</label>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Selected Files:</h3>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          {uploading && (
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Uploading... {progress}%</p>
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className={`w-full p-3 rounded flex items-center justify-center ${
              files.length > 0 && !uploading
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Upload className="mr-2" size={20} />
            Upload Documents
          </button>
        </div>
      </div>
    </div>
  );
}