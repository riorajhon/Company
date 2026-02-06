import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'About — Sobapps',
  description: 'We are a developer company. Learn about our mission, culture, and how we work.',
};

export default function AboutPage() {
  return (
    <>
      <section className={`section ${styles.aboutHero}`}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-25 dark:opacity-20"
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.narrow} ${styles.heroContent}`}>
          <p className={styles.label}>About us</p>
          <h1 className={styles.pageTitle}>Built by developers, for developers</h1>
          <p className={styles.lead}>
            A technology company specializing in blockchain development, full‑stack applications,
            crypto trading platforms, and decentralized solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.narrow}`}>
          <h2 className={styles.blockTitle}>Who we are</h2>
          <p className={styles.body}>
            Sobapps is a technology company specializing in blockchain development, full‑stack applications,
            crypto trading platforms, and decentralized solutions. We help startups and enterprises bring their
            blockchain ideas to life by delivering secure, scalable, and innovative digital products.
          </p>
          <p className={styles.body}>
            Over the years, we have built a reputation for excellence in smart contract development, DeFi solutions,
            NFT projects, crypto exchange platforms, and full‑stack web and mobile applications. Our team combines deep
            technical expertise with a practical understanding of the crypto ecosystem, ensuring that every project we
            handle is both reliable and future‑ready.
          </p>
          <p className={styles.body}>
            At Sobapps, we believe in innovation, transparency, and collaboration. We are passionate about empowering
            businesses to leverage blockchain and full‑stack technology to create real‑world impact and transform digital experiences.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.narrow}`}>
          <h2 className={styles.blockTitle}>How we work</h2>
          <ul className={styles.list}>
            <li><strong>Remote-first</strong> — Work from home or a co-working space. We care about output, not hours online.</li>
            <li><strong>Async by default</strong> — Write it down. We use docs and threads so everyone can stay in the loop.</li>
            <li><strong>Ownership</strong> — You own your domain. We trust you to make calls and ship.</li>
            <li><strong>Learning</strong> — Budget for books, courses, and conferences. We want you to grow.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.narrow}`}>
          <h2 className={styles.blockTitle}>Tech we use</h2>
          <p className={styles.body}>
            TypeScript, React, Node.js, Next.js, MongoDB, and the usual dev tools (Git, linear-style issue tracking, CI/CD).
            For blockchain and crypto we work with Solidity, Ethereum, EVM-compatible chains, and related tooling.
            We choose boring tech where it fits and adopt new things when they clearly win.
          </p>
        </div>
      </section>
    </>
  );
}
