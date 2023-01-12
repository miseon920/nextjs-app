import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BlogProvider } from "../context/context";
import { prefix } from "../config/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlogProvider value={{prefix}}>
      <Component {...pageProps} />
    </BlogProvider>
  )
}

// 이미지 경로가 안맞아서 안나오는경우  backgroundImage: `url(${prefix}/images/rending/rending1.jpg)`