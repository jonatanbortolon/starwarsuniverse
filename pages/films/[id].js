import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import BackgroundComponent from "../../src/components/BackgroundComponent";
import HeaderComponent from "../../src/components/HeaderComponent";
import InfoComponent from "../../src/components/InfoComponent";

import Link from "next/link";

function FilmsId({ data }) {
  const [people, changePeople] = useState([["", ""]]);
  const [species, changeSpecies] = useState([["", ""]]);
  const [planets, changePlanets] = useState([["", ""]]);
  const [vehicles, changeVehicles] = useState([["", ""]]);
  const [starships, changeStarships] = useState([["", ""]]);

  async function getInfos() {
    let peopleHandler = [];
    let speciesHandler = [];
    let planetsHandler = [];
    let vehiclesHandler = [];
    let starshipsHandler = [];

    await axios
      .all(data.characters.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          peopleHandler.push([element.data.name, element.data.url]);
        })
      );

    changePeople(peopleHandler);

    await axios
      .all(data.species.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          speciesHandler.push([element.data.name, element.data.url]);
        })
      );

    changeSpecies(speciesHandler);

    await axios
      .all(data.planets.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          planetsHandler.push([element.data.name, element.data.url]);
        })
      );

    changePlanets(planetsHandler);

    await axios
      .all(data.vehicles.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          vehiclesHandler.push([element.data.name, element.data.url]);
        })
      );

    changeVehicles(vehiclesHandler);

    await axios
      .all(data.starships.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          starshipsHandler.push([element.data.name, element.data.url]);
        })
      );

    changeStarships(starshipsHandler);
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
            } else if (index < 6) {
              return (
                <h3 key={key}>{`${key.replace(/_/i, " ")}: ${
                  Object.values(data)[index]
                }`}</h3>
              );
            } else if (index <= 10) {
              return (
                <Fragment key={"info " + key}>
                  <h3 key={key}>{`${key.replace(/_/i, " ")}:`}</h3>
                  {index === 6
                    ? people.map((element) => (
                        <Link
                          key={element[0]}
                          href="/characters/[id]"
                          as={
                            "/characters/" +
                            element[1]
                              .slice(0, -1)
                              .slice(
                                element[1].slice(0, -1).lastIndexOf("/") + 1,
                                element[1].slice(0, -1).length
                              )
                          }
                        >
                          <a>{element[0]}</a>
                        </Link>
                      ))
                    : index === 7
                    ? planets.map((element) => (
                        <Link
                          key={element[0]}
                          href="/planets/[id]"
                          as={
                            "/planets/" +
                            element[1]
                              .slice(0, -1)
                              .slice(
                                element[1].slice(0, -1).lastIndexOf("/") + 1,
                                element[1].slice(0, -1).length
                              )
                          }
                        >
                          <a>{element[0]}</a>
                        </Link>
                      ))
                    : index === 8
                    ? starships.map((element) => (
                        <Link
                          key={element[0]}
                          href="/starships/[id]"
                          as={
                            "/starships/" +
                            element[1]
                              .slice(0, -1)
                              .slice(
                                element[1].slice(0, -1).lastIndexOf("/") + 1,
                                element[1].slice(0, -1).length
                              )
                          }
                        >
                          <a>{element[0]}</a>
                        </Link>
                      ))
                    : index === 9
                    ? vehicles.map((element) => (
                        <Link
                          key={element[0]}
                          href="/vehicles/[id]"
                          as={
                            "/vehicles/" +
                            element[1]
                              .slice(0, -1)
                              .slice(
                                element[1].slice(0, -1).lastIndexOf("/") + 1,
                                element[1].slice(0, -1).length
                              )
                          }
                        >
                          <a>{element[0]}</a>
                        </Link>
                      ))
                    : species.map((element) => (
                        <Link
                          key={element[0]}
                          href="/species/[id]"
                          as={
                            "/species/" +
                            element[1]
                              .slice(0, -1)
                              .slice(
                                element[1].slice(0, -1).lastIndexOf("/") + 1,
                                element[1].slice(0, -1).length
                              )
                          }
                        >
                          <a>{element[0]}</a>
                        </Link>
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

  await axios.get(`https://swapi.dev/api/films/?page=1`).then((response) => {
    pages =
      response.data.count.toString().length > 1
        ? response.data.count.toString()[1] !== "0"
          ? Number(response.data.count.toString()[0]) + 1
          : Number(response.data.count.toString()[0])
        : 1;
  });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/films/?page=${index}`));
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
    .get(`https://swapi.dev/api/films/${params.id}`)
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

export default FilmsId;
