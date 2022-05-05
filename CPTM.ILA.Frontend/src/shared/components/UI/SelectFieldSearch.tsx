import { useField, FormikProps, FieldAttributes } from "formik";
import React from "react";
import Select from "react-select";
import {
  GroupedOption,
  Options,
} from "../../../access-requests/components/AccessRequestForm";

const convertValue = (s: string) => ({ value: s, label: s });

const deconvertValue = (v: { value: string; label: string }) => v.value;

const SelectFieldSearch = (props: FieldAttributes<any>) => {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (option: { value: string; label: string }) => {
    console.log("select field search");

    console.log(option);
    console.log(deconvertValue(option));

    setValue(deconvertValue(option));
    setTouched(true);

    console.log(state);
  };

  return (
    <Select
      {...props}
      value={convertValue(state.value)}
      isSearchable
      onChange={onChange}
      onBlur={setTouched}
    />
  );
};

export default SelectFieldSearch;
