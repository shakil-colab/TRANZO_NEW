import { getAllUsers } from '@/app/actions/admin';

export default async function AdminUsers() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Balance</th>
                <th>Joined Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map((user: any) => (
                <tr key={user.id}>
                  <td className="font-medium text-slate-800">{user.name}</td>
                  <td>{user.phone}</td>
                  <td className="font-semibold text-slate-700">৳{user.balance.toFixed(2)}</td>
                  <td className="text-slate-500 text-sm">{user.joined}</td>
                  <td>
                    <button className="btn btn-xs btn-outline btn-error">Block</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
