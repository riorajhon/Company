import SignUpForm from '@/components/SignUpForm';

export const metadata = {
  title: 'Sign up — Sobapps',
  description: 'Employer registration. Account must be approved by a super manager to sign in.',
};

export default function SignUpPage() {
  return (
    <section className="section py-16">
      <div className="container max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Create employer account</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Anyone can sign up. A super manager must approve your account before you can sign in.
        </p>
        <SignUpForm />
      </div>
    </section>
  );
}