import Tag from "../tag/Tag";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import TagInfo from "../../api/data/TagInfo";
import { useTagListValue } from "../../recoil/tagAtom";
import { DoneFormProps, DoneFormData } from "./DoneForm.type";
import styled from "styled-components";

const Root = styled.div`
  margin: 16px 24px;
`;

const Label = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ContentArea = styled.textarea`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  min-height: 3em;
  width: 100%;
  resize: vertical;
  padding: 8px;
  margin-bottom: 12px;
`;

const TagContainer = styled.div`
  min-height: 24px;
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid;
  border-color: #888888;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
`;

function DoneForm({ formRef }: DoneFormProps) {
  const tagList = useTagListValue();
  const [done, setDone] = useState<DoneFormData>(formRef.current);

  useEffect(() => {
    formRef.current = done;
  }, [formRef, done]);

  const tagOnClick = (tagInfo: TagInfo, isAddMode: boolean) => {
    return () => {
      const newTags = done.tags;
      if (isAddMode) {
        const exist = newTags.find((tag) => tagInfo.id === tag);
        if (exist === undefined) newTags.push(tagInfo.id);
      } else {
        const idx = newTags.findIndex((tag) => {
          return tag === tagInfo.id;
        });
        if (idx > -1) newTags.splice(idx, 1);
      }
      setDone((prev) => ({ ...prev, tags: newTags }));
    };
  };

  const onChangeContent = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDone((oldTag) => ({ ...oldTag, name: e.target.value }));
    },
    [setDone]
  );

  return (
    <Root>
      <div>
        <Label>내용</Label>
        <ContentArea
          placeholder="내용"
          onChange={onChangeContent}
          value={done.name}
        />
      </div>
      <div>
        <Label>태그</Label>
        <div>
          <div>선택한 태그</div>
          <TagContainer>
            {tagList
              .filter((tag) => {
                return done.tags.includes(tag.id);
              })
              .map((tagInfo) => {
                return (
                  <Tag
                    {...tagInfo}
                    key={tagInfo.id.toString()}
                    onClick={tagOnClick(tagInfo, false)}
                    hasDeleteButton={true}
                  />
                );
              })}
          </TagContainer>
          <div>태그 목록</div>
          <TagContainer>
            {tagList
              .filter((tag) => {
                return !done.tags.includes(tag.id);
              })
              .map((tagInfo) => {
                return (
                  <Tag
                    {...tagInfo}
                    key={tagInfo.id.toString()}
                    onClick={tagOnClick(tagInfo, true)}
                  />
                );
              })}
          </TagContainer>
        </div>
      </div>
    </Root>
  );
}

export default DoneForm;
