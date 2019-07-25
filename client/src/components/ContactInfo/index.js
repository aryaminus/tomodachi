import React, { useState } from "react";

//styles
import * as S from "./styles";

function ContactInfo({ person }) {
  return (
    <>
      {person ? (
        <S.Content>
          <div className="contact-info">
            <header>
              <h3 className="name">{person.firstname}</h3>
            </header>
            <section>
              <p className="phone">Phone: {person.phone}</p>
              <p className="email">Email: {person.email}</p>
            </section>
          </div>
        </S.Content>
      ) : null}
    </>
  );
}

export default ContactInfo;
