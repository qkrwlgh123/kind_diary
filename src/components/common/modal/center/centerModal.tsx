import Style from "./centerModal.style";

const CenterModal = ({
  display,
  controlFunc,
  children,
}: {
  display: string;
  controlFunc: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Style.Container display={display}>
      <Style.ModalBackground onClick={controlFunc} />
      <Style.ModalWindow>
        <p className="close" onClick={controlFunc}>
          &times;
        </p>
        {children}
      </Style.ModalWindow>
    </Style.Container>
  );
};

export default CenterModal;
