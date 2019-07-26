import styled from "styled-components";

export const Content = styled.div({
  marginTop: "auto",
  marginBottom: "auto"
});

export const Info = styled.div({});

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
  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)"
});
