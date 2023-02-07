import { numToHexColor } from "../../utils/Color";
import Tag from "../tag/Tag";
import { TagDetailProps } from "./TagDetail.type";
import styled from "styled-components";

const Root = styled.div`
  padding: 12px;
`;

const TagExample = styled.div`
  margin: auto;
`;

const TagDetailContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
`;

const TagInfo = styled.div`
  margin: auto 0px;
`;

function TagDetail(props: TagDetailProps) {
  const onClick = () => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  return (
    <Root onClick={onClick}>
      <TagExample>
        <Tag name={props.name} color={props.color} />
      </TagExample>
      <TagDetailContainer>
        <TagInfo>
          <div>태그명: {props.name}</div>
          <div>색상: {numToHexColor(props.color)}</div>
        </TagInfo>
      </TagDetailContainer>
    </Root>
  );
}

export default TagDetail;
