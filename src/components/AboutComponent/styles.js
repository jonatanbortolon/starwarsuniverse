import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 61px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  * > p {
    font-weight: bold;
    color: #fff;
    text-align: center;

    > a {
      color: #fff;
    }
  }
`;

export const Content = styled.div`
  margin: auto 0;
`;

export const Footer = styled.div`
  margin-bottom: 20px;
`;
