import React from "react";
import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext,
): ReturnType<OnRenderHtmlAsync> => {
  const { Page } = pageContext;
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <>
        <Page />
      </>,
    ),
  );

  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`;
};
export { onRenderHtml };
