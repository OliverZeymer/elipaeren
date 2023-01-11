/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export default function Heading({ children, h2, h3, bold, className }) {
  const styles = {
    h1: css`
      font-size: clamp(1.5em, -0.875rem + 8.333vw, 2.25rem);
      font-weight: ${bold ? 600 : 500};
    `,
    h2: css`
      font-size: clamp(1rem, -0.875rem + 8.333vw, 1.5rem) !important;
      font-weight: ${bold ? 600 : 500};
    `,
    h3: css`
      font-size: clamp(0.875rem, -0.875rem + 8.333vw, 1rem) !important;
      font-weight: ${bold ? 600 : 500};
    `,
  }
  return h2 ? (
    <h2 css={styles.h2} className={`font-medium leading-tight text-text ` + className}>
      {children}
    </h2>
  ) : h3 ? (
    <h3 css={styles.h3} className={`leading-tight text-text ` + className}>
      {children}
    </h3>
  ) : (
    <h1 css={styles.h1} className={`leading-tight text-text ` + className}>
      {children}
    </h1>
  )
}
