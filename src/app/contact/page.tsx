import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact — Sobapps',
  description: 'Get in touch with Sobapps.',
};

export default function ContactPage() {
  return (
    <>
      <section className="section py-16">
        <div className="container max-w-2xl">
          <p className="text-sm font-semibold text-primary-500 mb-4 uppercase tracking-wider">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">Get in touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Have a question or want to work with us? Send a message and we'll get back to you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}