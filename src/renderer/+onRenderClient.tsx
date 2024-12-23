import React from "react";
import ReactDOM from "react-dom/client";
import type { PageContextBuiltInClient } from "vike";
import type { OnRenderClientAsync } from "vike/types";

const onRenderClient: OnRenderClientAsync = async (
  pageContext,
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext;
  const root = document.getElementById("root")!;

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Page {...pageProps} />
    </React.StrictMode>,
  );
};

export { onRenderClient };
