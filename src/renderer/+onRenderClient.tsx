import React from "react";
import ReactDOM from "react-dom/client";
import type { PageContextBuiltInClient } from "vike";
import type { OnRenderClientAsync } from "vike/types";
import "../index.css";

const onRenderClient: OnRenderClientAsync = async (
  pageContext,
): ReturnType<OnRenderClientAsync> => {
  const { Page } = pageContext;
  const root = document.getElementById("root")!;
  const pageProps = "pageProps" in pageContext && pageContext.pageProps;

  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <Page {...pageProps} />
    </React.StrictMode>,
  );
};

export { onRenderClient };
