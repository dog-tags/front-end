import React, { useCallback, useState } from "react";
import {
  Modal,
  Text,
  Input,
  Button,
  Flex,
  Card,
  Box,
  theme,
} from "sriracha-ui";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { storage } from "../../../config/firebase";
import { useMutation } from "@apollo/react-hooks";
import { addDogMutation, getUserQuery } from "../../../graphql";

export default function AddPetModal({ active, toggle }) {
  const uid = useSelector((state) => state.auth?.uid);

  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const [addDog] = useMutation(addDogMutation);

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true);
    console.log("acceptedFiles", acceptedFiles);
    await storage.ref(`/images/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
    await storage
      .ref("images")
      .child(acceptedFiles[0].name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImage(fireBaseUrl);
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const newPet = {
      userId: uid,
      name: data.name,
      breed: data.breed,
      weight: data.weight,
      details: data.details,
      birthday: data.birthday,
      avatar: image,
    };
    console.log("new pet:", newPet);
    addDog({
      variables: {
        data: newPet,
      },
      refetchQueries: [{ query: getUserQuery, variables: { id: uid } }],
    });
    toggle();
  }
  return (
    <Modal active={active} toggle={toggle}>
      <Flex as="form" drape onSubmit={handleSubmit(onSubmit)}>
        <Text>Paypal stuff for pet collar goes here...</Text>
        <Box h="2rem" />
        <Input ref={register} placeholder="Pet name..." name="name" />
        <Box h="2rem" />
        <Input ref={register} placeholder="Pet breed..." name="breed" />
        <Box h="2rem" />
        <Input ref={register} placeholder="Pet weight..." name="weight" />
        <Box h="2rem" />
        <Input
          as="textarea"
          ref={register}
          placeholder="Pet details..."
          name="details"
        />
        <Box h="2rem" />
        <Input ref={register} type="date" name="birthday" />
        <Box h="2rem" />
        {image ? (
          <Flex drape>
            <Box maxW="25rem">
              <img src={image} alt="preview" />
            </Box>
          </Flex>
        ) : loading ? (
          <Card invert>
            <Text bold>Loading...</Text>
          </Card>
        ) : (
          <Flex
            {...getRootProps()}
            border={`0.2rem dashed ${theme.colors.gray6}`}
            hvrBorder={`0.2rem dashed ${theme.colors.gray4}`}
            sqr="10rem"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here ...</p>
            ) : (
              <p>Drag 'n' drop an image here, or click to select image.</p>
            )}
          </Flex>
        )}
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
