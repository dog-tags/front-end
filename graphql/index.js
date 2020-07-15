import { gql } from "apollo-boost";

export const getUserQuery = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      username
      email
      contacts {
        id
        name
        email
        phone
      }
      dogs {
        id
        name
        birthday
        avatar
        details
        breed
        weight
        photos {
          id
          image
        }
      }
    }
  }
`;

export const getDogQuery = gql`
  query($id: ID!) {
    dog(id: $id) {
      id
      name
      breed
      birthday
      weight
      avatar
      details
      photos {
        id
        image
      }
      contacts {
        id
        name
        email
        phone
      }
    }
  }
`;

export const registerMutation = gql`
  mutation($data: UserInput!) {
    register(data: $data) {
      id
      username
      email
    }
  }
`;

export const addDogMutation = gql`
  mutation($data: AddDogInput!) {
    addDog(data: $data) {
      id
      name
      breed
      weight
      details
      birthday
      avatar
      photos {
        id
        image
      }
    }
  }
`;

export const addContactMutation = gql`
  mutation($data: AddContactInput!) {
    addContact(data: $data) {
      id
      name
      email
      phone
    }
  }
`;
