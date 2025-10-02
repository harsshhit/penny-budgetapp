'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="h-10" />;
  }

  if (!session) {
    return (
      <Button onClick={() => signIn('google')} className="bg-violet-600 hover:bg-violet-700">
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {session.user?.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
      )}
      <span className="text-sm text-zinc-300">{session.user?.name || session.user?.email}</span>
      <Button variant="outline" onClick={() => signOut()} className="bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
        Sign out
      </Button>
    </div>
  );
}


