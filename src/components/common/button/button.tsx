import theme from "../../../styles/layout/themes";
import { getFontColor } from "../../../utils/colorUtils";
import Style from "./button.style";

const Button = ({
  children,
  onClickFunc,
  index,
  bgColor,
}: {
  children: React.ReactNode;
  onClickFunc: () => void;
  index?: number;
  bgColor?: string;
}) => {
  let fontColor;
  if (typeof index === "number") fontColor = getFontColor(index);

  return (
    <Style.ButtonBox
      onClick={onClickFunc}
      $fontColor={fontColor}
      $bgColor={bgColor}
    >
      <button>{children}</button>
    </Style.ButtonBox>
  );
};

export default Button;
