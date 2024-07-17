import Style from "./themeToggleBtn.style";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleBtn = ({
  themeMode,
  handleFunc,
}: {
  themeMode: string | number;
  handleFunc: () => void;
}) => {
  return (
    <Style.Switch onClick={handleFunc}>
      <Style.Slider $themeMode={themeMode}></Style.Slider>
      <Style.IconsContainer>
        <Style.MoonBox>
          <FaMoon />
        </Style.MoonBox>

        <Style.SunBox>
          <FaSun />
        </Style.SunBox>
      </Style.IconsContainer>
    </Style.Switch>
  );
};

export default ThemeToggleBtn;
