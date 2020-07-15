import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getUserQuery } from "../../../graphql";
import { Flex, Box, Text, ToolTip, Card, Button, theme } from "sriracha-ui";
import firebase from "../../../config/firebase";

export default function UserOptions({ uid }) {
  const { data } = useQuery(getUserQuery, {
    variables: {
      id: uid,
    },
  });
  console.log("user data", data);
  return (
    <Flex>
      <ToolTip ttTop="3.4rem">
        <Text as="h2">Welcome, {data?.user?.username}!</Text>
        <Box w="2rem" />
        <div className="tooltip">
          <Card shade bg={theme.colors.gray2}>
            <Button row sink red onClick={() => firebase.auth().signOut()}>
              Logout
            </Button>
          </Card>
        </div>
      </ToolTip>
    </Flex>
  );
}
