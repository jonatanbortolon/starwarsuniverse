import axios from "axios";

import BackgroundComponent from "../src/components/BackgroundComponent";
import HeaderComponent from "../src/components/HeaderComponent";

import { List, Item, Infos } from "../src/components/ListComponent";

import Link from "next/link";

function Characters({ data }) {
  return (
    <BackgroundComponent>
      <HeaderComponent />
      <List>
        {data.map((element) => (
          <Link
            href="/characters/[id]"
            as={
              "/characters/" +
              element.url
                .slice(0, -1)
                .slice(
                  element.url.slice(0, -1).lastIndexOf("/") + 1,
                  element.url.slice(0, -1).length
                )
            }
          >
            <Item key={element.name}>
              <p>{element.name}</p>
              <Infos>
                <p>
                  height:{" "}
                  {element.height === "unknown"
                    ? element.height
                    : element.height / 100 + "m"}
                </p>
                <p>
                  mass:{" "}
                  {element.mass === "unknown"
                    ? element.mass
                    : element.mass + "Kg"}
                </p>
              </Infos>
            </Item>
          </Link>
        ))}
      </List>
    </BackgroundComponent>
  );
}

export async function getStaticProps() {
  let quary = [];
  let pages = 1;

  await axios
    .get(`https://swapi.dev/api/people/?page=${pages}`)
    .then((response) => {
      pages =
        response.data.count.toString().length > 1
          ? response.data.count.toString()[1] !== "0"
            ? Number(response.data.count.toString()[0]) + 1
            : Number(response.data.count.toString()[0])
          : 1;
    });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/people/?page=${index}`));
  }

  let data = [];

  await (await axios.all(quary)).forEach((i) => {
    const { results } = i.data;

    results.forEach((element) => {
      data.push(element);
    });
  });

  return {
    props: {
      data,
    },
  };
}

export default Characters;
