import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wrapper, Text } from "sriracha-ui";

export default function Loading() {
  return (
    <Wrapper jcCenter aiCenter>
      {/* <FontAwesomeIcon icon="spinner" spin size="3x" /> */}
      <Text xlf bold>
        Loading...
      </Text>
    </Wrapper>
  );
}
