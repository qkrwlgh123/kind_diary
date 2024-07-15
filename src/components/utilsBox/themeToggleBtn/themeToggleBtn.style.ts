import styled from "styled-components";

const Switch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  background-color: ${(props) => props.theme.skeletonBackground};
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const Slider = styled.div<{ themeMode: string | number }>`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.themeMode === "light" ? "32px" : "2px")};
  width: 26px;
  height: 26px;
  background-color: white;
  border-radius: 50%;
  transition: left 0.3s;
`;

const IconsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
`;

const MoonBox = styled(IconBox)`
  margin-left: 10px;
`;

const SunBox = styled(IconBox)`
  margin-right: 10px;
`;

export default { Switch, Slider, IconsContainer, MoonBox, SunBox };
