import React, { useCallback, ChangeEvent, useState, useEffect } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { hexColorToNum } from "../../utils/Color";
import Tag from "../tag/Tag";
import { TagFormData, TagFormProps } from "./TagForm.type";
import styled from "styled-components";

const Root = styled.div`
  margin: 16px 24px;
`;
const Label = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;
const NameArea = styled.input`
  min-height: 1em;
  width: calc(100% - 16px);
  padding: 8px;
  margin-bottom: 12px;
`;

const ExampleContainer = styled.div`
  margin-top: 16px;
`;

function TagForm({ formRef }: TagFormProps) {
  const [tag, setTag] = useState<TagFormData>(formRef.current);

  useEffect(() => {
    formRef.current = tag;
  }, [formRef, tag]);

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTag((oldTag) => ({ ...oldTag, name: e.target.value }));
    },
    [setTag]
  );

  const onChangeColor = useCallback(
    (color: ColorResult) => {
      setTag((oldTag) => ({ ...oldTag, color: color.hex }));
    },
    [setTag]
  );

  return (
    <Root>
      <div>
        <Label>태그명</Label>
        <NameArea
          placeholder="태그명"
          onChange={onChangeName}
          value={tag.name}
        />
        <Label>태그 색상</Label>
        <CirclePicker
          width="auto"
          circleSize={32}
          circleSpacing={16}
          onChange={onChangeColor}
          color={tag.color}
        />
      </div>
      <ExampleContainer>
        <Tag name={tag.name} color={hexColorToNum(tag.color)} />
      </ExampleContainer>
    </Root>
  );
}

export default React.memo(TagForm);
