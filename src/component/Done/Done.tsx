import Tag from "../tag/Tag";
import { DoneProps } from "./Done.type";
import styled from "styled-components";

const Root = styled.li`
  margin: 12px 0px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 10px 20px -10px rgba(#000000, 0.1);
`;

const DoneContent = styled.div`
  font-size: 18px;
`;

const TagContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Done = (props: DoneProps) => {
  const onClick = () => {
    if (props.onClick) props.onClick(props.id);
  };

  return (
    <Root onClick={onClick}>
      <DoneContent>{props.name}</DoneContent>
      {props.tags && props.tags.length !== 0 && (
        <TagContainer>
          {props.tags.map((tag) => {
            return (
              <Tag {...tag} hasDeleteButton={false} key={tag.id.toString()} />
            );
          })}
        </TagContainer>
      )}
    </Root>
  );
};

export default Done;
