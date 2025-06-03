// src/pages/_app.tsx
import '../index.css'; // correct path to your Tailwind CSS file
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
