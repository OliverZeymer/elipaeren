/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function ComponentWrapper(props) {
  const { type, children, className } = props;

  let element;

  switch (type) {
    case "div":
      element = <div className={className}>{children}</div>;
      break;
    case "article":
      element = <article className={className}>{children}</article>;
      break;
    case "section":
      element = <section className={className}>{children}</section>;
      break;
    default:
      element = null;
  }

  return element;
}
