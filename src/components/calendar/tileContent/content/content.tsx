import Style from "./content.style";

const Content = ({ object, color }: { object: string; color: string }) => {
  return (
    <Style.ContentBox color={color}>
      <span>{object}</span>
    </Style.ContentBox>
  );
};

export default Content;
