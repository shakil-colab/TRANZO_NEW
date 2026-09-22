'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { performTransaction } from '@/app/actions/transaction';
import { DevicePhoneMobileIcon, SignalIcon, CurrencyBangladeshiIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MobileRecharge() {
  const [operator, setOperator] = useState('Grameenphone');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const rechargeDetails = `${operator} - ${phone}`;
    const res = await performTransaction('Mobile Recharge', rechargeDetails, Number(amount));
    
    if (res.success) {
      setSuccessMsg('Mobile Recharged Successfully!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
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
        <h2 className="text-2xl font-bold text-slate-800">Mobile Recharge</h2>
      </div>

      <div className="card bg-white shadow-xl border border-base-300 rounded-3xl">
        <div className="card-body p-7">
          <form onSubmit={handleRecharge} className="space-y-5">
            {error && (
              <div className="alert alert-error py-2 text-sm rounded-xl">
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="alert alert-success py-2 text-sm text-white rounded-xl">
                <span>{successMsg}</span>
              </div>
            )}
            
            <div>
              <label className="label"><span className="label-text font-medium">Operator</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <SignalIcon className="h-5 w-5 text-gray-400" />
                <select className="grow bg-transparent outline-none" value={operator} onChange={(e) => setOperator(e.target.value)}>
                  <option value="Grameenphone">Grameenphone</option>
                  <option value="Robi">Robi</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Banglalink">Banglalink</option>
                  <option value="Teletalk">Teletalk</option>
                </select>
              </label>
            </div>

            <div>
              <label className="label"><span className="label-text font-medium">Mobile Number</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
                <input type="tel" placeholder="01XXXXXXXXX" maxLength={11} className="grow" required value={phone} onChange={(e) => setPhone(e.target.value)} />
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
              {loading ? <span className="loading loading-spinner"></span> : <><DevicePhoneMobileIcon className="w-5 h-5"/> Recharge Now</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
