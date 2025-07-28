'use client';

import Button from '../button';
// import { useSearchParams } from 'next/navigation';
import { OctagonAlert } from 'lucide-react';
import authenticate from '@/app/admin/action';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Signing in...' : <>Sign in</>}
    </Button>
  );
}

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <form
      action={formAction}
      className="mx-auto flex max-w-md flex-col gap-4 text-left"
    >
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <SubmitButton />

      <div className="flex h-8 items-end space-x-1">
        {/* Add form errors here */}
        {errorMessage && (
          <>
            <OctagonAlert size={18} className="text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
