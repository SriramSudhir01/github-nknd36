"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Something went wrong!</h1>
          <p className="mt-2 text-sm text-gray-600">
            An error occurred while processing your request.
          </p>
        </div>
        <div className="mt-8">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}