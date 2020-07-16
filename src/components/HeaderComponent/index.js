import React from "react";
import Router from "next/router";
import Link from "next/link";

import { Header, Partition1, NavButton, Logo, Partition3 } from "./styles";

const HeaderComponent = () => {
  return (
    <Header>
      <Partition1>
        <NavButton onClick={() => Router.push("/")}>
          <img alt="Home" src={require("../../../public/images/home.webp")} />
          <h1>Home</h1>
        </NavButton>
        <NavButton onClick={() => Router.push("/characters")}>
          <img
            alt="Characters"
            src={require("../../../public/images/characters.webp")}
          />
          <h1>Characters</h1>
        </NavButton>
        <NavButton onClick={() => Router.push("/starships")}>
          <img
            alt="Starships"
            src={require("../../../public/images/starships.webp")}
          />
          <h1>Starships</h1>
        </NavButton>
        <NavButton onClick={() => Router.push("/vehicles")}>
          <img
            alt="Vehicles"
            src={require("../../../public/images/vehicles.webp")}
          />
          <h1>Vehicles</h1>
        </NavButton>
        <NavButton onClick={() => Router.push("/species")}>
          <img
            alt="Species"
            src={require("../../../public/images/species.webp")}
          />
          <h1>Species</h1>
        </NavButton>
        <NavButton onClick={() => Router.push("/films")}>
          <img alt="Films" src={require("../../../public/images/films.webp")} />
          <h1>Films</h1>
        </NavButton>
        <NavButton onClick={() => Router.push("/about")}>
          <img alt="About" src={require("../../../public/images/about.webp")} />
          <h1>About</h1>
        </NavButton>
        <script
          data-name="BMC-Widget"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="jonatanbortolon"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#000"
          data-position="right"
          data-x_margin="10"
          data-y_margin="10"
        ></script>
      </Partition1>
      <Logo>
        <Link href="/">
          <img alt="Logo" src={require("../../../public/images/logo.webp")} />
        </Link>
      </Logo>
      <Partition3>
        <NavButton onClick={() => Router.push("/about")}>
          <img alt="About" src={require("../../../public/images/about.webp")} />
          <h1>About</h1>
        </NavButton>
      </Partition3>
    </Header>
  );
};

export default HeaderComponent;
