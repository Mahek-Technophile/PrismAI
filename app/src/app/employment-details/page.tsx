'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function EmploymentDetails() {
  const { employmentType, employmentData, saveEmploymentData, currentStep, completedSteps, leadStatus } = useAppStore();
  const [editableData, setEditableData] = useState(employmentData || {});
  const [proofFiles, setProofFiles] = useState<File[]>([]);
  const router = useRouter();

  if (!employmentType) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProofFiles(Array.from(e.target.files));
    }
  };

  const handleSave = () => {
    // Simulate saving with proof
    saveEmploymentData({ ...editableData, proofFiles });
    router.push('/banking-details');
  };

  const isSalaried = employmentType.type === 'salaried';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Employment Details</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">{isSalaried ? 'Salaried Employment' : 'Self-Employment / Business'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isSalaried ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Employer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editableData.employerName || ''}
                      onChange={(e) => setEditableData({ ...editableData, employerName: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Monthly Salary <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={editableData.monthlySalary || ''}
                      onChange={(e) => setEditableData({ ...editableData, monthlySalary: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editableData.jobTitle || ''}
                      onChange={(e) => setEditableData({ ...editableData, jobTitle: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editableData.businessName || ''}
                      onChange={(e) => setEditableData({ ...editableData, businessName: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Annual Income <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={editableData.annualIncome || ''}
                      onChange={(e) => setEditableData({ ...editableData, annualIncome: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editableData.businessType || ''}
                      onChange={(e) => setEditableData({ ...editableData, businessType: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Proof Document Upload</h2>
            <p className="mb-2 text-gray-600">
              Please upload proof of {isSalaried ? 'employment (e.g., payslip)' : 'business (e.g., tax return)'}.
            </p>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {proofFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Selected Files:</h3>
                <ul className="list-disc list-inside">
                  {proofFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={proofFiles.length === 0}
            className={`w-full p-3 rounded ${
              proofFiles.length > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}