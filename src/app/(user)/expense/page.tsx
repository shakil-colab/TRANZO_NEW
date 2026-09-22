'use client';

import { useState, useEffect } from 'react';
import { addExpense, getExpenses, deleteExpense } from '@/app/actions/expense';
import { TrashIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ExpensePage() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    fetchExpenses('All');
  }, []);

  const fetchExpenses = async (filterValue: string) => {
    const data = await getExpenses(filterValue);
    setExpenses(data);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addExpense(Number(amount), category, note, date);
    await fetchExpenses(filter);
    setAmount('');
    setNote('');
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
      await fetchExpenses(filter);
    }
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="btn btn-circle btn-ghost btn-sm">←</Link>
        <h2 className="text-2xl font-bold text-slate-800">Expense Tracker</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Expense Form */}
        <div className="card bg-white shadow-sm border border-base-300 h-fit">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Add New Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="label"><span className="label-text">Amount</span></label>
                <input type="number" className="input input-bordered w-full" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
              <div>
                <label className="label"><span className="label-text">Category</span></label>
                <select className="select select-bordered w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Bills</option>
                  <option>Health</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label className="label"><span className="label-text">Date</span></label>
                <input type="date" className="input input-bordered w-full" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div>
                <label className="label"><span className="label-text">Note (Optional)</span></label>
                <input type="text" className="input input-bordered w-full" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What was this for?" />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary w-full mt-4">
                {loading ? <span className="loading loading-spinner"></span> : 'Add Expense'}
              </button>
            </form>
          </div>
        </div>

        {/* Expenses List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-base-300">
            <div className="font-semibold text-gray-600">Total Expenses: <span className="text-xl text-primary ml-2">৳{totalExpense.toFixed(2)}</span></div>
            <select className="select select-sm select-bordered" value={filter} onChange={(e) => {
              setFilter(e.target.value);
              fetchExpenses(e.target.value);
            }}>
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-base-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Category</th>
                    <th>Note</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.length > 0 ? expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td><span className="badge badge-outline">{expense.category}</span></td>
                      <td className="text-gray-600">{expense.note}</td>
                      <td>{expense.date}</td>
                      <td className="font-semibold">৳{expense.amount.toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleDelete(expense.id)} className="btn btn-sm btn-ghost text-error">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        <ReceiptPercentIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        No expenses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
