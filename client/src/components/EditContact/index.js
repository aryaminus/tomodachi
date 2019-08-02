import React, { useState } from "react";

//styles
import * as S from "./styles";

// custom components
import axios from "axios";

function EditContact({
  person,
  token,
  getContact,
  showEditModal,
  sethideContact
}) {
  const [firstName, setFirstName] = useState(person.firstname);
  const [lastName, setLastName] = useState(person.lastname);
  const [email, setEmail] = useState(person.email);
  const [phone, setPhone] = useState(person.phone);
  const [error, setError] = useState(``);
  const [output, setOutput] = useState(false);
  const [server, setServer] = useState(0);

  const checkFormErrors = async (firstName, lastName, email, phone) => {
    if (firstName.length < 2) {
      setOutput(false);
      setError("First Name needs to be at least 2 characters.");
    } else if (lastName.length < 2) {
      setOutput(false);
      setError("Last Name needs to be at least 2 characters.");
    } else if (email.length < 10) {
      setOutput(false);
      setError("Email needs to be at least 10 characters.");
    } else if (phone.length < 10) {
      setOutput(false);
      setError("Phone needs to be at least 10 characters.");
    } else {
      setOutput(true);
    }
  };

  const send = async () => {
    checkFormErrors(firstName, lastName, email, phone);
    if (output === true) {
      const user_id = person.user_id;
      const id = person.id;
      const newContact = { user_id, firstName, lastName, email, phone };
      await axios
        .put(
          `/api/contacts/update/${id}?user_id=${user_id}&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}`,
          newContact,
          {
            headers: { Authorization: "bearer " + token }
          }
        )
        .then(result => {
          console.log(result);
          getContact(user_id, token);
          sethideContact(true);
          showEditModal(false);
          setServer(1);
        });
    }
  };

  return (
    <S.Content>
      <center>
        <br />
        <S.Input
          placeholder="First Name"
          defaultValue={person.firstname}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={e => setFirstName(e.target.value)}
        />

        <S.Input
          placeholder="Last Name"
          defaultValue={person.lastname}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={e => setLastName(e.target.value)}
        />

        <S.Input
          placeholder="Email"
          defaultValue={person.email}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={e => setEmail(e.target.value)}
        />

        <S.Input
          placeholder="Phone Number"
          defaultValue={person.phone}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={e => setPhone(e.target.value)}
        />

        <S.Button onClick={send}>
          <span>Edit</span>
        </S.Button>
      </center>

      {server == 1 ? (
        <center>
          <p>Message sent sucessfully!</p>
        </center>
      ) : null}
      {output ? null : (
        <center>
          <p>{error}</p>
        </center>
      )}
    </S.Content>
  );
}

export default EditContact;
