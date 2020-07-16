import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import BackgroundComponent from "../../src/components/BackgroundComponent";
import HeaderComponent from "../../src/components/HeaderComponent";
import InfoComponent from "../../src/components/InfoComponent";
import Link from "next/link";

function Planets({ data }) {
  const [residents, changeResidents] = useState([["", ""]]);
  const [films, changeFilms] = useState([["", ""]]);

  async function getInfos() {
    let residentsHandler = [];
    let filmsHandler = [];

    await axios
      .all(data.residents.map((element) => axios.get(element)))
      .then((elements) =>
        elements.forEach((element) => {
          residentsHandler.push([element.data.name, element.data.url]);
        })
      );

    changeResidents(residentsHandler);

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
            } else if (index < 9) {
              return (
                <h3 key={key}>{`${key.replace(/_/i, " ")}: ${
                  Object.values(data)[index]
                }`}</h3>
              );
            } else if (index <= 10) {
              return (
                <Fragment key={"info " + key}>
                  <h3 key={key}>{`${key.replace(/_/i, " ")}:`}</h3>
                  {index === 9
                    ? residents.map((element) => (
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
                    : films.map((element) => (
                        <Link
                          key={element[0]}
                          href="/films/[id]"
                          as={
                            "/films/" +
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

  await axios.get(`https://swapi.dev/api/planets/?page=1`).then((response) => {
    pages =
      response.data.count.toString().length > 1
        ? response.data.count.toString()[1] !== "0"
          ? Number(response.data.count.toString()[0]) + 1
          : Number(response.data.count.toString()[0])
        : 1;
  });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/planets/?page=${index}`));
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
    .get(`https://swapi.dev/api/planets/${params.id}`)
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

export default Planets;
