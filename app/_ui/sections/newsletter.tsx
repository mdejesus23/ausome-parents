'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import Image from 'next/image';
import Button from '@/app/_ui/button';
import type { State } from '@/app/_lib/newsletter/action';
import subscribe from '@/app/_lib/newsletter/action';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full max-w-sm sm:w-auto"
    >
      {pending ? 'Subscribing...' : 'Subscribe'}
    </Button>
  );
}

export default function Newsletter() {
  const initialState: State = { message: 'Error', success: null };
  const [state, formAction] = useActionState(subscribe, initialState);

  useEffect(() => {
    if (state.success === null) return;

    if (state.success) {
      toast.success(state.message);
    } else if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="relative h-[27rem] w-full">
      {/* Background Image */}
      <Image
        src="/thank-you-bg.webp"
        alt="Newsletter background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay with form */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="px-4 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Join the Newsletter
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-lg">
            Get parenting tips, faith-filled reflections, and the latest updates
            from Ausome Parents.
          </p>
          <form
            id="newsletter"
            action={formAction}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full max-w-sm rounded-sm border px-5 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:outline-none"
            />

            {/* Honeypot field */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: 'none' }}
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
