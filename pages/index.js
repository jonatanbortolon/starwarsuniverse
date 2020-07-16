import { useState } from "react";
import Router from "next/router";

import { Stage, Layer, Line } from "react-konva";

import axios from "axios";

import useWindowSize from "../src/hooks/useWindowSize";

import BackgroundComponent from "../src/components/BackgroundComponent";
import PlanetComponent from "../src/components/PlanetComponent";
import HeaderComponent from "../src/components/HeaderComponent";
import { Space } from "../src/components/SpaceComponent";

export default function Home({ data }) {
  const [width, height] = useWindowSize();
  const [stage, changeStage] = useState([0, 0]);
  const [stageScale, changeStageScale] = useState(1);

  function handleWheel(e) {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stageHandler = e.target.getStage();
    const oldScale = stageHandler.scaleX();
    const mousePointTo = {
      x:
        stageHandler.getPointerPosition().x / oldScale -
        stageHandler.x() / oldScale,
      y:
        stageHandler.getPointerPosition().y / oldScale -
        stageHandler.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    changeStageScale(newScale);
    changeStage([
      -(mousePointTo.x - stageHandler.getPointerPosition().x / newScale) *
        newScale,
      -(mousePointTo.y - stageHandler.getPointerPosition().y / newScale) *
        newScale,
    ]);
  }

  return (
    <BackgroundComponent>
      <HeaderComponent />
      <Space>
        <Stage
          width={width}
          height={height - 61}
          draggable={true}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stage[0]}
          y={stage[1]}
          onWheel={handleWheel}
          onDragStart={() => {}}
          onDragEnd={() => {}}
        >
          <Layer>
            <Line
              x={0}
              y={0}
              points={[-200, -200, -200, 2200, 2200, 2200, 2200, -200]}
              closed
              stroke="white"
              tension={0.3}
              fill="rgba(0,0,0,0.1)"
            />
            {data.map((planet, index) => (
              <PlanetComponent
                key={index}
                name={planet.name}
                scale={stageScale}
                url={require("../public/images/earth.webp")}
                x={planet.x}
                y={planet.y}
                size={
                  planet.diameter !== "unknown"
                    ? Number(planet.diameter) * 0.005 > 200
                      ? 200
                      : Number(planet.diameter) * 0.005
                    : 50
                }
                onClick={() =>
                  Router.push(
                    `/planets/${planet.url
                      .slice(0, -1)
                      .slice(
                        planet.url.slice(0, -1).lastIndexOf("/") + 1,
                        planet.url.slice(0, -1).length
                      )}`
                  )
                }
                onTap={() =>
                  Router.push(
                    `/planets/${planet.url
                      .slice(0, -1)
                      .slice(
                        planet.url.slice(0, -1).lastIndexOf("/") + 1,
                        planet.url.slice(0, -1).length
                      )}`
                  )
                }
              />
            ))}
          </Layer>
        </Stage>
      </Space>
    </BackgroundComponent>
  );
}

export async function getStaticProps() {
  let quary = [];
  let pages = 1;

  await axios
    .get(`https://swapi.dev/api/planets/?page=${pages}`)
    .then((response) => {
      pages =
        response.data.count.toString()[1] !== "0"
          ? Number(response.data.count.toString()[0]) + 1
          : Number(response.data.count.toString()[0]);
    });

  for (let index = 1; index <= pages; index++) {
    quary.push(axios.get(`https://swapi.dev/api/planets/?page=${index}`));
  }

  let data = [];

  await (await axios.all(quary)).forEach((i) => {
    const { results } = i.data;

    results.forEach((element) => {
      if (element.name !== "unknown") {
        let x = Math.floor(Math.random() * 2000) + 1;
        let y = Math.floor(Math.random() * 2000) + 1;

        data.push({
          ...element,
          x,
          y,
        });
      }
    });
  });

  return {
    props: {
      data,
    },
  };
}
