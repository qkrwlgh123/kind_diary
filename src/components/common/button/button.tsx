import theme from "../../../styles/layout/themes";
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
  const getFontColor = (index: number) => {
    switch (index) {
      case 0:
        return theme.objectFontColor.first;
      case 1:
        return theme.objectFontColor.second;
      case 2:
        return theme.objectFontColor.third;
      case 3:
        return theme.objectFontColor.fourth;
      case 4:
        return theme.objectFontColor.fifth;
    }
  };
  let fontColor;
  if (typeof index === "number") fontColor = getFontColor(index);

  return (
    <Style.ButtonBox onClick={onClickFunc} $fontColor={fontColor}>
      <button>{children}</button>
    </Style.ButtonBox>
  );
};

export default Button;
