import React from "react";
import Layout from "../Layout";
import { Card, Text, Button, useModal } from "sriracha-ui";
import { useQuery } from "@apollo/react-hooks";
import { getUserQuery } from "../../graphql";
import { useSelector } from "react-redux";
import PetList from "./components/PetList";
import ContactsList from "./components/ContactsList";
import AddContactModal from "./components/AddContactModal";
import AddPetModal from "./components/AddPetModal";

export default function Dashboard() {
  const { isModal: isContact, toggleModal: toggleContact } = useModal();
  const { isModal: isPet, toggleModal: togglePet } = useModal();

  const uid = useSelector((state) => state.auth?.uid);
  const { data, loading } = useQuery(getUserQuery, {
    variables: {
      id: uid,
    },
  });
  return (
    <Layout>
      <Card w="95%" maxW="850px" minH="90vh" shade>
        <Text as="h2" xlf bold>
          Pet List
        </Text>
        <Button green onClick={togglePet}>
          Add Pet
        </Button>
        <AddPetModal active={isPet} toggle={togglePet} />
        {data?.user?.dogs.length > 0 ? (
          <PetList loading={loading} dogs={data?.user?.dogs} />
        ) : null}
        <Text as="h2" xlf bold>
          Contacts List
        </Text>
        <Button green onClick={toggleContact}>
          Add Contact
        </Button>
        <AddContactModal active={isContact} toggle={toggleContact} />
        {data?.user?.contacts.length > 0 ? (
          <ContactsList loading={loading} contacts={data?.user?.contacts} />
        ) : null}
      </Card>
    </Layout>
  );
}
