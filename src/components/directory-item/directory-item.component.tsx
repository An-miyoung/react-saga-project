import { useNavigate } from "react-router-dom";
import { DirectoryCategory } from "../directory/directory.component";
import {
  BackgrounImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

type DirectoryItemProp = {
  category: DirectoryCategory;
};

const DirectoryItem: React.FC<DirectoryItemProp> = ({ category }) => {
  const navigate = useNavigate();
  const { title, imageUrl, route } = category;

  const onNavigateHandler = () => {
    navigate(route);
  };

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgrounImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>쇼핑하기</p>
      </Body>
    </DirectoryItemContainer>
  );
};
export default DirectoryItem;

// {/* <div
//   className="background-image"
//   style={{ backgroundImage: `url(${imageUrl})` }}
// />
//  이 코드를 styled component 로 변환
//  background-image: ${({ imageUrl }) => `url(${imageUrl})`}; */}
