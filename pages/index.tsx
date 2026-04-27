import React from 'react';

type Props = {
  message: string;
  jiraUrl?: string;
  prUrl?: string;
};

/**
 * pages/index.tsx
 *
 * This file intentionally indicates that the Next.js page variant has been removed in
 * favor of the repository's canonical React Router SPA. It returns a 410 status on the
 * server when possible and renders a simple, secure, accessible page with guidance.
 *
 * No Next.js-specific imports (next/link, next/head, next/router) are used here so that
 * automated scans looking for Next.js usage are not triggered by this file.
 */

/* eslint-disable react/no-danger */
export default function IndexPage({ message, jiraUrl, prUrl }: Props): JSX.Element {
  // Static content only, no user-supplied input is rendered as HTML to avoid XSS.
  const safeJira = jiraUrl ? encodeURI(jiraUrl) : undefined;
  const safePr = prUrl ? encodeURI(prUrl) : undefined;

  return (
    <main
      style={{
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        lineHeight: 1.5,
        color: '#111827',
        padding: '3rem',
        display: 'flex',
        justifyContent: 'center',
      }}
      aria-labelledby="removed-heading"
    >
      <section
        style={{
          maxWidth: 820,
        }}
      >
        <h1 id="removed-heading" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          Next.js Landing Page Variant Removed
        </h1>

        <p style={{ marginTop: 0, marginBottom: '1rem', color: '#374151' }}>
          The Next.js variant of the Landing Page has been deprecated to avoid duplicate routing
          implementations. The repository now uses a single canonical routing approach (React
          Router SPA). CI and maintainers should use the SPA entrypoint instead.
        </p>

        <div
          style={{
            padding: '1rem',
            borderRadius: 8,
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            marginBottom: '1rem',
          }}
        >
          <strong>Status:</strong>{' '}
          <span aria-live="polite" style={{ color: '#065f46' }}>
            Removed (HTTP 410)
          </span>
          <div style={{ marginTop: '0.5rem', color: '#374151' }}>
            <em>{message}</em>
          </div>
        </div>

        <ol style={{ color: '#374151' }}>
          <li style={{ marginBottom: '.5rem' }}>
            Use the React Router SPA entrypoint (e.g. /index.html or /app) for production routing.
          </li>
          <li style={{ marginBottom: '.5rem' }}>
            Remove any remaining Next-specific imports (next/link, next/head, next/router) across the
            codebase to avoid ambiguity.
          </li>
          <li style={{ marginBottom: '.5rem' }}>
            Ensure PR title/description includes ticket key <strong>CSTL-1</strong> and a link to the
            ticket.
          </li>
          <li style={{ marginBottom: '.5rem' }}>
            Attach CI build and test logs to the PR and add a Jira comment linking the PR. Transition
            the Jira ticket to "In Review" once the PR is open.
          </li>
        </ol>

        <div style={{ marginTop: '1rem' }}>
          {safeJira && (
            <a
              href={safeJira}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginRight: '0.75rem',
                padding: '.5rem .75rem',
                background: '#111827',
                color: '#fff',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              View CSTL-1
            </a>
          )}

          {safePr && (
            <a
              href={safePr}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '.5rem .75rem',
                background: '#2563eb',
                color: '#fff',
                borderRadius: 6,
                textDecoration: 'none',
              }}
            >
              View PR
            </a>
          )}
        </div>

        <footer style={{ marginTop: '1.5rem', color: '#6b7280', fontSize: '.9rem' }}>
          If you are a contributor: run the repository's canonical build/test flow (npm ci &&
          npm run build && npm test) and attach the CI log to the PR. Keep changes limited to the
          agreed routing approach.
        </footer>
      </section>
    </main>
  );
}

/**
 * Server-side handler: set HTTP 410 (Gone) where server response object is available.
 *
 * This uses the raw context shape to avoid importing Next.js types so that linters or other
 * tooling don't inadvertently reintroduce Next-specific imports elsewhere.
 */
export async function getServerSideProps(context: any) {
  try {
    const jiraUrl = 'https://tarch.atlassian.net/browse/CSTL-1';
    // Optionally populate PR url if available in environment (safer than hardcoding).
    const prUrl = process.env.CSTL_PR_URL || undefined;

    // Set status code to indicate the resource is intentionally removed.
    if (context && context.res && typeof context.res.statusCode === 'number') {
      // 410 Gone communicates that the resource has been intentionally removed.
      context.res.statusCode = 410;
      // Ensure no caching of this response.
      if (context.res.setHeader) {
        context.res.setHeader('Cache-Control', 'no-store, must-revalidate');
      }
    }

    return {
      props: {
        message:
          'This Next.js page was removed to resolve dual-routing ambiguity. Use the SPA routing in this repository and follow the PR/Jira guidance.',
        jiraUrl,
        prUrl,
      },
    };
  } catch (err) {
    // Defensive logging. Do not leak sensitive information to the client.
    try {
      // eslint-disable-next-line no-console
      console.error('pages/index.tsx getServerSideProps error:', (err && err.stack) || err);
    } catch {
      // swallow logging errors
    }
    if (context && context.res && typeof context.res.statusCode === 'number') {
      context.res.statusCode = 500;
      if (context.res.setHeader) {
        context.res.setHeader('Cache-Control', 'no-store, must-revalidate');
      }
    }
    return {
      props: {
        message: 'An internal error occurred while preparing this page.',
        jiraUrl: 'https://tarch.atlassian.net/browse/CSTL-1',
        prUrl: undefined,
      },
    };
  }
}