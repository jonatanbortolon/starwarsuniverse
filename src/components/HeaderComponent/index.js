import React from "react";
import Link from "next/link";

import { Header, Partition1, NavButton, Logo, Partition3 } from "./styles";

const HeaderComponent = () => {
  return (
    <Header>
      <Partition1>
        <Link key="1" href="/">
          <NavButton>
            <img alt="Home" src={require("../../../public/images/home.webp")} />
            <h1>Home</h1>
          </NavButton>
        </Link>
        <Link key="2" href="/characters">
          <NavButton>
            <img
              alt="Characters"
              src={require("../../../public/images/characters.webp")}
            />
            <h1>Characters</h1>
          </NavButton>
        </Link>
        <Link key="3" href="/starships">
          <NavButton>
            <img
              alt="Starships"
              src={require("../../../public/images/starships.webp")}
            />
            <h1>Starships</h1>
          </NavButton>
        </Link>
        <Link key="4" href="/vehicles">
          <NavButton>
            <img
              alt="Vehicles"
              src={require("../../../public/images/vehicles.webp")}
            />
            <h1>Vehicles</h1>
          </NavButton>
        </Link>
        <Link key="5" href="/species">
          <NavButton>
            <img
              alt="Species"
              src={require("../../../public/images/species.webp")}
            />
            <h1>Species</h1>
          </NavButton>
        </Link>
        <Link key="6" href="/films">
          <NavButton>
            <img
              alt="Films"
              src={require("../../../public/images/films.webp")}
            />
            <h1>Films</h1>
          </NavButton>
        </Link>
        <Link key="7" href="/about">
          <NavButton>
            <img
              alt="About"
              src={require("../../../public/images/about.webp")}
            />
            <h1>About</h1>
          </NavButton>
        </Link>
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
      <Link href="/">
        <Logo>
          <img alt="Logo" src={require("../../../public/images/logo.webp")} />
        </Logo>
      </Link>
      <Partition3>
        <Link href="/about">
          <NavButton>
            <img
              alt="About"
              src={require("../../../public/images/about.webp")}
            />
            <h1>About</h1>
          </NavButton>
        </Link>
      </Partition3>
    </Header>
  );
};

export default HeaderComponent;
