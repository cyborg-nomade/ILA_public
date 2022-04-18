import { useField, FormikProps, FieldAttributes } from "formik";
import React from "react";
import Select from "react-select";
import {
  GroupedOption,
  Options,
} from "../../../access-requests/components/AccessRequestForm";

const convertValue = (s: string) => ({ value: s, label: s });
const converValueArray = (sArray: string[]) => {
  if (!sArray) {
    return console.log("hi");
  }

  return sArray.map((s) => convertValue(s));
};
const deconvertValue = (v: { value: string; label: string }) => v.value;
const deconvertValueArray = (vArray: { value: string; label: string }[]) => {
  console.log(vArray);

  return vArray.map((v) => deconvertValue(v));
};

const SelectFieldMulti = (props: FieldAttributes<any>) => {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  // value is an array now
  const onChange = (options: { value: string; label: string }[]) => {
    console.log("select field multi");

    console.log(options);
    console.log(deconvertValueArray(options));

    setValue(deconvertValueArray(options));

    console.log(state);
  };

  // use value to make this a  controlled component
  // now when the form receives a value for 'campfeatures' it will populate as expected
  return (
    <Select
      {...props}
      value={converValueArray(state?.value)}
      isMulti
      onChange={onChange}
      onBlur={setTouched}
    />
  );
};

export default SelectFieldMulti;
