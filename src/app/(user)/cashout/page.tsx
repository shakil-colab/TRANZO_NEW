'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { performTransaction } from '@/app/actions/transaction';
import { ArrowRightOnRectangleIcon, PhoneIcon, CurrencyBangladeshiIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CashOut() {
  const [agentPhone, setAgentPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCashOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await performTransaction('Cash Out', agentPhone, Number(amount));
    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.message || 'Transaction failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="btn btn-circle btn-ghost btn-sm">
          ←
        </Link>
        <h2 className="text-2xl font-bold text-slate-800">Cash Out</h2>
      </div>

      <div className="card bg-white shadow-xl border border-base-300 rounded-3xl">
        <div className="card-body p-7">
          <form onSubmit={handleCashOut} className="space-y-5">
            {error && (
              <div className="alert alert-error py-2 text-sm rounded-xl">
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label className="label"><span className="label-text font-medium">Agent Number</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <input type="tel" placeholder="017XXXXXXXX" maxLength={11} className="grow" required value={agentPhone} onChange={(e) => setAgentPhone(e.target.value)} />
              </label>
            </div>

            <div>
              <label className="label"><span className="label-text font-medium">Amount</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <CurrencyBangladeshiIcon className="h-5 w-5 text-gray-400" />
                <input type="number" placeholder="Enter amount" min="10" className="grow" required value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn w-full rounded-full text-white border-0 bg-gradient-to-r from-blue-600 to-indigo-700 mt-4">
              {loading ? <span className="loading loading-spinner"></span> : <><ArrowRightOnRectangleIcon className="w-5 h-5"/> Cash Out</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
