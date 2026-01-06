import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">ASSURE-IC</h1>
        <p className="text-gray-600 mb-6">AI-Powered KYC & Loan Application Platform</p>
        <Link href="/lead-form" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Start Application
        </Link>
      </div>
    </div>
  );
}
