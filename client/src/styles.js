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
  position: "absolute",
  right: "2%",
  top: "2%"
});

export const Avatar = styled.img({
  borderRadius: "100%",
  width: 50,
  height: 50,
  maxHeight: 50,
  maxWidth: 50,
  marginTop: 8,
  marginRight: 10,
  minWidth: 50,
  minHeight: 50
});

export const UserName = styled.div({
  fontWeight: "bold",
  fontSize: "22px",
  color: "#bbdefb",
  alignSelf: "center"
});

export const ContactsContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  transition: "all 100ms linear",
  padding: "25px 10px",
  backgroundColor: "#758dd245",
  borderRadius: "11px",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)"
});

export const Bar = styled.div({
  height: 56,
  padding: 15,
  minWidth: 155
});

export const Title = styled.div({
  fontSize: "24px",
  color: "#223448"
});

export const Contact = styled.div({
  margin: "0 0 1rem 0",
  padding: 3,
  minWidth: 180,
  textAlign: "left",
  "&:hover": {
    // background: "#fff",
    transform: "scale(1.02)",
    cursor: "pointer",
    userSelect: "none !important"
  }
});

export const ContactList = styled.div({
  //   background: "#E6343B"
});

export const ContactInfo = styled.div({
  margin: "0 0 0 1rem",
  padding: 3
  //   background: "#fff"
});
