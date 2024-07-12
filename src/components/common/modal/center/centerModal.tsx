import Style from "./centerModal.style";

const CenterModal = ({
  display,
  controlFunc,
  children,
  top,
}: {
  display: string;
  controlFunc: () => void;
  top?: number;
  children: React.ReactNode;
}) => {
  return (
    <Style.Container display={display}>
      <Style.ModalBackground onClick={controlFunc} />
      <Style.ModalWindow $top={top}>
        <p className="close" onClick={controlFunc}>
          &times;
        </p>
        {children}
      </Style.ModalWindow>
    </Style.Container>
  );
};

export default CenterModal;
