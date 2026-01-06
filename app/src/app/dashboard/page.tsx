'use client';

import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';
import Link from 'next/link';

export default function Dashboard() {
  const { leadStatus, currentStep, completedSteps, approveLead } = useAppStore();

  const isApproved = leadStatus === 'approved';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Lead Status</h2>
          <p className={`text-lg ${leadStatus === 'submitted-awaiting-approval' ? 'text-yellow-600' : 'text-green-600'}`}>
            {leadStatus === 'submitted-awaiting-approval' ? 'Lead Submitted – Awaiting Approval' : 'Lead Approved'}
          </p>
          {!isApproved && (
            <button
              onClick={approveLead}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simulate Approval (Demo)
            </button>
          )}
        </div>
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Identity Upload */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Identity Document Upload</h3>
            <p className="text-sm text-gray-600">Upload government-issued ID</p>
            {isApproved ? (
              <Link href="/identity-upload" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Applicant Details */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Applicant Details Review</h3>
            <p className="text-sm text-gray-600">Review auto-filled information</p>
            {isApproved ? (
              <Link href="/applicant-review" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Address Confirmation */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Address Confirmation</h3>
            <p className="text-sm text-gray-600">Confirm your address</p>
            {isApproved ? (
              <Link href="/address-confirmation" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Loan Application */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Loan Application</h3>
            <p className="text-sm text-gray-600">Enter loan details</p>
            {isApproved ? (
              <Link href="/loan-application" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Employment Type */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Employment Type</h3>
            <p className="text-sm text-gray-600">Select employment type</p>
            {isApproved ? (
              <Link href="/employment-type" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Employment Details */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Employment Details</h3>
            <p className="text-sm text-gray-600">Provide employment information</p>
            {isApproved ? (
              <Link href="/employment-details" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Banking Details */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Banking Details</h3>
            <p className="text-sm text-gray-600">Enter banking information</p>
            {isApproved ? (
              <Link href="/banking-details" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Charges & Consent */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Charges & Consent</h3>
            <p className="text-sm text-gray-600">Review charges and provide consent</p>
            {isApproved ? (
              <Link href="/charges-consent" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Proceed
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
          {/* Application Status */}
          <div className={`bg-white p-4 rounded-lg shadow ${isApproved ? '' : 'opacity-50'}`}>
            <h3 className="font-semibold">Application Status</h3>
            <p className="text-sm text-gray-600">View application status</p>
            {isApproved ? (
              <Link href="/application-status" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                View
              </Link>
            ) : (
              <p className="text-gray-400 mt-2">Available after approval</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}