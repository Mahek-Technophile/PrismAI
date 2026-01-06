'use client';

import { useAppStore } from '@/lib/store';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function ApplicationStatus() {
  const { leadData, applicantData, addressData, loanData, employmentData, bankingData, currentStep, completedSteps, leadStatus } = useAppStore();

  const applicationId = `APP-${Date.now()}`;
  const status = 'Submitted - Under Review';

  const sections = [
    { name: 'Lead Information', data: leadData, completed: completedSteps.has(0) },
    { name: 'Identity Documents', data: applicantData, completed: completedSteps.has(2) },
    { name: 'Applicant Details', data: applicantData, completed: completedSteps.has(3) },
    { name: 'Address Confirmation', data: addressData, completed: completedSteps.has(4) },
    { name: 'Loan Application', data: loanData, completed: completedSteps.has(5) },
    { name: 'Employment Type', data: employmentData, completed: completedSteps.has(6) },
    { name: 'Employment Details', data: employmentData, completed: completedSteps.has(7) },
    { name: 'Banking Details', data: bankingData, completed: completedSteps.has(8) },
    { name: 'Charges & Consent', data: null, completed: completedSteps.has(9) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator currentStep={currentStep} completedSteps={completedSteps} leadStatus={leadStatus} />
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Application Status Dashboard</h1>
          <div className="mb-6">
            <p className="text-lg"><strong>Application ID:</strong> {applicationId}</p>
            <p className="text-lg"><strong>Status:</strong> {status}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Submitted Sections Summary</h2>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span>{section.name}</span>
                  <span className={section.completed ? 'text-green-600' : 'text-red-600'}>
                    {section.completed ? 'Completed' : 'Incomplete'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Application Details (Read-Only)</h2>
            <div className="space-y-4">
              {leadData && (
                <div>
                  <h3 className="font-semibold">Lead Information</h3>
                  <p>Name: {leadData.name}</p>
                  <p>Email: {leadData.email}</p>
                  <p>Phone: {leadData.phone}</p>
                </div>
              )}
              {applicantData && (
                <div>
                  <h3 className="font-semibold">Applicant Details</h3>
                  <p>Full Name: {applicantData.fullName}</p>
                  <p>Date of Birth: {applicantData.dateOfBirth}</p>
                  <p>Nationality: {applicantData.nationality}</p>
                  <p>ID Number: {applicantData.idNumber}</p>
                </div>
              )}
              {addressData && (
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>{addressData.address}, {addressData.city}, {addressData.state} {addressData.zip}</p>
                </div>
              )}
              {loanData && (
                <div>
                  <h3 className="font-semibold">Loan Details</h3>
                  <p>Amount: ${loanData.amount}</p>
                  <p>Purpose: {loanData.purpose}</p>
                  <p>Term: {loanData.term} months</p>
                </div>
              )}
              {employmentData && (
                <div>
                  <h3 className="font-semibold">Employment</h3>
                  {employmentData.employerName ? (
                    <>
                      <p>Employer: {employmentData.employerName}</p>
                      <p>Salary: ${employmentData.monthlySalary}/month</p>
                      <p>Job Title: {employmentData.jobTitle}</p>
                    </>
                  ) : (
                    <>
                      <p>Business: {employmentData.businessName}</p>
                      <p>Income: ${employmentData.annualIncome}/year</p>
                      <p>Type: {employmentData.businessType}</p>
                    </>
                  )}
                </div>
              )}
              {bankingData && (
                <div>
                  <h3 className="font-semibold">Banking</h3>
                  <p>Account: {bankingData.accountNumber}</p>
                  <p>Bank: {bankingData.bankName}</p>
                  <p>Type: {bankingData.accountType}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <p className="text-blue-800">
              Your application has been submitted successfully. You will receive updates via email. Next steps include review and approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}