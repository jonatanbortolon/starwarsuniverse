import React, { useState, useEffect, useRef } from "react";

import { Text, Image, Group } from "react-konva";

function PlanetComponent({ name, scale, url, x, y, size, onClick, onTap }) {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    }; // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadImage(); // eslint-disable-next-line
  }, [url]);

  function handleLoad() {
    setImage(imageRef.current);
  }

  function loadImage() {
    const img = new window.Image();
    img.src = url;
    imageRef.current = img;
    imageRef.current.addEventListener("load", handleLoad);
  }

  return (
    <Group onClick={onClick} onTap={onTap}>
      <Text
        fill="#fff"
        text={name}
        fontSize={20 / scale}
        x={
          x - (size < 50 ? 50 / scale : size > 150 ? 150 / scale : size / scale)
        }
        y={y}
        align="center"
        verticalAlign="center"
      />
      <Image
        image={image}
        x={x}
        y={y}
        width={
          size < 50 ? 50 / -scale : size > 150 ? 150 / -scale : size / -scale
        }
        height={
          size < 50 ? 50 / -scale : size > 150 ? 150 / -scale : size / -scale
        }
      />
    </Group>
  );
}

export default PlanetComponent;
