import styled from "styled-components";

export const List = styled.div`
  width: 100vw;
  max-height: calc(100vh - 83px);
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  justify-content: center;
  padding: 10px 0;
`;

export const Item = styled.div`
  z-index: 2;
  width: 120px;
  height: 150px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 6px 3px;
  cursor: pointer;

  > p {
    font-weight: bold;
    text-align: center;
    margin: 0 4px;
  }
`;

export const Infos = styled.div`
  height: 75px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  > p {
    font-size: 14px;
    font-weight: 300;
    color: #5d5d5d;
    text-align: center;
    margin: 0 4px;
  }
`;
