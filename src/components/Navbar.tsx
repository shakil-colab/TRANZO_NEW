import Link from 'next/link';
import Image from 'next/image';
import { BellIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <div className="navbar bg-white shadow-sm px-6">
      <div className="flex-1">
        <Link href="/dashboard">
          <Image 
            src="/assets/logo full.png" 
            alt="TRANZO Logo" 
            width={320} 
            height={80} 
            className="w-auto h-8"
            priority
          />
        </Link>
      </div>
      <div className="flex gap-3">
        <Link href="/notification">
          <button className="btn btn-circle btn-ghost">
            <BellIcon className="h-6 w-6 text-gray-700" />
          </button>
        </Link>
        <Link href="/profile">
          <button className="btn btn-circle btn-ghost">
            <UserIcon className="h-6 w-6 text-gray-700" />
          </button>
        </Link>
        <Link href="/settings">
          <button className="btn btn-circle btn-ghost">
            <Cog6ToothIcon className="h-6 w-6 text-gray-700" />
          </button>
        </Link>
      </div>
    </div>
  );
}
