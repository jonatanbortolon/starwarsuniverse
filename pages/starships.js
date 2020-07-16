import axios from "axios";

import BackgroundComponent from "../src/components/BackgroundComponent";
import HeaderComponent from "../src/components/HeaderComponent";

import { List, Item, Infos } from "../src/components/ListComponent";
import Router from "next/router";

function Starships({ data }) {
  return (
    <BackgroundComponent>
      <HeaderComponent />
      <List>
        {data.map((element) => (
          <Item
            key={element.name}
            onClick={() =>
              Router.push(
                "/starships/" +
                  element.url
                    .slice(0, -1)
                    .slice(
                      element.url.slice(0, -1).lastIndexOf("/") + 1,
                      element.url.slice(0, -1).length
                    )
              )
            }
          >
            <p>{element.name}</p>
            <Infos>
              <p>model: {element.model}</p>
            </Infos>
          </Item>
        ))}
      </List>
    </BackgroundComponent>
  );
}

export async function getStaticProps() {
  let quary = [];
  let pages = 1;

  await axios
    .get(`https://swapi.dev/api/starships/?page=${pages}`)
    .then((response) => {
      pages =
        response.data.count.toString().length > 1
          ? response.data.count.toString()[1] !== "0"
            ? Number(response.data.count.toString()[0]) + 1
            : Number(response.data.count.toString()[0])
          : 1;
    });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/starships/?page=${index}`));
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

export default Starships;
