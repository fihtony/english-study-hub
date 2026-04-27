import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/LandingPage.module.css';

export default function Home(): JSX.Element {
  // Defensive rendering: ensure styles is an object to avoid runtime errors if CSS module fails to load
  const s = typeof styles === 'object' && styles ? styles : {
    container: 'container',
    header: 'header',
    brand: 'brand',
    hero: 'hero',
    title: 'title',
    description: 'description',
    ctaLink: 'ctaLink',
    ctaButton: 'ctaButton',
    footer: 'footer',
  };

  return (
    <>
      <Head>
        <title>English Study Hub</title>
        <meta name="description" content="English Study Hub — practice and improve your English with quick quizzes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={s.container}>
        <header className={s.header} role="banner">
          <div className={s.brand}>
            <h1>English Study Hub</h1>
          </div>
        </header>

        <main className={s.hero} role="main" aria-labelledby="hero-heading">
          <h2 id="hero-heading" className={s.title}>Welcome to English Study Hub</h2>
          <p className={s.description}>
            Short, focused quizzes to help you practice vocabulary, grammar, and reading comprehension.
          </p>

          <Link href="/quiz" passHref>
            <a className={s.ctaLink} aria-label="Start the quiz">
              <button
                type="button"
                className={s.ctaButton}
                // Defensive click handler to gracefully handle unexpected failures
                onClick={(e) => {
                  try {
                    // no-op: Link handles navigation; keep for analytics hooks if added later
                  } catch (err) {
                    // Log to console only — avoid exposing internals to users
                    // eslint-disable-next-line no-console
                    console.error('Navigation failed', err);
                  }
                }}
              >
                Start Quiz
              </button>
            </a>
          </Link>
        </main>

        <footer className={s.footer} role="contentinfo">
          <small>© {new Date().getFullYear()} English Study Hub</small>
        </footer>

        <style jsx global>{`
          /* Minimal sensible defaults for when CSS module is not present in development */
          .container { display:flex; flex-direction:column; min-height:100vh; font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial; color:#111; }
          .header { padding:1.25rem 1rem; border-bottom:1px solid rgba(0,0,0,0.06); background:#fff; }
          .brand h1 { margin:0; font-size:1.25rem; }
          .hero { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:3rem 1rem; background:linear-gradient(180deg,#f7fafc,#fff); }
          .title { margin:0 0 0.5rem 0; font-size:2rem; }
          .description { margin:0 0 1.5rem 0; color:#334155; max-width:44rem; }
          .ctaLink { text-decoration:none; }
          .ctaButton { background-color:#0369a1; color:white; border:0; padding:0.75rem 1.25rem; border-radius:0.5rem; font-size:1rem; cursor:pointer; }
          .ctaButton:hover { background-color:#035e86; }
          .footer { padding:1rem; text-align:center; color:#64748b; border-top:1px solid rgba(0,0,0,0.04); background:#fff; }
        `}</style>
      </div>
    </>
  );
}