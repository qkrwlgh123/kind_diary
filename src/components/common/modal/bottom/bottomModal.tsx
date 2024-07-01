import Style from "./bottomModal.style";

const BottomModal = ({
  display,
  controlFunc,
  children,
}: {
  display: string;
  controlFunc: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Style.Container display={display}>
        <Style.ModalBackground onClick={controlFunc} />
      </Style.Container>

      <Style.ModalWindow display={display}>
        <p className="close" onClick={controlFunc}>
          &times;
        </p>
        {children}
      </Style.ModalWindow>
    </>
  );
};

export default BottomModal;
