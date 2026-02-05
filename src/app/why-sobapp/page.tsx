import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Why Join Sobapps — Work With Us',
  description: 'Why work at Sobapps? Learn about our culture, how we hire, and what it\'s like to grow your career with us.',
};

export default function WhySobappPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Why work at Sobapps?</h1>
              <p className={styles.heroText}>
                We&apos;re one company, one team. You apply to us directly, work with us on real products, and grow your career here — no job board, no agencies.
              </p>
              <Link href="/jobs" className={styles.heroCta}>See open jobs</Link>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroPlaceholder} aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Why join us – 3 points */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why join our team</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon} aria-hidden>◇</span>
              <h3>Direct hiring</h3>
              <p>You apply to Sobapps — our team reviews your application and gets back to you. No third-party recruiters or job aggregators.</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon} aria-hidden>◇</span>
              <h3>Roles that fit your skills</h3>
              <p>We post clear job descriptions. Filter by location or work type and apply to the jobs that match your skills.</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon} aria-hidden>◇</span>
              <h3>One company, one team</h3>
              <p>You work with us — not &quot;thousands of employers.&quot; You&apos;ll know who we are, what we build, and how we work from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply – 3 steps */}
      <section className={`section ${styles.stepsSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How to apply</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <h3>Browse our open jobs</h3>
              <p>Search or filter by job title, location, or type (full-time, remote, contract). All listings are our own openings.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <h3>Apply in a few clicks</h3>
              <p>Click &quot;Apply&quot; on a job, fill in your details and resume link. We review every application and respond to everyone.</p>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>3</span>
              <h3>Interview with our team</h3>
              <p>If there&apos;s a fit, we&apos;ll reach out. You&apos;ll talk to the people you&apos;d work with — no endless rounds or surprises.</p>
            </div>
          </div>
          <div className={styles.stepsCtaWrap}>
            <Link href="/jobs" className={styles.stepsCta}>Browse open jobs</Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className={`section ${styles.quoteSection}`}>
        <div className="container">
          <blockquote className={styles.quote}>
            <p>&quot;I wanted to work at a place where I could own my domain and grow. Sobapps was exactly that.&quot;</p>
            <footer>Team member, Engineering</footer>
          </blockquote>
        </div>
      </section>

      {/* More reasons */}
      <section className={`section ${styles.benefitsSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>More reasons to join</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h3>How we work</h3>
              <p>Remote-first, async by default, and ownership-driven. We care about output and growth. Learn more about our culture and tech stack.</p>
              <Link href="/about">About us →</Link>
            </div>
            <div className={styles.benefitCard}>
              <h3>Open jobs</h3>
              <p>All our current openings are on this site. No duplicate postings elsewhere — what you see here is what we&apos;re hiring for.</p>
              <Link href="/jobs">View open jobs →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container narrow">
          <h2 className={styles.sectionTitle}>FAQs</h2>
          <dl className={styles.faqList}>
            <div className={styles.faqItem}>
              <dt>Who can apply?</dt>
              <dd>Anyone with the skills and experience we list in the job description. We hire for different levels and backgrounds. You don&apos;t need an account to apply — just use the apply form on each job.</dd>
            </div>
            <div className={styles.faqItem}>
              <dt>Is applying free?</dt>
              <dd>Yes. Applying to any job at Sobapps is free. We don&apos;t charge candidates.</dd>
            </div>
            <div className={styles.faqItem}>
              <dt>Do you have remote jobs?</dt>
              <dd>Yes. We&apos;re remote-first. Filter our job list by &quot;Remote&quot; or check the location on each job.</dd>
            </div>
            <div className={styles.faqItem}>
              <dt>Contract vs full-time?</dt>
              <dd>We post both when we have them. Filter by employment type (Full-time, Part-time, Contract, Remote) on the jobs page.</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
