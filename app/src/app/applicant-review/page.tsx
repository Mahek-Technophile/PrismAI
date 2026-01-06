'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function ApplicantReview() {
  const { applicantData, identityDocs, saveApplicantData, currentStep, completedSteps, leadStatus } = useAppStore();
  const [editableData, setEditableData] = useState(applicantData || {
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    idNumber: '',
  });
  const router = useRouter();

  if (!applicantData) {
    return <div>Loading...</div>; // or redirect
  }

  const handleSave = () => {
    saveApplicantData(editableData);
    router.push('/address-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Applicant Details Review</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.fullName}
                  onChange={(e) => setEditableData({ ...editableData, fullName: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={editableData.dateOfBirth}
                  onChange={(e) => setEditableData({ ...editableData, dateOfBirth: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.nationality}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ID Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editableData.idNumber}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Attached Proof Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {identityDocs.map((file, index) => (
                <div key={index} className="border p-4 rounded">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-600">Type: {file.type}</p>
                  {/* For demo, no actual preview */}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Confirm and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}