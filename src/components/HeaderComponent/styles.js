import styled from "styled-components";

export const Header = styled.div`
  width: calc(100vw - 20px);
  height: 60px;
  border-bottom: 1px solid #fff;
  display: flex;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const Partition1 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 521px) {
    & > :nth-child(7) {
      position: fixed;
      width: 64px;
      height: 64px;
      bottom: 10px;
      background-color: black;
      border-radius: 50%;
      left: 10px;
      -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
      -moz-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
      z-index: 9999;

      > h1 {
        display: none;
      }
    }
  }

  @media (min-width: 521px) {
    & > :nth-child(1) {
      display: none;
    }

    & > :nth-child(7) {
      display: flex;
    }
  }

  @media (min-width: 768px) {
    & > :nth-child(7) {
      display: none;
    }
  }
`;

export const NavButton = styled.div`
  width: 75px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 5px;
  cursor: pointer;

  > img {
    max-width: 100%;
    max-height: calc(100% - 35px);
    filter: contrast(0) brightness(100);
  }

  > h1 {
    margin: 0;
    padding: 0;
    font-size: 13px;
    color: #fff;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 521px) {
    width: 45px;
    margin: 0 auto;

    > h1 {
      margin: 0;
      padding: 0;
      font-size: 10px;
      color: #fff;
    }
  }
`;

export const Logo = styled.div`
  width: 50%;
  min-width: 120px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    max-width: 100%;
    max-height: calc(100% - 15px);
    cursor: pointer;
  }

  @media (max-width: 521px) {
    display: none;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
    margin-right: 20px;
  }

  > img:hover {
    -webkit-filter: drop-shadow(-15px 0px 20px #ff0000)
      drop-shadow(15px 0px 20px #0000ff);
    filter: drop-shadow(-15px 0px 20px #ff0000)
      drop-shadow(15px 0px 20px #0000ff);
  }

  > img:active {
    -webkit-filter: drop-shadow(-15px 0px 20px #ff0000)
      drop-shadow(15px 0px 20px #0000ff);
    filter: drop-shadow(-15px 0px 20px #ff0000)
      drop-shadow(15px 0px 20px #0000ff);
  }
`;

export const Partition3 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;
