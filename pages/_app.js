import React from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { Provider } from "react-redux";
import firebase from "../config/firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { applyMiddleware, createStore } from "redux";
import { createFirestoreInstance } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import thunk from "redux-thunk";

import { AppWrapper, theme } from "sriracha-ui";
import "sriracha-ui/css/main.css";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   fas,
//   faSpinner,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";

// library.add(fas, faSpinner, faSignOutAlt);

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GQL_API,
});

const client = new ApolloClient({
  cache,
  link,
});

const store = createStore(firebaseReducer, applyMiddleware(thunk));

const reactReduxFirebaseConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
};

const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <ApolloProvider client={client}>
          <AppWrapper bg={theme.colors.gray3}>
            <Component {...pageProps} />
          </AppWrapper>
        </ApolloProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
