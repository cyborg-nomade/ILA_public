import React, { useState } from "react";
import { FieldAttributes, useField } from "formik";
import Select from "react-select";

const convertValue = (s: string) => ({ value: s, label: s });
const converValueArray = (sArray: string[]) => {
  return sArray.map((s) => convertValue(s));
};
const deconvertValue = (v: { value: string; label: string }) => v.value;
const deconvertValueArray = (vArray: { value: string; label: string }[]) => {
  return vArray.map((v) => deconvertValue(v));
};

const SelectFieldMulti = (props: FieldAttributes<any>) => {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const onChange = (options: { value: string; label: string }[]) => {
    console.log(
      "these are the deconverted options: " + deconvertValueArray(options)
    );

    setSelectedGroups(deconvertValueArray(options));
    setValue(deconvertValueArray(options));

    setTouched(true);
    console.log("state.value, on change: ");
    console.log(state.value);
    console.log(field);
  };

  const onBlur = () => {
    setValue(selectedGroups);
    setTouched(true);
    console.log("state.value, on blur: " + state.value);
  };

  // use value to make this a  controlled component
  // now when the form receives a value for 'campfeatures' it will populate as expected
  return (
    <Select
      {...props}
      value={converValueArray(state.value)}
      isMulti
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default SelectFieldMulti;
