'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/actions/auth';
import { PhoneIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginUser(phone, pin);
    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Image src="/assets/logo full.png" width={208} height={52} className="mx-auto" alt="Tranzo Logo" priority />
        </div>

        <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="card-body p-7">
            <h2 className="text-3xl font-bold text-center flex justify-center items-center gap-2">
              Welcome Back
              <ShieldCheckIcon className="h-8 w-8 text-pink-400" />
            </h2>
            <p className="text-center text-gray-500 mb-5">Login to your Tranzo account</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="alert alert-error py-2 text-sm rounded-xl">
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Mobile Number</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    maxLength={11}
                    className="grow"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-3 rounded-full focus-within:ring-2 focus-within:ring-primary">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="grow"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPin(!showPin)}>
                    {showPin ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    )}
                  </button>
                </label>
              </div>

              <div className="text-right">
                <Link href="#" className="text-primary text-sm hover:underline">Forgot Password?</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-full rounded-full text-white border-0 bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 duration-300"
              >
                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
              </button>
            </form>

            <div className="divider text-sm text-gray-400 mt-5">Don't have an account?</div>
            <div className="text-center mt-3">
              <Link href="/register" className="btn btn-outline btn-primary rounded-full w-full">Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
