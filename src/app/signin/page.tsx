import { Suspense } from 'react';
import SignInForm from '@/components/SignInForm';

export const metadata = {
  title: 'Sign in — Sobapps',
  description: 'Employer sign in.',
};

export default function SignInPage() {
  return (
    <section className="section py-16">
      <div className="container max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Sign in</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Employer access: manage jobs and applications.</p>
        <Suspense fallback={<p className="text-gray-600 dark:text-gray-400 text-center">Loading…</p>}>
          <SignInForm />
        </Suspense>
      </div>
    </section>
  );
}