import React, { useState } from "react";

//styles
import * as S from "./styles";

// custom components
import axios from "axios";
import Rodal from "rodal";

// imports
import EditContact from "../EditContact";

function ContactInfo({ person, getContact, sethideContact }) {
  const [editModal, showEditModal] = useState(false);

  const dalete = async () => {
    console.log(person);
    await axios.delete(`/api/contacts/delete/${person.id}`).then(result => {
      console.log(result);
      getContact(person.user_id);
      sethideContact(true);
    });
  };

  return (
    <>
      {person ? (
        <S.Content>
          <S.Info>
            <h3>{person.firstname}</h3>
            <p>Phone: {person.phone}</p>
            <p>Email: {person.email}</p>
          </S.Info>
          <S.Buttons>
            <S.Button onClick={() => showEditModal(true)}>
              <span>Edit</span>
            </S.Button>
            <S.Button onClick={dalete}>
              <span>Delete</span>
            </S.Button>
          </S.Buttons>
          <Rodal
            visible={editModal}
            onClose={() => showEditModal(false)}
            customStyles={{
              background: "#bbdefb",
              borderRadius: 15,
              width: 320,
              height: 300
            }}
          >
            <div>Edit Contact</div>
            <EditContact
              person={person}
              getContact={getContact}
              showEditModal={showEditModal}
            />
          </Rodal>
        </S.Content>
      ) : null}
    </>
  );
}

export default ContactInfo;
