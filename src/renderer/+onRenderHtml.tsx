import React from "react";
import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

import Header from "../components/Header.tsx";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext,
): ReturnType<OnRenderHtmlAsync> => {
  const { Page } = pageContext;
  const viewHtml = dangerouslySkipEscape(
    renderToString(
      <>
        <Header />
        <main>
          <Page />
        </main>
      </>,
    ),
  );
  const title = pageContext.config.title || "ara-ta3の物置";
  const description =
    pageContext.config.description ||
    "ポートフォリオ兼個人ツールなどの物置です。";

  return escapeInject`<!DOCTYPE html>
    <html>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W5LM9X33');</script>
        <!-- End Google Tag Manager -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="ツール,GitHub Pages,個人サイト,ポートフォリオ">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:type" content="website">
        <meta name="author" content="ara-ta3">
        <link rel="canonical" href="https://ara-ta3.github.io/">
      <body>
        <div id="page-view">${viewHtml}</div>
      </body>
    </html>`;
};
export { onRenderHtml };
