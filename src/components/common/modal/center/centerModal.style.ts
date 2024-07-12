import styled from "styled-components";

const Container = styled.div<{ display: string }>`
  display: ${(props) => props.display || "none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000; /* 다른 요소들보다 위에 위치하도록 설정 */
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const ModalWindow = styled.div<{ $top?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  margin-bottom: ${(props) => (props.$top ? 350 - props.$top + "px" : "350px")};
  border-radius: 10px;
  background: ${(props) => props.theme.modalBgColor};
  padding: 40px 30px 30px 30px;
  animation: modaldown 0.3s linear;
  z-index: 1001; /* 모달 배경이 컨테이너 뒤에 위치하도록 설정 */

  @keyframes modaldown {
    from {
      transform: translateY(-10%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .close {
    position: absolute;
    right: 10px;
    top: -15px;
    cursor: pointer;
    font-size: 25px;
  }
`;

export default { Container, ModalBackground, ModalWindow };
