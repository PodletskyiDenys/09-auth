'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type PropsPublicLayout = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PropsPublicLayout) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {    
    router.refresh();
    setLoading(false);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}