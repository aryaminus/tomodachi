import styled from "styled-components";

export const Background = styled.img({
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  maxWidth: "100vw",
  height: "100vh",
  overflow: "hidden",
  objectPosition: "top",
  objectFit: "cover",
  transition: "all 150ms ease-in",
  opacity: 1
});

export const FacebookContainer = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)"
});

export const UserDetail = styled.div({
  display: "flex",
  flexDirection: "row",
  // alignItems: "center",
  // justifyContent: "flex-end",
  position: "absolute",
  right: "2%",
  top: "2%"
  // transform: "translate(-50%, -50%)"
});

export const Avatar = styled.img({
  borderRadius: "100%",
  width: 50,
  height: 50,
  maxHeight: 50,
  maxWidth: 50,
  marginTop: 10,
  marginRight: 10,
  minWidth: 50,
  minHeight: 50
});

export const ContactsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  // alignItems: "center",
  // justifyContent: "center",
  position: "absolute",
  left: "5%",
  top: "10%"
  // transform: "translate(-50%, -50%)"
});

export const Contact = styled.div({
  margin: "0 0 1rem 0",
  padding: 3,
  textAlign: "center"
});

export const ContactList = styled.div({
  //   background: "#E6343B"
});

export const ContactInfo = styled.div({
  margin: "0 0 0 1rem",
  padding: 3
  //   background: "#fff"
});
