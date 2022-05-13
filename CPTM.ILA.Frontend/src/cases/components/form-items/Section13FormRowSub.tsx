import _ from "lodash";
import { Controller, FieldPath, UseFormReturn } from "react-hook-form";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Case } from "../../../shared/models/cases.model";

const Section13FormRowSub = (props: {
  name: string;
  className: string;
  countries: string[];
  methods: UseFormReturn<Case, any>;
}) => {
  return (
    <Row className={props.className}>
      <Col></Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.nomeOrganizacao` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.nomeOrganizacao`
                )
              }
              ref={ref}
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.pais` as FieldPath<Case>}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              options={props.countries.map((s) => ({ value: s, label: s }))}
              value={props.countries
                .map((s) => ({ value: s, label: s }))
                .find((c) => c.value === value)}
              onChange={(val) => onChange(val?.value)}
              isSearchable
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.dadosTransferidos` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.dadosTransferidos`
                )
              }
              ref={ref}
            />
          )}
        />
      </Col>
      <Col>
        <Controller
          rules={{ required: true }}
          control={props.methods.control}
          name={`${props.name}.tipoGarantia` as FieldPath<Case>}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              type="text"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={
                !!_.get(
                  props.methods.formState.errors,
                  `${props.name}.tipoGarantia`
                )
              }
              ref={ref}
            />
          )}
        />
      </Col>
      <Col lg={1}></Col>
    </Row>
  );
};

export default Section13FormRowSub;
