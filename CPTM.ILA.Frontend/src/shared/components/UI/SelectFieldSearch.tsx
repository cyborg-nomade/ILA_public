import { useField, FormikProps, FieldAttributes } from "formik";
import React from "react";
import Select from "react-select";
import {
  GroupedOption,
  Options,
} from "../../../access-requests/components/AccessRequestForm";

const SelectFieldSearch = (props: FieldAttributes<any>) => {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  // value is an array now
  const onChange = (value: any) => {
    console.log("select field search");

    console.log(value.value);

    // console.log(value.map((v: { value: any }) => v.value));

    setValue(value.value);
  };

  // use value to make this a  controlled component
  // now when the form receives a value for 'campfeatures' it will populate as expected
  return (
    <Select
      {...props}
      value={state?.value.value}
      isSearchable
      onChange={onChange}
      onBlur={setTouched}
    />
  );
};

export default SelectFieldSearch;
