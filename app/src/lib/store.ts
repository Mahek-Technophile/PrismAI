import { create } from 'zustand';

export type LeadStatus = 'not-submitted' | 'submitted-awaiting-approval' | 'approved';

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export interface ApplicantData {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  idNumber: string;
}

export interface AddressData {
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface LoanData {
  amount: number;
  purpose: string;
  term: number;
}

export interface EmploymentType {
  type: 'salaried' | 'self-employed';
}

export interface EmploymentData {
  // fields
}

export interface BankingData {
  // fields
}

export interface AppState {
  leadStatus: LeadStatus;
  currentStep: number; // 0: lead, 1: dashboard, 2: identity, etc.
  completedSteps: Set<number>;
  leadData: LeadData | null;
  identityDocs: File[];
  applicantData: ApplicantData | null;
  addressData: AddressData | null;
  loanData: LoanData | null;
  employmentType: EmploymentType | null;
  employmentData: EmploymentData | null;
  bankingData: BankingData | null;
  // actions
  submitLead: (data: LeadData) => void;
  approveLead: () => void;
  uploadIdentity: (files: File[]) => void;
  saveApplicantData: (data: ApplicantData) => void;
  saveAddressData: (data: AddressData) => void;
  saveLoanData: (data: LoanData) => void;
  selectEmploymentType: (type: EmploymentType) => void;
  saveEmploymentData: (data: EmploymentData) => void;
  saveBankingData: (data: BankingData) => void;
  submitApplication: () => void;
  setCurrentStep: (step: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  leadStatus: 'not-submitted',
  currentStep: 0,
  completedSteps: new Set(),
  leadData: null,
  identityDocs: [],
  applicantData: null,
  addressData: null,
  loanData: null,
  employmentType: null,
  employmentData: null,
  bankingData: null,
  submitLead: (data) => set((state) => ({
    leadData: data,
    leadStatus: 'submitted-awaiting-approval',
    currentStep: 1,
    completedSteps: new Set([...state.completedSteps, 0])
  })),
  approveLead: () => set((state) => ({
    leadStatus: 'approved'
  })),
  uploadIdentity: (files) => set((state) => ({
    identityDocs: files,
    applicantData: {
      fullName: 'John Doe', // simulated
      dateOfBirth: '1990-01-01',
      nationality: 'US',
      idNumber: '123456789',
    },
    currentStep: 3,
    completedSteps: new Set([...state.completedSteps, 2])
  })),
  saveApplicantData: (data) => set((state) => ({
    applicantData: data,    addressData: {
      address: '123 Main St, City, State 12345', // simulated
      city: 'City',
      state: 'State',
      zip: '12345',
    },    currentStep: 4,
    completedSteps: new Set([...state.completedSteps, 3])
  })),
  saveAddressData: (data) => set((state) => ({
    addressData: data,
    currentStep: 5,
    completedSteps: new Set([...state.completedSteps, 4])
  })),
  saveLoanData: (data) => set((state) => ({
    loanData: data,
    currentStep: 6,
    completedSteps: new Set([...state.completedSteps, 5])
  })),
  selectEmploymentType: (type) => set((state) => ({
    employmentType: type,
    currentStep: 7,
    completedSteps: new Set([...state.completedSteps, 6])
  })),
  saveEmploymentData: (data) => set((state) => ({
    employmentData: data,
    currentStep: 8,
    completedSteps: new Set([...state.completedSteps, 7])
  })),
  saveBankingData: (data) => set((state) => ({
    bankingData: data,
    currentStep: 9,
    completedSteps: new Set([...state.completedSteps, 8])
  })),
  submitApplication: () => set((state) => ({
    currentStep: 10,
    completedSteps: new Set([...state.completedSteps, 9])
  })),
  setCurrentStep: (step) => set({ currentStep: step }),
}));