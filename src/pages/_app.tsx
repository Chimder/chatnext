import Layout from "@/components/Layouts/Layout";
import Providers from "@/components/Providers/providers";
import "@/styles/index.scss";
import "@radix-ui/themes/styles.css";

import { QueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

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
