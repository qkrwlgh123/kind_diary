import Style from "./centerModal.style";

const CenterModal = ({
  display,
  controlFunc,
  children,
  top,
  isHideCloseButton,
  isForbidExternalClick,
}: {
  display: string;
  controlFunc: () => void;
  top?: number;
  isForbidExternalClick?: boolean;
  isHideCloseButton?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Style.Container display={display}>
      <Style.ModalBackground
        onClick={isForbidExternalClick ? undefined : controlFunc}
      />
      <Style.ModalWindow $top={top}>
        {!isHideCloseButton && (
          <p className="close" onClick={controlFunc}>
            &times;
          </p>
        )}
        {children}
      </Style.ModalWindow>
    </Style.Container>
  );
};

export default CenterModal;
