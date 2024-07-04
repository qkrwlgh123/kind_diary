import { ObjectQueryResult } from "../../../types/queryResult/objectList";
import { getFontColor } from "../../../utils/colorUtils";
import Content from "./content/content";
import Style from "./tileContent.style";

const TileContent = ({ list }: { list: ObjectQueryResult[] }) => {
  return (
    <Style.TileContentsContainer>
      {list.map((object: ObjectQueryResult, index: number) => (
        <Content
          key={object.id}
          object={object.object}
          color={getFontColor(index)}
        />
      ))}
    </Style.TileContentsContainer>
  );
};

export default TileContent;
