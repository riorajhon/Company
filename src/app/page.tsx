import Link from 'next/link';
import Image from 'next/image';
import JobCard from '@/components/JobCard';
import HeroSearch from '@/components/HeroSearch';
import HeroEntrance from '@/components/HeroEntrance';
import TypingEffect from '@/components/TypingEffect';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { connectDB } from '@/lib/db';
import { Job, type JobLean } from '@/models/Job';

export const dynamic = 'force-dynamic';

async function getFeaturedJobs() {
  await connectDB();
  const jobs = await Job.find({ published: true }).sort({ createdAt: -1 }).limit(6).lean() as unknown as JobLean[];
  return jobs.map((j) => ({ ...j, _id: j._id.toString() }));
}

export default async function HomePage() {
  const jobs = await getFeaturedJobs();

  return (
    <>
      {/* Hero – two-column with image */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 dark:from-gray-800 to-gray-50 dark:to-gray-900" />
        </div>
        
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-left">
              <HeroEntrance>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight">
                  <TypingEffect
                    text="We're hiring. Join our team."
                    speed={160}
                    pauseAfter={2500}
                    pauseBefore={800}
                  />
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Sobapps is building a strong tech team. We hire for blockchain, crypto, and full‑stack roles. Find an open job that fits your skills and grow with us.
                </p>
                <HeroSearch />
                <Link href="/jobs" className="btn-primary inline-block mt-4">
                  Browse open jobs
                </Link>
              </HeroEntrance>
            </div>
            <div className="flex justify-center items-center order-first lg:order-last">
              <HeroEntrance>
                <Image
                  src="/images/hero.svg"
                  alt=""
                  width={480}
                  height={360}
                  className="w-full h-auto max-w-lg rounded-xl"
                  priority
                />
              </HeroEntrance>
            </div>
          </div>
        </div>
      </section>

      {/* About our team / by the numbers */}
      <section className="section pt-16">
        <div className="container">
          <AnimateOnScroll>
            <h2 className="text-xl font-semibold text-center mb-8 text-gray-900 dark:text-gray-100">
              We're a tech company building products that matter
            </h2>
            <h3 className="text-sm font-semibold text-center mb-8 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sobapps at a glance
            </h3>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center max-w-4xl mx-auto">
            <AnimateOnScroll delay={0}>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold text-primary-500 tracking-tight leading-tight">Open jobs</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">We're always looking for great people</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={80}>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold text-primary-500 tracking-tight leading-tight">One team</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">You work with us directly — no middleman</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={160}>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold text-primary-500 tracking-tight leading-tight">Grow with us</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Learn, ship, and advance your career here</span>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={240}>
              <div className="flex flex-col gap-2">
                <span className="text-3xl md:text-4xl font-bold text-primary-500 tracking-tight leading-tight">Blockchain & crypto</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">We hire for Web3, smart contracts, and crypto product roles</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Blockchain & crypto skills / jobs */}
      <section className="section py-10 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
        <div className="container">
          <AnimateOnScroll>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
              Blockchain & crypto jobs
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              We build in Web3 and crypto. Open roles may include smart contract development, DeFi, NFT platforms, and full‑stack crypto products. If you have experience with Solidity, Ethereum, or related stacks, check our open jobs.
            </p>
            <div className="flex justify-center">
              <Link href="/jobs" className="btn-primary">View blockchain & crypto jobs</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Find your job – with image */}
      <section className="section bg-gray-100 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-gray-900 dark:text-gray-100">
                Find your job at Sobapps
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Browse our open positions by location or type. We post roles in blockchain, crypto, and full‑stack — from smart contracts to product engineering. Filter to what fits your skills and apply in a few clicks.
              </p>
              <Link href="/jobs" className="btn-primary">
                Browse open jobs
              </Link>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <Image 
                src="/images/tech-pros.svg" 
                alt="" 
                width={400} 
                height={280} 
                className="w-full h-auto max-w-md mx-auto rounded-xl" 
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Career at Sobapps – resources */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight text-gray-900 dark:text-gray-100">
              Life at Sobapps
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn how we work, what we value, and why people join our team.
            </p>
            <p className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Explore
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {[
              { href: '/jobs', emoji: '💼', label: 'Open jobs' },
              { href: '/about', emoji: '🏠', label: 'How we work' },
              { href: '/why-sobapp', emoji: '🧭', label: 'Why join us' },
              { href: '/why-sobapp', emoji: '🌱', label: 'Career growth' },
              { href: '/why-sobapp', emoji: '🤲', label: 'Culture & values' },
              { href: '/contact', emoji: '✉️', label: 'Get in touch' },
            ].map((item, i) => (
              <AnimateOnScroll key={item.label} delay={i * 50}>
                <Link 
                  href={item.href} 
                  className="card p-4 flex items-center gap-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:border-primary-500 hover:shadow-accent transition-all duration-200"
                >
                  <span className="text-lg">{item.emoji}</span> 
                  {item.label}
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll>
            <Link href="/why-sobapp" className="text-primary-500 hover:text-primary-600 font-semibold">
              Why work at Sobapps →
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* We're building the team – with image */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll>
              <Image 
                src="/images/employers.svg" 
                alt="" 
                width={400} 
                height={280} 
                className="w-full h-auto max-w-md mx-auto rounded-xl" 
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-gray-900 dark:text-gray-100">
                We're building our tech team
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                We hire directly — no agencies. You'll work with our team on real products, with real impact. Check open jobs and apply when you're ready.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/jobs" className="btn-primary">
                  View open jobs
                </Link>
                <Link href="/about" className="btn-secondary">
                  About us
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Opportunity + testimonials */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
              Join our team
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              See our open jobs, learn about our culture, and apply. We review every application and respond to everyone.
            </p>
            <div className="text-center mb-12">
              <Link href="/jobs" className="btn-primary">
                Browse open jobs
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: '"Clear communication, ownership, and room to grow. I joined Sobapps and never looked back."', author: 'Team member, Engineering' },
              { quote: '"The interview process was straightforward. I knew what to expect and felt respected throughout."', author: 'Team member, Product' },
              { quote: '"Remote-first and async by default — I do my best work here."', author: 'Team member, Tech' },
            ].map((t, i) => (
              <AnimateOnScroll key={t.author} delay={i * 80}>
                <blockquote className="card p-6">
                  <p className="text-gray-900 dark:text-gray-100 mb-4 leading-relaxed">
                    {t.quote}
                  </p>
                  <footer className="text-sm text-gray-600 dark:text-gray-400">
                    {t.author}
                  </footer>
                </blockquote>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Browse open jobs */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              Browse by job &amp; skill
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <AnimateOnScroll delay={0}>
              <div>
                <h3 className="text-xs font-semibold mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Job title
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Software Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
                    'DevOps Engineer', 'Data Scientist', 'Product Manager', 'Project Manager',
                    'Business Analyst', 'QA Tester', 'Network Engineer', 'Web Developer'
                  ].map((job) => (
                    <Link
                      key={job}
                      href={`/jobs?q=${encodeURIComponent(job)}`}
                      className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                    >
                      {job}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={60}>
              <div>
                <h3 className="text-xs font-semibold mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Data, AI &amp; ML skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Python', 'Machine Learning', 'Data Engineer', 'SQL', 'Artificial intelligence',
                    'React', 'JavaScript', 'Java', 'AWS', 'Docker'
                  ].map((skill) => (
                    <Link
                      key={skill}
                      href={`/jobs?q=${encodeURIComponent(skill)}`}
                      className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                    >
                      {skill}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={120}>
              <div>
                <h3 className="text-xs font-semibold mb-4 text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Popular searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Remote tech jobs', href: '/jobs?type=Remote' },
                    { label: 'Contract', href: '/jobs?type=Contract' },
                    { label: 'IT jobs', href: '/jobs' },
                    { label: 'Software engineering', href: '/jobs' },
                    { label: 'Full-time', href: '/jobs?type=Full-time' },
                    { label: 'Part time jobs', href: '/jobs' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
          <AnimateOnScroll>
            <Link href="/jobs" className="text-primary-500 hover:text-primary-600 font-semibold">
              View all open jobs
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Open positions */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Open positions
              </h2>
              <Link href="/jobs" className="text-sm font-semibold text-primary-500 hover:text-primary-600">
                View all jobs →
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 py-12 text-center">
                No open positions right now. Check back soon.
              </p>
            ) : (
              jobs.map((job, i) => (
                <AnimateOnScroll key={job._id} delay={Math.min(i * 60, 180)}>
                  <JobCard
                    id={job._id}
                    title={job.title}
                    location={job.workLocation ?? (job as { location?: string }).location ?? ''}
                    type={job.type}
                  />
                </AnimateOnScroll>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
