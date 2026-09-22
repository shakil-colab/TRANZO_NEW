import { getAdminStats } from '@/app/actions/admin';
import { UsersIcon, CurrencyBangladeshiIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  if (!stats) return <div>Failed to load stats.</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <UsersIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
          </div>
        </div>

        {/* System Balance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CurrencyBangladeshiIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total System Balance</p>
            <h3 className="text-2xl font-bold text-slate-800">৳{stats.totalSystemBalance.toFixed(2)}</h3>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <ArrowsRightLeftIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Transactions</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalTxnCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.length > 0 ? stats.recentTransactions.map((txn: any) => (
                <tr key={txn.id}>
                  <td><span className="badge badge-ghost font-medium">{txn.type}</span></td>
                  <td>{txn.sender}</td>
                  <td>{txn.receiver}</td>
                  <td className="font-semibold text-slate-700">৳{txn.amount}</td>
                  <td>
                    <span className={`badge ${txn.status === 'Success' ? 'badge-success text-white' : 'badge-warning'}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="text-slate-500 text-sm">{txn.date}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
