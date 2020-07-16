import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import BackgroundComponent from "../../src/components/BackgroundComponent";
import HeaderComponent from "../../src/components/HeaderComponent";
import InfoComponent from "../../src/components/InfoComponent";

function VehiclesId({ data }) {
  const [characters, changeCharacters] = useState([["", ""]]);
  const [films, changeFilms] = useState([["", ""]]);

  async function getInfos() {
    let charactersHandler = [];
    let filmsHandler = [];

    await axios
      .all(data.pilots.map((element) => axios.get(element)))
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
                <h1 key={key}>{`${key.replace(/_/g, " ")}: ${
                  Object.values(data)[0]
                }`}</h1>
              );
            } else if (index < 11) {
              return (
                <h3 key={key}>{`${key.replace(/_/g, " ")}: ${
                  Object.values(data)[index]
                }`}</h3>
              );
            } else if (index <= 12) {
              return (
                <Fragment key={"info " + key}>
                  <h3 key={key}>{`${key.replace(/_/g, " ")}:`}</h3>
                  {index === 12
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

  await axios.get(`https://swapi.dev/api/vehicles/?page=1`).then((response) => {
    pages =
      response.data.count.toString().length > 1
        ? response.data.count.toString()[1] !== "0"
          ? Number(response.data.count.toString()[0]) + 1
          : Number(response.data.count.toString()[0])
        : 1;
  });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/vehicles/?page=${index}`));
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
    .get(`https://swapi.dev/api/vehicles/${params.id}`)
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

export default VehiclesId;
