'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function ChargesConsent() {
  const { loanData, submitApplication, currentStep, completedSteps, leadStatus } = useAppStore();
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    accuracy: false,
  });
  const router = useRouter();

  const charges = [
    { item: 'Processing Fee', amount: 100 },
    { item: 'Interest (Estimated)', amount: (loanData?.amount || 0) * 0.05 },
    { item: 'Total', amount: 100 + (loanData?.amount || 0) * 0.05 },
  ];

  const handleSubmit = () => {
    if (Object.values(consents).every(Boolean)) {
      submitApplication();
      router.push('/application-status');
    }
  };

  const allConsented = Object.values(consents).every(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Charges & Consent</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Charges Breakdown</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Item</th>
                  <th className="border border-gray-300 p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {charges.map((charge, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{charge.item}</td>
                    <td className="border border-gray-300 p-2 text-right">${charge.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Consents</h2>
            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consents.terms}
                  onChange={(e) => setConsents({ ...consents, terms: e.target.checked })}
                  className="mr-2 mt-1"
                />
                <span>
                  I agree to the <a href="#" className="text-blue-500 underline">Terms and Conditions</a> <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consents.privacy}
                  onChange={(e) => setConsents({ ...consents, privacy: e.target.checked })}
                  className="mr-2 mt-1"
                />
                <span>
                  I agree to the <a href="#" className="text-blue-500 underline">Privacy Policy</a> <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={consents.accuracy}
                  onChange={(e) => setConsents({ ...consents, accuracy: e.target.checked })}
                  className="mr-2 mt-1"
                />
                <span>
                  I confirm that all information provided is accurate and complete <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!allConsented}
            className={`w-full p-3 rounded ${
              allConsented ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}