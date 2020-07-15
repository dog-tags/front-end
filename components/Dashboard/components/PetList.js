import React from "react";
import { Card, Text, Flex, Box, theme } from "sriracha-ui";
// import Link from "next/link";

export default function PetList({ loading, dogs }) {
  if (loading)
    return (
      <Card bg={theme.colors.gray3} w="46%">
        <Text bold lf>
          Loading...
        </Text>
      </Card>
    );
  return (
    <Card bg={theme.colors.gray3} w="96%" row aiStart wrap="true" jcAround>
      {dogs.map((dog) => (
        <Box as="a" href={`/${dog.id}`} key={dog.id} w="45%">
          <Card taLeft>
            <Flex drape>
              <Text bold>{dog.name}</Text>
              <img
                alt="dog avatar"
                src={dog.avatar}
                style={{ maxWidth: "15rem", height: "auto" }}
              />
            </Flex>
            <Flex col aiStart p="1.6rem 0 0 2rem" maxW="35rem">
              <Text jcStart row>
                <span style={{ fontWeight: "bold" }}>Details:</span>{" "}
                {dog.details}
              </Text>
            </Flex>
          </Card>
        </Box>
      ))}
    </Card>
  );
}
