import { Check, Lock } from 'lucide-react';

const steps = [
  'Lead Creation',
  'Dashboard',
  'Identity Upload',
  'Applicant Review',
  'Address Confirmation',
  'Loan Application',
  'Employment Type',
  'Employment Details',
  'Banking Details',
  'Charges & Consent',
  'Application Status',
];

interface ProgressIndicatorProps {
  currentStep: number;
  completedSteps: Set<number>;
  leadStatus: string;
}

export default function ProgressIndicator({ currentStep, completedSteps, leadStatus }: ProgressIndicatorProps) {
  const isApproved = leadStatus === 'approved';

  return (
    <div className="w-full py-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(index);
          const isCurrent = currentStep === index;
          const isLocked = !isApproved && index > 1;

          return (
            <div key={index} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : isLocked
                    ? 'bg-gray-300 border-gray-300 text-gray-500'
                    : 'bg-gray-200 border-gray-400 text-gray-600'
                }`}
              >
                {isCompleted ? <Check size={20} /> : isLocked ? <Lock size={20} /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    completedSteps.has(index) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span key={index} className={`text-xs text-center ${(!isApproved && index > 1) ? 'text-gray-400' : 'text-gray-700'}`} style={{ width: `${100 / steps.length}%` }}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}