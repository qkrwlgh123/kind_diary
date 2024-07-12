import Style from "./nextButtonComponent.style";

const NextButtonComponent = ({
  isTimePassed,
  handleFlipPage,
}: {
  isTimePassed: boolean;
  handleFlipPage?: () => void;
}) => {
  return (
    <Style.ButtonContainer $isVisible={isTimePassed}>
      <span onClick={handleFlipPage}>다음</span>
    </Style.ButtonContainer>
  );
};

export default NextButtonComponent;
