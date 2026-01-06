'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function EmploymentType() {
  const { selectEmploymentType, currentStep, completedSteps, leadStatus } = useAppStore();
  const [type, setType] = useState<'salaried' | 'self-employed' | null>(null);
  const router = useRouter();

  const handleSelect = () => {
    if (type) {
      selectEmploymentType({ type });
      router.push('/employment-details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Employment Type</h1>
          <p className="mb-6 text-gray-600">Please select your employment type to proceed.</p>
          <div className="space-y-4">
            <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="employmentType"
                value="salaried"
                checked={type === 'salaried'}
                onChange={() => setType('salaried')}
                className="mr-3"
              />
              <div>
                <h3 className="font-semibold">Salaried</h3>
                <p className="text-sm text-gray-600">I receive a regular salary from an employer.</p>
              </div>
            </label>
            <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="employmentType"
                value="self-employed"
                checked={type === 'self-employed'}
                onChange={() => setType('self-employed')}
                className="mr-3"
              />
              <div>
                <h3 className="font-semibold">Self-Employed / Business</h3>
                <p className="text-sm text-gray-600">I own a business or work as a freelancer.</p>
              </div>
            </label>
          </div>
          <button
            onClick={handleSelect}
            disabled={!type}
            className={`w-full mt-6 p-3 rounded ${
              type ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}