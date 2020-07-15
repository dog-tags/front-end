import React from "react";
import { Card, Text, Box, theme } from "sriracha-ui";

export default function Contacts({ contacts }) {
  console.log("contacts", contacts);
  return (
    <Card bg={theme.colors.gray3} w="96%" row wrap="true" jcAround>
      {contacts.map((contact) => {
        return (
          <Card key={contact.id}>
            <Text lf bold>
              Name
            </Text>
            <Box stretch h="0.2rem" bg={theme.colors.gray6} />
            <Text lf>{contact.name}</Text>
            <Box h="1.6rem" />
            <Text bold>Email</Text>
            <Box stretch h="0.2rem" bg={theme.colors.gray6} />
            <Text>{contact.email}</Text>
            <Box h="1.6rem" />
            <Text bold>Phone Number</Text>
            <Box stretch h="0.2rem" bg={theme.colors.gray6} />
            <Text>{contact.phone}</Text>
          </Card>
        );
      })}
    </Card>
  );
}
