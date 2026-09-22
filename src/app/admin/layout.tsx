import { getSessionUser } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Squares2X2Icon, 
  UsersIcon, 
  ArrowsRightLeftIcon, 
  DocumentChartBarIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { logoutUser } from '@/app/actions/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  // Redirect if not logged in or not admin
  if (!user || user.role !== 'admin') {
    redirect('/login'); // Should actually redirect to admin login if we had a separate one
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6">
          <Image src="/admin/assets/logo full.png" alt="Admin Logo" width={160} height={40} className="w-40" />
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl">
            <Squares2X2Icon className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition">
            <UsersIcon className="w-5 h-5" /> User Management
          </Link>
          <Link href="/admin/transactions" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition">
            <ArrowsRightLeftIcon className="w-5 h-5" /> Transactions
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition">
            <DocumentChartBarIcon className="w-5 h-5" /> Reports
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition">
            <Cog6ToothIcon className="w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <form action={async () => {
            'use server';
            await logoutUser();
            redirect('/login');
          }}>
            <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-900/50 text-red-400 rounded-xl transition">
              <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Admin Control Panel</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Admin User</span>
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
