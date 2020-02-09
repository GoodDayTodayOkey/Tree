import NextApp, { AppInitialProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { initStore, IStore } from '../store/store'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme/theme';

interface Props extends AppInitialProps {
  store: IStore;
}

class MyApp extends NextApp<Props> {
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withRedux(initStore)(MyApp)