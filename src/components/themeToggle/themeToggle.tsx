import Style from "./themeToggle.style";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({
  themeMode,
  handleFunc,
}: {
  themeMode: string | number;
  handleFunc: () => void;
}) => {
  return (
    <Style.ToggleBox onClick={handleFunc}>
      {themeMode === "light" ? <FaMoon /> : <FaSun />}
    </Style.ToggleBox>
  );
};

export default ThemeToggle;
