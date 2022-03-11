import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

import { verbosTratamento } from "../../models/cases.model";
import classes from "./TagPicker.module.css";

const suggestions = Object.values(verbosTratamento).map((verbo) => {
  return { id: verbo, text: verbo };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagPicker = (props: {
  name: string;
  onChange: (tags: string[]) => void;
  value: string[];
  disabled: boolean;
}) => {
  const [tags, setTags] = useState(props.value);

  const handleInputChange = () => {
    props.onChange(tags);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags([...tags, tag.text]);
  };

  const handleDrag = (
    tag: { id: string; text: string },
    currPos: number,
    newPos: number
  ) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag.id);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div>
      <ReactTags
        readOnly={props.disabled}
        tags={tags.map((tag) => ({ id: tag, text: tag }))}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        handleInputChange={handleInputChange}
        handleInputBlur={handleInputChange}
        handleInputFocus={handleInputChange}
        placeholder="Escolha os verbos de tratamento adequados"
        name={props.name}
        autocomplete
        inputFieldPosition="top"
        classNames={{
          tagInputField: "form-control " + classes["tag-picker-input"],
          tag: "btn btn-primary",
          remove: "btn btn-primary",
          suggestions: classes["tag-picker-suggestion"],
          activeSuggestion: "list-group-item active",
        }}
      />
    </div>
  );
};

export default TagPicker;
