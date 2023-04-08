import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  );
}