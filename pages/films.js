import axios from "axios";

import BackgroundComponent from "../src/components/BackgroundComponent";
import HeaderComponent from "../src/components/HeaderComponent";

import { List, Item, Infos } from "../src/components/ListComponent";

function Films({ data }) {
  return (
    <BackgroundComponent>
      <HeaderComponent />
      <List>
        {data.map((element) => (
          <Item key={element.title}>
            <p>{element.title}</p>
            <Infos>
              <p>director: {element.director}</p>
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
    .get(`https://swapi.dev/api/films/?page=${pages}`)
    .then((response) => {
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

export default Films;
