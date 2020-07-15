import React from "react";
import { NavBar, Wrapper, Text, Box, Flex, theme } from "sriracha-ui";
import Link from "next/link";
import { useSelector } from "react-redux";
import UserOptions from "./components/UserOptions";

export default function Layout({ children }) {
  const uid = useSelector((state) => state.auth?.uid);
  const navHeight = "5rem";

  return (
    <Wrapper>
      <NavBar h={navHeight} aiCenter jcBetween shade bg={theme.colors.gray1}>
        <Flex>
          <Box w="1rem" />
          <Link href="/">
            <Text as="h1" bold lf pointer>
              Pet Tags
            </Text>
          </Link>
        </Flex>
        {uid ? <UserOptions uid={uid} /> : <Text as="h2">Welcome!</Text>}
      </NavBar>
      <Box h={navHeight} />
      {children}
    </Wrapper>
  );
}
