import { useState, useEffect } from "react";

// import { Container } from './styles';

function useWindowSize() {
  const [size, changeSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      changeSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default useWindowSize;
