import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  TimeAgo.addDefaultLocale(en);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
