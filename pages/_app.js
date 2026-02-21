import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const host = window.location.hostname;
    const subdomain = host.split(".")[0];

    fetch(`/api/public/tenant?slug=${subdomain}`)
      .then(res => res.json())
      .then(setTenant);
  }, []);

  return <Component {...pageProps} tenant={tenant} />;
}

export default MyApp;
