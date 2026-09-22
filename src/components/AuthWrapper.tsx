import { redirect } from 'next/navigation';
import { getSessionUser } from '@/app/actions/auth';
import Navbar from './Navbar';

export default async function AuthWrapper({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-5 py-8 w-full">
        {children}
      </main>
    </div>
  );
}
