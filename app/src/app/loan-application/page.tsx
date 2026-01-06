'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function LoanApplication() {
  const { saveLoanData, currentStep, completedSteps, leadStatus } = useAppStore();
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    term: '',
  });
  const [errors, setErrors] = useState({ amount: '', purpose: '', term: '' });
  const router = useRouter();

  const validate = () => {
    const newErrors = { amount: '', purpose: '', term: '' };
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.term) newErrors.term = 'Term is required';
    setErrors(newErrors);
    return !Object.values(newErrors).some(e => e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      saveLoanData({
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
        term: parseInt(formData.term),
      });
      router.push('/employment-type');
    }
  };

  const isFormValid = formData.amount && formData.purpose && formData.term && !errors.amount;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Loan Application</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Loan Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="e.g., 10000"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Loan Purpose <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select purpose</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="home">Home Improvement</option>
              </select>
              {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Loan Term (months) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="e.g., 12"
              />
              {errors.term && <p className="text-red-500 text-sm">{errors.term}</p>}
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full p-3 rounded ${
                isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Loan Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}