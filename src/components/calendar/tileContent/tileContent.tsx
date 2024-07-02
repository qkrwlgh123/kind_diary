import { ObjectQueryResult } from "../../../types/queryResult/objectList";
import Content from "./content/content";
import Style from "./tileContent.style";

const TileContent = ({ list }: { list: ObjectQueryResult[] }) => {
  return (
    <Style.TileContentsContainer>
      {list.map((object: ObjectQueryResult) => (
        <Content key={object.id} object={object.object} />
      ))}
    </Style.TileContentsContainer>
  );
};

export default TileContent;
