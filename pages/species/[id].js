import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import BackgroundComponent from "../../src/components/BackgroundComponent";
import HeaderComponent from "../../src/components/HeaderComponent";
import InfoComponent from "../../src/components/InfoComponent";

function SpeciesId({ data }) {
  const [homeworld, changeHomeworld] = useState(["", ""]);
  const [characters, changeCharacters] = useState([["", ""]]);
  const [films, changeFilms] = useState([["", ""]]);

  async function getInfos() {
    let charactersHandler = [];
    let filmsHandler = [];

    if (data.homeworld !== null) {
      await axios
        .get(data.homeworld)
        .then((response) =>
          changeHomeworld([response.data.name, response.data.url])
        );
    }

    await axios
      .all(data.people.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          charactersHandler.push([element.data.name, element.data.url]);
        })
      );

    changeCharacters(charactersHandler);

    await axios
      .all(data.films.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          filmsHandler.push([element.data.title, element.data.url]);
        })
      );

    changeFilms(filmsHandler);
  }

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <BackgroundComponent>
      <HeaderComponent />
      <InfoComponent>
        {Object.keys(data)
          .splice(0, Object.keys(data).length - 3)
          .map((key, index) => {
            if (index === 0) {
              return (
                <h1 key={key}>{`${key.replace(/_/i, " ")}: ${
                  Object.values(data)[0]
                }`}</h1>
              );
            } else if (index < 10) {
              if (index === 8) {
                return (
                  <h3 key={key}>
                    {`${key.replace(/_/i, " ")}: `}
                    <a
                      key={homeworld[0]}
                      href={
                        "/planets/" +
                        homeworld[1]
                          .slice(0, -1)
                          .slice(
                            homeworld[1].slice(0, -1).lastIndexOf("/") + 1,
                            homeworld[1].slice(0, -1).length
                          )
                      }
                    >
                      {homeworld[0]}
                    </a>
                  </h3>
                );
              } else {
                return (
                  <h3 key={key}>{`${key.replace(/_/i, " ")}: ${
                    Object.values(data)[index]
                  }`}</h3>
                );
              }
            } else if (index <= 11) {
              return (
                <Fragment key={"info " + key}>
                  <h3 key={key}>{`${key.replace(/_/i, " ")}:`}</h3>
                  {index === 11
                    ? films.map((element) => (
                        <a key={element[0]} href={element[1]}>
                          {element[0]}
                        </a>
                      ))
                    : characters.map((element) => (
                        <a
                          key={element[0]}
                          href={
                            "/characters/" +
                            element[1]
                              .slice(0, -1)
                              .slice(
                                element[1].slice(0, -1).lastIndexOf("/") + 1,
                                element[1].slice(0, -1).length
                              )
                          }
                        >
                          {element[0]}
                        </a>
                      ))}
                </Fragment>
              );
            }
          })}
      </InfoComponent>
    </BackgroundComponent>
  );
}

export async function getStaticPaths() {
  let paths = [];
  let quary = [];
  let pages = 1;

  await axios.get(`https://swapi.dev/api/species/?page=1`).then((response) => {
    pages =
      response.data.count.toString().length > 1
        ? response.data.count.toString()[1] !== "0"
          ? Number(response.data.count.toString()[0]) + 1
          : Number(response.data.count.toString()[0])
        : 1;
  });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/species/?page=${index}`));
  }

  await (await axios.all(quary)).forEach((i) => {
    const { results } = i.data;

    results.forEach((element) => {
      paths.push({
        params: {
          id: element.url
            .slice(0, -1)
            .slice(
              element.url.slice(0, -1).lastIndexOf("/") + 1,
              element.url.slice(0, -1).length
            ),
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let data = [];

  await axios
    .get(`https://swapi.dev/api/species/${params.id}`)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      data,
    },
  };
}

export default SpeciesId;
