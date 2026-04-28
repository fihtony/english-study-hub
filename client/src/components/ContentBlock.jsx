import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/CSTL4.module.css";

/**
 * ContentBlock
 *
 * Reusable, accessible content block used in page body.
 * Props:
 * - title: string or node
 * - body: string or node (rendered as plain text to avoid XSS)
 * - image: { src: string, alt?: string } (optional)
 * - imagePosition: "left" | "right" (default: "right")
 * - actions: array of { label, href?, onClick?, variant?: "primary"|"secondary" }
 *
 * Exposes test ids:
 * - data-testid="contentblock-root"
 * - data-testid="contentblock-title"
 * - data-testid="contentblock-body"
 * - data-testid="contentblock-image"
 * - data-testid="contentblock-actions"
 * - data-testid="contentblock-action-{index}"
 *
 * Note: body is NOT set via dangerouslySetInnerHTML to avoid XSS.
 */

const validateImagePosition = (pos) => (pos === "left" || pos === "right" ? pos : "right");

function safeIsExternal(href) {
  try {
    if (!href || typeof href !== "string") return false;
    const u = new URL(href, "http://example.invalid");
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const ContentBlock = ({ title, body, image, imagePosition, actions }) => {
  const imgPos = validateImagePosition(imagePosition);

  if (!title && !body) {
    // Nothing meaningful to render — fail gracefully but log for developers.
    // Returning null avoids throwing while surfacing the issue in console.
    // Tests should avoid passing both empty.
    // eslint-disable-next-line no-console
    console.error("ContentBlock: both title and body are empty. Nothing to render.");
    return null;
  }

  const renderBody = () => {
    if (React.isValidElement(body)) return body;
    if (typeof body === "string") {
      // Preserve newlines as <p> blocks for readability without using innerHTML.
      return body.split("\n\n").map((para, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={idx} className={styles.bodyParagraph}>
          {para}
        </p>
      ));
    }
    if (body == null) return null;
    // Fallback: render safe stringified content
    return <pre className={styles.bodyPre}>{String(body)}</pre>;
  };

  const renderActions = () => {
    if (!Array.isArray(actions) || actions.length === 0) return null;
    return (
      <div className={styles.actions} data-testid="contentblock-actions" role="group" aria-label={`${title || "content"} actions`}>
        {actions.map((a, i) => {
          const label = a && (a.label || a.text || `Action ${i + 1}`);
          const href = a && a.href;
          const onClick = a && a.onClick;
          const variant = a && a.variant === "secondary" ? styles.actionSecondary : styles.actionPrimary;
          const testid = `contentblock-action-${i}`;
          // If href provided, render link; else render button.
          if (href) {
            const external = safeIsExternal(href);
            return (
              // eslint-disable-next-line react/no-array-index-key
              <a
                key={i}
                className={`${styles.action} ${variant}`}
                href={href}
                onClick={onClick}
                data-testid={testid}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
              >
                {label}
              </a>
            );
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <button
              key={i}
              type="button"
              className={`${styles.action} ${variant}`}
              onClick={onClick}
              data-testid={testid}
              aria-label={label}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  };

  const imageElement =
    image && image.src ? (
      <div className={styles.imageWrapper} data-testid="contentblock-image" aria-hidden={image.alt ? "false" : "true"}>
        <img
          src={image.src}
          alt={image.alt || ""}
          className={styles.image}
          loading="lazy"
          decoding="async"
          // width/height should be controlled via CSS for responsive layout
        />
      </div>
    ) : null;

  // Order classes to support left/right image position. CSS module should
  // implement responsive stacking for small viewports.
  const textColumn = (
    <div className={styles.textColumn} data-testid="contentblock-text">
      {title ? (
        <h2 className={styles.title} data-testid="contentblock-title" tabIndex={-1}>
          {title}
        </h2>
      ) : null}
      <div className={styles.body} data-testid="contentblock-body">
        {renderBody()}
      </div>
      {renderActions()}
    </div>
  );

  const imageColumn = imageElement ? <div className={styles.imageColumn}>{imageElement}</div> : null;

  return (
    <section
      className={`${styles.container} ${imgPos === "left" ? styles.imageLeft : styles.imageRight}`}
      data-testid="contentblock-root"
      aria-labelledby={title ? undefined : undefined}
      role="region"
    >
      <div className={styles.inner}>
        {imgPos === "left" ? (
          <>
            {imageColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {imageColumn}
          </>
        )}
      </div>
    </section>
  );
};

ContentBlock.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }),
  imagePosition: PropTypes.oneOf(["left", "right"]),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      text: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      variant: PropTypes.oneOf(["primary", "secondary"]),
    })
  ),
};

ContentBlock.defaultProps = {
  title: null,
  body: null,
  image: null,
  imagePosition: "right",
  actions: [],
};

export default ContentBlock;