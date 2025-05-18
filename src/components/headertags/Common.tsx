import React from "react";

import Gtm from "@/components/headertags/Gtm.tsx";
import Favicon from "@/assets/images/favicon.ico";

export default () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="icon" href={Favicon} type="image/x-icon"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Gtm />
      <meta
        name="google-site-verification"
        content="s2WKULd1Dfu2PnNrPPa5EBcVuoiNiJcjmPnNRfAie7o"
      />
    </>
  );
};
