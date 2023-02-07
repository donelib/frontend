import TagDetail from "../../component/TagDetail/";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useTagListValue } from "./../../recoil/tagAtom";
import styled from "styled-components";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

const Root = styled.div`
  margin: 0px 24px;
`;

function TagDetailList() {
  const tagList = useTagListValue();
  const navigate = useNavigate();

  const onClick = useCallback(
    (tagId: number) => {
      navigate("/tag/modify/" + tagId);
    },
    [navigate]
  );

  return (
    <Root>
      <List>
        {tagList.map((tag) => {
          return (
            <>
              <li>
                <TagDetail key={tag.id.toString()} {...tag} onClick={onClick} />
              </li>
              <Divider />
            </>
          );
        })}
      </List>
    </Root>
  );
}

export default React.memo(TagDetailList);
