import React, { useState } from "react";
import {
  Wrapper,
  Text,
  Card,
  Flex,
  Button,
  Box,
  Form,
  Input,
  Modal,
  useModal,
  theme,
} from "sriracha-ui";
import { useMutation } from "@apollo/react-hooks";
import { registerMutation } from "../../graphql";
import { useForm } from "react-hook-form";
import firebase from "../../config/firebase";

export default function Landing() {
  const [register] = useMutation(registerMutation);

  const { isModal: isLogin, toggleModal: toggleLogin } = useModal();
  const { isModal: isRegister, toggleModal: toggleRegister } = useModal();

  const { register: reg, handleSubmit } = useForm();

  const [errors, setErrors] = useState();

  async function onLogin({ email, password }) {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("Firebase Response:", res);
    } catch (err) {
      setErrors(err.message);
    }
  }

  async function onRegister({ email, username, phone, password1, password2 }) {
    if (password1 !== password2) {
      setErrors("Passwords do not match... 💩");
      return;
    }
    if (password1.length < 6) {
      setErrors("Password must be 6 or more characters... 💩");
      return;
    }
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password1);
      console.log("FIREBASE RES:", res);
      const reg = await register({
        variables: {
          data: {
            id: res.user?.uid,
            username,
            email,
            phone,
          },
        },
      });
      console.log("Register Response:", reg);
    } catch (err) {
      setErrors(err.message);
    }
  }
  return (
    <>
      <Wrapper jcAround>
        <Card stretch>
          <Text as="h2" xlf bold m="3rem 0">
            Welcome to MyPage.Pet!
          </Text>
        </Card>
        <Flex stretch jcCenter visible>
          <Button green sink m="0 2rem" onClick={toggleLogin}>
            Login
          </Button>
          <Button amber sink m="0 2rem" onClick={toggleRegister}>
            Sign up
          </Button>
        </Flex>
        <Card taLeft p="3rem" stretch invert>
          <Flex drape>
            <Text as="a" lf bold href="/1" pointer>
              Go to Demo pet page.
            </Text>
            <Text as="p" m="2rem 0" maxW="60rem">
              MyPage.Pet brings you top quality collars for your pet and lets
              you create pages for your pet. Each collar comes with a unique QR
              code that can be scanned and will take you that pets page, where
              you can see more information about the pet and it's owner(s).
            </Text>
          </Flex>
        </Card>
        <Box h="15vh" />
      </Wrapper>
      <Modal active={isLogin} toggle={toggleLogin}>
        <Form
          onSubmit={handleSubmit(onLogin)}
          maxW="90vw"
          maxH="90vh"
          w="30rem"
        >
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="email"
            placeholder="Email..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="password"
            name="password"
            placeholder="Password..."
          />
          <Text color={theme.colors.red5} m="2rem 0">
            {errors ? errors : null}
          </Text>
          <Button type="submit" green>
            Login
          </Button>
        </Form>
      </Modal>
      <Modal active={isRegister} toggle={toggleRegister}>
        <Form
          onSubmit={handleSubmit(onRegister)}
          maxW="90vw"
          maxH="90vh"
          w="30rem"
        >
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="email"
            placeholder="Email..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="username"
            placeholder="Username..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="text"
            name="phone"
            placeholder="Phone number..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="password"
            name="password1"
            placeholder="Password..."
          />
          <Input
            m="0 0 1rem 0"
            ref={reg}
            type="password"
            name="password2"
            placeholder="Repeat password..."
          />
          <Text color={theme.colors.red5} m="2rem 0">
            {errors ? errors : null}
          </Text>
          <Button type="submit" green>
            Login
          </Button>
        </Form>
      </Modal>
    </>
  );
}
