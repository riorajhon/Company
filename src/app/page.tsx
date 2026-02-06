import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import HeroSearch from '@/components/HeroSearch';
import HeroEntrance from '@/components/HeroEntrance';
import TypingEffect from '@/components/TypingEffect';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import TeamOfficeCarousel from '@/components/TeamOfficeCarousel';
export const dynamic = 'force-dynamic';

export default async function HomePage() {

  return (
    <>
      {/* Hero – two-column with image; right column full-bleed (no padding) */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-700">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/office.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/85 to-white/70 dark:from-gray-900/92 dark:via-gray-900/88 dark:to-gray-900/75" />
        </div>

        <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12 py-6 lg:py-8">
          <div className="px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8 lg:max-w-[720px] order-2 lg:order-1">
            <HeroEntrance>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, color: 'white', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                <TypingEffect
                  text="We're hiring. Join our team."
                  speed={160}
                  pauseAfter={2500}
                  pauseBefore={800}
                />
              </Typography>
              <Typography sx={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.95)', mb: 2 }}>
                Your career deserves real impact—not just another job. We build blockchain, crypto, and full‑stack products. Join a team that ships.
              </Typography>
              <Typography component="div" sx={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <span className="flex items-center gap-1.5"><span className="text-primary-300">✓</span> Smarter tech</span>
                <span className="flex items-center gap-1.5"><span className="text-primary-300">✓</span> Stronger growth</span>
                <span className="flex items-center gap-1.5"><span className="text-primary-300">✓</span> Lasting impact</span>
              </Typography>
              <HeroSearch />
            </HeroEntrance>
          </div>
          {/* Hero image section – stacked scrolling images */}
          <div className="flex justify-end items-center lg:flex-1 lg:min-w-0 order-1 lg:order-2 p-[10px] px-4 sm:px-6 lg:px-0 lg:pl-0 lg:pr-[10px]">
            <div className="h-[220px] sm:h-[260px] w-[180px] sm:w-[220px] overflow-hidden rounded-xl flex-shrink-0 bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/50">
              <div className={`${styles.film} flex flex-col gap-2 animate-scroll-up`}>
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team collaboration" width={220} height={165} className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover aspect-[4/3] flex-shrink-0" priority sizes="220px" />
                <Image src="/images/team.jpg" alt="Tech team at work" width={220} height={165} className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover aspect-[4/3] flex-shrink-0" sizes="220px" />
                <Image src="/images/employers.jpg" alt="Our team" width={220} height={165} className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover aspect-[4/3] flex-shrink-0" sizes="220px" />
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team collaboration" width={220} height={165} className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover aspect-[4/3] flex-shrink-0" sizes="220px" />
                <Image src="/images/team.jpg" alt="Tech team at work" width={220} height={165} className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover aspect-[4/3] flex-shrink-0" sizes="220px" />
                <Image src="/images/employers.jpg" alt="Our team" width={220} height={165} className="w-full h-auto rounded-lg shadow-lg border border-white/20 object-cover aspect-[4/3] flex-shrink-0" sizes="220px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar – Pumapulse-style numbers */}
      <Box component="section" className="bg-gray-100 dark:bg-gray-800" sx={{ py: 5 }}>
        <Container maxWidth="lg">
          <AnimateOnScroll>
            <Typography variant="overline" textAlign="center" sx={{ display: 'block', mb: 3, letterSpacing: 2, color: 'text.secondary' }}>
              Great results start here
            </Typography>
          </AnimateOnScroll>
          <Grid container spacing={4} justifyContent="center" sx={{ textAlign: 'center' }}>
            <Grid size={{ xs: 6, md: 3 }}>
              <AnimateOnScroll delay={0}>
                <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ lineHeight: 1.2 }}>Open roles</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>We&apos;re always hiring</Typography>
              </AnimateOnScroll>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <AnimateOnScroll delay={60}>
                <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ lineHeight: 1.2 }}>One team</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Direct collaboration, no middleman</Typography>
              </AnimateOnScroll>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <AnimateOnScroll delay={120}>
                <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ lineHeight: 1.2 }}>Ship & grow</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Real products, real impact</Typography>
              </AnimateOnScroll>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <AnimateOnScroll delay={180}>
                <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ lineHeight: 1.2 }}>Remote-first</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Work from anywhere</Typography>
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core values – Pumapulse-style cards */}
      <Box component="section" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <AnimateOnScroll>
            <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 1 }}>Smart values for smarter growth</Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', mb: 5 }}>
              What we believe in shapes how we build and who we hire.
            </Typography>
          </AnimateOnScroll>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <AnimateOnScroll delay={0}>
                <Box className="card p-5 h-full">
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: 'primary.main' }}>Trust first, always</Typography>
                  <Typography variant="body2" color="text.secondary">
                    We focus on honesty, reliability, and real results. No hidden terms—just a partnership built for the long run.
                  </Typography>
                </Box>
              </AnimateOnScroll>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AnimateOnScroll delay={80}>
                <Box className="card p-5 h-full">
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: 'primary.main' }}>Think fresh, build smart</Typography>
                  <Typography variant="body2" color="text.secondary">
                    We question, explore, and bring expert skills to the table. Real innovation comes from curiosity and execution.
                  </Typography>
                </Box>
              </AnimateOnScroll>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AnimateOnScroll delay={160}>
                <Box className="card p-5 h-full">
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, color: 'primary.main' }}>Take responsibility, make it happen</Typography>
                  <Typography variant="body2" color="text.secondary">
                    We don&apos;t wait for change—we make it. Every challenge is a chance to grow; when we commit, we deliver.
                  </Typography>
                </Box>
              </AnimateOnScroll>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Image flow – one line with flow effect (marquee) */}
      <section className="section py-8">
        <div className="container">
          <AnimateOnScroll>
            <h3 className="text-sm font-semibold text-center mb-6 text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Life at Sobapps
            </h3>
          </AnimateOnScroll>
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-4 animate-flow w-max">
              {[
                { src: '/images/office.jpg', alt: 'Office' },
                { src: '/images/team.jpg', alt: 'Tech team' },
                { src: '/images/design.jpg', alt: 'Design and roles' },
                { src: '/images/employers.jpg', alt: 'Team' },
                { src: '/images/hero-bg.jpg', alt: 'Work with us' },
              ].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-64 md:w-72">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={288}
                    height={180}
                    className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 object-cover"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { src: '/images/office.jpg', alt: 'Office' },
                { src: '/images/team.jpg', alt: 'Tech team' },
                { src: '/images/design.jpg', alt: 'Design and roles' },
                { src: '/images/employers.jpg', alt: 'Team' },
                { src: '/images/hero-bg.jpg', alt: 'Work with us' },
              ].map((img, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 w-64 md:w-72">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={288}
                    height={180}
                    className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find your job – with image */}
      <section className="section bg-gray-100 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary', display: 'block', mb: 1 }}>Careers</Typography>
              <h2 className="section-title mb-4">Find your spot at Sobapps</h2>
              <p className="section-subtitle mb-6">
                Browse open positions by role or skill. We hire for blockchain, crypto, and full‑stack—from smart contracts to product engineering. Apply in a few clicks.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <Image 
                src="/images/team.jpg" 
                alt="Tech team" 
                width={400} 
                height={280} 
                className="w-full h-auto max-w-md mx-auto rounded-xl object-cover" 
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Career at Sobapps – resources */}
      <section className="section">
        <Container maxWidth="lg">
          <AnimateOnScroll>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary', display: 'block', mb: 1 }}>Culture</Typography>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Life at Sobapps</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              How we work, what we value, and why people join us.
            </Typography>
            <Link href="/why-sobapp" className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center gap-1">
              Why work at Sobapps <span aria-hidden>→</span>
            </Link>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* We're building the team – carousel (team, office, building) + members */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll>
              <TeamOfficeCarousel />
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary', display: 'block', mb: 1 }}>Join us</Typography>
              <h2 className="section-title mb-4">We&apos;re building our tech team</h2>
              <p className="section-subtitle mb-6">
                We hire directly—no agencies. Work on real products with real impact. Check open jobs and apply when you&apos;re ready.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Meet the team</span>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Image
                      key={i}
                      src={`/images/members/member-${i}.jpg`}
                      alt=""
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow"
                    />
                  ))}
                </div>
              </div>
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

      {/* Testimonials */}
      <Box component="section" className="bg-gray-100 dark:bg-gray-800" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <AnimateOnScroll>
            <Typography variant="overline" textAlign="center" sx={{ display: 'block', letterSpacing: 2, color: 'text.secondary', mb: 1 }}>Testimonials</Typography>
            <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ mb: 2 }}>They had questions. Now they have results</Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto', mb: 5 }}>
              See our open jobs, learn about our culture, and apply. We review every application.
            </Typography>
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
        </Container>
      </Box>
    </>
  );
}
