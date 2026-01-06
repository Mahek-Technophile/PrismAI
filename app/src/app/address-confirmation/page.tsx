'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function AddressConfirmation() {
  const { addressData, identityDocs, saveAddressData, currentStep, completedSteps, leadStatus } = useAppStore();
  const [editableData, setEditableData] = useState(addressData || {
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  if (!addressData) {
    return <div>Loading...</div>;
  }

  const handleSave = () => {
    if (confirmed) {
      saveAddressData(editableData);
      router.push('/loan-application');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Address Confirmation</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Address Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.address}
                  onChange={(e) => setEditableData({ ...editableData, address: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.city}
                  onChange={(e) => setEditableData({ ...editableData, city: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.state}
                  onChange={(e) => setEditableData({ ...editableData, state: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.zip}
                  onChange={(e) => setEditableData({ ...editableData, zip: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Proof Document</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {identityDocs.map((file, index) => (
                <div key={index} className="border p-4 rounded">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">Type: {file.type}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mr-2"
              />
              I confirm this address is correct <span className="text-red-500">*</span>
            </label>
          </div>
          <button
            onClick={handleSave}
            disabled={!confirmed}
            className={`w-full p-3 rounded ${
              confirmed ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}