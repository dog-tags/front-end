import React, { useState } from "react";
import { useSelector } from "react-redux";

import Landing from "./Landing";
import Loading from "./Loading";

export default function PrivateRoute({ component: PrivateComponent }) {
  const [token, setToken] = useState("");
  const loaded = useSelector((state) => state.profile?.isLoaded);

  useSelector(
    async (state) =>
      (await state.auth?.stsTokenManager) &&
      state.auth?.stsTokenManager?.accessToken
  ).then((res) => setToken(res));

  return (
    <>
      {token ? (
        <PrivateComponent />
      ) : loaded && !token ? (
        <Landing />
      ) : (
        <Loading />
      )}
    </>
  );
}
