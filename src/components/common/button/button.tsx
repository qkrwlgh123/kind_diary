import theme from "../../../styles/layout/themes";
import { getFontColor } from "../../../utils/colorUtils";
import Style from "./button.style";

const Button = ({
  children,
  onClickFunc,
  index,
}: {
  children: React.ReactNode;
  onClickFunc: () => void;
  index?: number;
}) => {
  let fontColor;
  if (typeof index === "number") fontColor = getFontColor(index);

  return (
    <Style.ButtonBox onClick={onClickFunc} $fontColor={fontColor}>
      <button>{children}</button>
    </Style.ButtonBox>
  );
};

export default Button;
