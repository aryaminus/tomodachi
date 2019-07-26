import styled from "styled-components";

export const Content = styled.div({
  marginTop: "auto",
  marginBottom: "auto"
});

export const Input = styled.textarea({
  borderRadius: 3,
  padding: 10,
  marginTop: 3,
  marginBottom: 3,
  border: "none",
  outline: "none",
  minHeight: 20,
  width: "80%",
  resize: "none",
  borderBottom: "2px solid #0d47a1"
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
