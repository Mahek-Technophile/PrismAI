'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function BankingDetails() {
  const { bankingData, saveBankingData, currentStep, completedSteps, leadStatus } = useAppStore();
  const [editableData, setEditableData] = useState(bankingData || {
    accountNumber: '',
    bankName: '',
    accountType: '',
  });
  const [bankFiles, setBankFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  if (!bankingData) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBankFiles(Array.from(e.target.files));
    }
  };

  const handleSave = () => {
    if (confirmed && bankFiles.length > 0) {
      saveBankingData({ ...editableData, bankFiles });
      router.push('/charges-consent');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Banking Details</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.accountNumber}
                  onChange={(e) => setEditableData({ ...editableData, accountNumber: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.bankName}
                  onChange={(e) => setEditableData({ ...editableData, bankName: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={editableData.accountType}
                  onChange={(e) => setEditableData({ ...editableData, accountType: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Bank Document Upload</h2>
            <p className="mb-2 text-gray-600">
              Please upload bank statements or other proof documents.
            </p>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {bankFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Selected Files:</h3>
                <ul className="list-disc list-inside">
                  {bankFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mr-2"
              />
              I confirm the banking details are correct <span className="text-red-500">*</span>
            </label>
          </div>
          <button
            onClick={handleSave}
            disabled={!confirmed || bankFiles.length === 0}
            className={`w-full p-3 rounded ${
              confirmed && bankFiles.length > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}