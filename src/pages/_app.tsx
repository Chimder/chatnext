import Layout from "@/components/Layout";
import Providers from "@/components/providers";
import "@/styles/index.scss";
import { QueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { ggsans } from "@/shared/lib/customFonts";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>;
};

export default App;
