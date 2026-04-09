'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  );
}

export function NewsletterForm({ invert = false }: { invert?: boolean } = {}) {
  const [formState, setFormState] = useState<{
    pending: boolean;
    success: boolean;
    message: string | null;
    error: string | null;
  }>({
    pending: false,
    success: false,
    message: null,
    error: null,
  });

  async function handleSubmit(formData: FormData) {
    setFormState({ pending: true, success: false, message: null, error: null });
    
    try {
      const result = await subscribeToNewsletter(formData);
      
      if (result.success) {
        setFormState({ 
          pending: false, 
          success: true, 
          message: result.message || "Thank you for subscribing to our newsletter!", 
          error: null 
        });
        // Reset form
        const form = document.getElementById('newsletterForm') as HTMLFormElement;
        form?.reset();
      } else {
        setFormState({ 
          pending: false, 
          success: false, 
          message: null,
          error: result.error || 'Failed to subscribe. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({ 
        pending: false, 
        success: false, 
        message: null,
        error: 'An unexpected error occurred. Please try again.' 
      });
    }
  }

  return (
    <form id="newsletterForm" className="max-w-sm" action={handleSubmit}>
      <h2 className={clsx(
        'font-display text-sm font-semibold tracking-wider',
        invert ? 'text-white' : 'text-neutral-950',
      )}>
        Sign up for our newsletter
      </h2>
      <p className={clsx('mt-4 text-sm', invert ? 'text-neutral-400' : 'text-neutral-700')}>
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      
      {formState.success && (
        <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
          <p>{formState.message}</p>
        </div>
      )}
      
      {formState.error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          <p>{formState.error}</p>
        </div>
      )}

      <div className="relative mt-6">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          required
          className={clsx(
            'block w-full rounded-2xl border bg-transparent py-4 pl-6 pr-20 text-base/6 ring-4 ring-transparent transition focus:outline-none',
            invert
              ? 'border-white/20 text-white placeholder:text-neutral-500 focus:border-white focus:ring-white/10'
              : 'border-neutral-300 text-neutral-950 placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5',
          )}
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            disabled={formState.pending}
            className={clsx(
              'flex aspect-square h-full items-center justify-center rounded-xl transition disabled:opacity-70',
              invert
                ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                : 'bg-neutral-950 text-white hover:bg-neutral-800',
            )}
          >
            {formState.pending ? (
              <span className={clsx(
                'h-4 w-4 animate-spin rounded-full border-2 border-t-transparent',
                invert ? 'border-neutral-950' : 'border-white',
              )} />
            ) : (
              <ArrowIcon className="w-4" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
} 