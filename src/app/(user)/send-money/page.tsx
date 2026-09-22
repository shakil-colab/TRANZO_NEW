'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { performTransaction } from '@/app/actions/transaction';
import { sendEmailReceipt } from '@/app/actions/email';
import { PaperAirplaneIcon, PhoneIcon, CurrencyBangladeshiIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function SendMoney() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    const res = await performTransaction('Send Money', phone, Number(amount));
    if (res.success) {
      if (email) {
        // Send email via Resend API
        await sendEmailReceipt(email, res.txnId || 'TXN-UNKNOWN', Number(amount));
      }
      setSuccessMsg('Money sent successfully!');
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
        <h2 className="text-2xl font-bold text-slate-800">Send Money</h2>
      </div>

      <div className="card bg-white shadow-xl border border-base-300 rounded-3xl">
        <div className="card-body p-7">
          <form onSubmit={handleSend} className="space-y-5">
            {error && (
              <div className="alert alert-error py-2 text-sm rounded-xl">
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label className="label"><span className="label-text font-medium">Receiver Mobile Number</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <input type="tel" placeholder="017XXXXXXXX" maxLength={11} className="grow" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>
            </div>

            <div>
              <label className="label"><span className="label-text font-medium">Amount</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <CurrencyBangladeshiIcon className="h-5 w-5 text-gray-400" />
                <input type="number" placeholder="Enter amount" min="10" className="grow" required value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
            </div>

            <div>
              <label className="label"><span className="label-text font-medium">Email Receipt (Optional)</span></label>
              <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                <span className="text-gray-400">@</span>
                <input type="email" placeholder="example@email.com" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn w-full rounded-full text-white border-0 bg-gradient-to-r from-blue-600 to-indigo-700 mt-4">
              {loading ? <span className="loading loading-spinner"></span> : <><PaperAirplaneIcon className="w-5 h-5"/> Send Money</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
