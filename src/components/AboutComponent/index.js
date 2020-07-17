import React from "react";

import { Container, Content, Footer } from "./styles";

function AboutComponent() {
  return (
    <Container>
      <Content>
        <p>
          Informations get with{" "}
          <a href="https://swapi.dev/" target="_blank">
            swapi.dev
          </a>
        </p>
        <br />
        <p>
          If you want to donate{" "}
          <a
            href="https://www.buymeacoffee.com/jonatanbortolon"
            target="_blank"
          >
            click here
          </a>
        </p>
        <br />
        <p>May the force be with you!</p>
      </Content>
      <Footer>
        <p>
          Made with ❤️ with{" "}
          <a href="https://jonatanbortolon.vercel.app" target="_blank">
            Jonatan Gabriel Bortolon
          </a>
        </p>
      </Footer>
    </Container>
  );
}

export default AboutComponent;
