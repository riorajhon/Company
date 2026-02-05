import styles from './page.module.css';

export const metadata = {
  title: 'About — Sobapps',
  description: 'We are a developer company. Learn about our mission, culture, and how we work.',
};

export default function AboutPage() {
  return (
    <>
      <section className={`section ${styles.aboutHero}`}>
        <div className={`container ${styles.narrow}`}>
          <p className={styles.label}>About us</p>
          <h1 className={styles.pageTitle}>Built by developers, for developers</h1>
          <p className={styles.lead}>
            We are a small team of engineers who care about clean code, clear communication,
            and shipping products that real people use.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.narrow}`}>
          <h2 className={styles.blockTitle}>What we do</h2>
          <p className={styles.body}>
            We build and maintain software products and help other teams ship faster.
            We work across traditional full‑stack and in blockchain and crypto — smart contracts,
            DeFi, Web3 apps, and crypto-native products. Our stack is modern and our processes are
            lightweight: we prefer async updates, short cycles, and minimal meetings so you can focus on building.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.narrow}`}>
          <h2 className={styles.blockTitle}>Blockchain & crypto</h2>
          <p className={styles.body}>
            We hire for roles in blockchain and crypto: smart contract development (e.g. Solidity),
            Ethereum and L2s, DeFi protocols, NFT platforms, and full‑stack crypto products.
            If you have experience in Web3, on-chain tooling, or crypto infrastructure, check our open jobs.
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
