import { getDashboardData } from '@/app/actions/dashboard';
import { getSessionUser, logoutUser } from '@/app/actions/auth';
import TransactionCard from '@/components/TransactionCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { 
  PaperAirplaneIcon, 
  PlusCircleIcon, 
  ArrowRightOnRectangleIcon, 
  ArrowsRightLeftIcon,
  WalletIcon,
  DocumentTextIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

export default async function Dashboard() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const data = await getDashboardData();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, <span className="text-primary">{user.name}</span> 👋
          </h1>
          <p className="text-gray-500">Here is your financial overview.</p>
        </div>
        <form action={async () => {
          'use server';
          await logoutUser();
          redirect('/login');
        }}>
          <button className="btn btn-outline btn-error btn-sm rounded-full">
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-1" /> Logout
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Balance Card */}
        <div className="card bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl rounded-3xl">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 font-medium mb-1">Available Balance</p>
                <h2 className="text-4xl font-bold">৳ {data?.balance.toFixed(2) || '0.00'}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <WalletIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/add-money" className="btn btn-sm border-0 bg-white/20 text-white hover:bg-white/30 rounded-full">
                + Add Money
              </Link>
              <Link href="/send-money" className="btn btn-sm border-0 bg-white/20 text-white hover:bg-white/30 rounded-full">
                <PaperAirplaneIcon className="w-4 h-4" /> Send Money
              </Link>
            </div>
          </div>
        </div>

        {/* Expense Card */}
        <div className="card bg-white border border-base-300 shadow-sm rounded-3xl">
          <div className="card-body flex-row justify-between items-center">
            <div>
              <p className="text-gray-500 font-medium mb-1">Total Expense</p>
              <h2 className="text-3xl font-bold text-slate-800">৳ {data?.totalExpense.toFixed(2) || '0.00'}</h2>
            </div>
            <div className="bg-pink-100 p-4 rounded-2xl text-pink-600">
              <DocumentTextIcon className="w-8 h-8" />
            </div>
          </div>
          <div className="px-8 pb-6">
            <Link href="/expense" className="text-primary text-sm font-medium hover:underline">View Details →</Link>
          </div>
        </div>
      </div>

      {/* Quick Services */}
      <div className="mb-8">
        <div className="card bg-white shadow-xl border border-base-300 rounded-3xl">
          <div className="card-body">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Services</h3>
            <div className="grid grid-cols-4 gap-4">
              <Link href="/send-money" className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <PaperAirplaneIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600">Send</span>
              </Link>
              <Link href="/add-money" className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                  <PlusCircleIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600">Add</span>
              </Link>
              <Link href="/cashout" className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600">Cashout</span>
              </Link>
              <Link href="/money-transfer" className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                  <ArrowsRightLeftIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600">Transfer</span>
              </Link>
              <Link href="/pay-bill" className="flex flex-col items-center gap-2 group mt-2">
                <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-sm">
                  <DocumentTextIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600">Pay Bill</span>
              </Link>
              <Link href="/recharge" className="flex flex-col items-center gap-2 group mt-2">
                <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                  <DevicePhoneMobileIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600">Recharge</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
          <Link href="/history" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        
        {data?.transactions && data.transactions.length > 0 ? (
          <div>
            {data.transactions.map((txn: any) => (
              <TransactionCard 
                key={txn.id}
                type={txn.type}
                receiverPhone={txn.receiverPhone}
                amount={txn.amount}
                status={txn.status}
                date={txn.date}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white border border-base-300 rounded-3xl">
            <p className="text-gray-400">No recent transactions found.</p>
          </div>
        )}
      </div>

    </div>
  );
}
