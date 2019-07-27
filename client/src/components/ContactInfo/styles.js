import styled from "styled-components";

export const Content = styled.div({
  marginTop: "auto",
  marginBottom: "auto"
});

export const Info = styled.div({});

export const Name = styled.div({
  fontSize: "24px",
  color: "#223448"
});

export const Phone = styled.div({
  display: "flex",
  flexDirection: "row"
});

export const Email = styled.div({
  display: "flex",
  flexDirection: "row"
});

export const href = styled.a({
  textDecoration: "none",
  color: "#111b27",
  borderBottom: "1px solid transparent",
  transition: "all 100ms linear",
  alignSelf: "center",
  fontSize: 18,
  "&:hover": {
    borderBottom: "1px solid white"
  }
});

export const Buttons = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
});

export const Button = styled.button({
  userSelect: "none",
  border: "none",
  fontSize: 18,
  borderRadius: 12,
  maxWidth: 140,
  padding: 10,
  width: "100%",
  transition: "all 150ms linear",
  background: "transparent",
  "&:hover": {
    color: "#fff",
    transform: "scale(1.05)",
    cursor: "pointer",
    userSelect: "none !important"
  }
  // boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)"
});
