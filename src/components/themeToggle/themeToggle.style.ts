import styled from "styled-components";

const ToggleBox = styled.div`
  cursor: pointer;
  position: fixed;
  top: 10%;
  left: 15%;
  font-size: 20px;

  @media (max-width: 950px) {
    position: absolute;
    left: 5%;
  }
`;

export default { ToggleBox };
