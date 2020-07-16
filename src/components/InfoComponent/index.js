import React from "react";

import { Container, Box } from "./styles";

function InfoComponent({ children }) {
  return (
    <Container>
      <Box>{children}</Box>
    </Container>
  );
}

export default InfoComponent;
