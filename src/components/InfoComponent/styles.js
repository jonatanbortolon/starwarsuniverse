import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 61px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  align-items: center;
  justify-content: flex-start;
  text-transform: capitalize;
  overflow-x: auto;

  > :nth-child(1) {
    margin-bottom: 50px;
    margin-top: 30px;
  }

  > :nth-last-child() {
    margin-bottom: 50px;
  }

  > h3 {
    width: 70%;
    margin-bottom: 10px;
    text-align: left;

    > a {
      color: black;
    }
  }

  > a {
    width: 70%;
    padding-left: 20px;
    margin-bottom: 5px;
    text-align: left;
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 0 0 80px 0;
    justify-content: flex-start;

    > h1 {
      width: calc(100% - 20px);
      padding-left: 20px;
    }

    > h3 {
      width: calc(100% - 20px);
      padding-left: 20px;
    }

    > a {
      width: calc(100% - 40px);
      padding-left: 40px;
    }
  }
`;
