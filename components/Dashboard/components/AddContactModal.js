import React from "react";
import { Modal, Box, Input, Button, Flex } from "sriracha-ui";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { addContactMutation, getUserQuery } from "../../../graphql";

export default function AddContactModal({ active, toggle }) {
  const uid = useSelector((state) => state.auth?.uid);
  const { handleSubmit, register } = useForm();
  const [addContact] = useMutation(addContactMutation);
  function onSubmit({ name, email, phone }) {
    addContact({
      variables: {
        data: {
          name,
          email,
          phone,
          userId: uid,
        },
      },
      refetchQueries: [{ query: getUserQuery, variables: { id: uid } }],
    });
    toggle();
  }
  return (
    <Modal active={active} toggle={toggle}>
      <Flex drape as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input ref={register} placeholder="Contact name..." name="name" />
        <Box h="2rem" />
        <Input ref={register} placeholder="Contact email..." name="email" />
        <Box h="2rem" />
        <Input
          ref={register}
          placeholder="Contact phone number..."
          name="phone"
        />
        <Box h="2rem" />
        <Flex>
          <Button green type="submit">
            Submit
          </Button>
          <Button red onClick={toggle}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
