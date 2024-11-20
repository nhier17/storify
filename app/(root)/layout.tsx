import Sidebar from '@/components/Sidebar';
import React from 'react'
import MobileNavbar from '@/components/MobileNavbar';
import Header from '@/components/Header';
import { Toaster } from "@/components/ui/toaster"
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/sign-in');

  

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />

      <section className="flex h-full flex-1 flex-col">
        <MobileNavbar {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="main-content">
          {children}
        </div>
      </section>

      <Toaster />
    </main>
  )
}

export default Layout;
