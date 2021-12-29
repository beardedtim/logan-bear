import type { AppProps, NextWebVitalsMetric } from 'next/app'

import '../assets/css/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

export function reportWebVitals(metric: NextWebVitalsMetric) {
  const body = JSON.stringify({
    metric,
    url: window.location.href,
  })

  const url = '/api/analytics'

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, {
      body,
      method: 'POST',
      keepalive: true,
    })
  }
}
