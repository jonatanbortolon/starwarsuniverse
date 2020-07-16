import App from "next/app";

import { createGlobalStyle } from "styled-components";

import { NextSeo } from "next-seo";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default class _App extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        </Head>
        <NextSeo
          title="Star Wars Universe"
          description="Everything about Star Wars"
          openGraph={{
            url: "https://starwarsuniverse.vercel.app",
            title: "Star Wars Universe",
            description: "Everything about Star Wars",
            images: [
              {
                url: "https://starwarsuniverse.vercel.app/images/logo.webp",
                width: 500,
                height: 250,
                alt: "Star Wars Universe",
              },
            ],
            site_name: "Star Wars Universe",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Component {...pageProps} />
        <GlobalStyle />
      </>
    );
  }
}
