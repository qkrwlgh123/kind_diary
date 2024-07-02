import Style from "./content.style";

const Content = ({ object }: { object: string }) => {
  return (
    <Style.ContentBox>
      <span>{object}</span>
    </Style.ContentBox>
  );
};

export default Content;
