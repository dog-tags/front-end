import React from "react";
import { Card, Text, Flex, Box, theme } from "sriracha-ui";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { getDogQuery } from "../graphql";
import Contacts from "../components/Contacts";

export default function PetPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, loading } = useQuery(getDogQuery, {
    variables: {
      id: slug,
    },
  });
  console.log("dog stuff", data);
  const dog = data?.dog;
  return (
    <Layout>
      {loading ? (
        <Card jcCenter>
          <Text bold>Loading...</Text>
        </Card>
      ) : (
        <Card minH="91vh" maxW="96%" w="830px" shade>
          <Text as="h2" lf bold>
            {dog.name}
          </Text>
          <Box maxW="15rem" pointer>
            <img src={dog.avatar} alt="pet avatar" />
          </Box>
          <Text as="p">
            <span style={{ fontWeight: "bold" }}>Breed:</span> {dog.breed}
          </Text>
          <Text as="p">
            <span style={{ fontWeight: "bold" }}>Weight:</span> {dog.weight}
          </Text>
          <Text as="p">
            <span style={{ fontWeight: "bold" }}>Birthday:</span> {dog.birthday}
          </Text>
          <Text as="p">
            <span style={{ fontWeight: "bold" }}>Details:</span> {dog.details}
          </Text>
          <Contacts contacts={dog.contacts} />
        </Card>
      )}
    </Layout>
  );
}
