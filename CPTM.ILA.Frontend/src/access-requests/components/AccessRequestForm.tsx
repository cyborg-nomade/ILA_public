import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { AccessRequestDTO } from "./../../shared/models/DTOs/access-request-dto.model";
import { tipoSolicitacaoAcesso } from "../../shared/models/access-control/access-request.model";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  Assign,
  ObjectShape,
  AnyObject,
  TypeOfShape,
  AssertsShape,
} from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import SelectField from "../../shared/components/UI/SelectField";

type onSubmitFn = (item: AccessRequestDTO) => void;

let schema: yup.ObjectSchema<
  Assign<
    ObjectShape,
    {
      usernameSolicitante: RequiredStringSchema<string | undefined, AnyObject>;
      usernameSuperior: yup.StringSchema<
        string | undefined,
        AnyObject,
        string | undefined
      >;
      justificativa: RequiredStringSchema<string | undefined, AnyObject>;
      emailFile: any;
    }
  >,
  AnyObject,
  TypeOfShape<
    Assign<
      ObjectShape,
      {
        usernameSolicitante: RequiredStringSchema<
          string | undefined,
          AnyObject
        >;
        usernameSuperior: yup.StringSchema<
          string | undefined,
          AnyObject,
          string | undefined
        >;
        justificativa: RequiredStringSchema<string | undefined, AnyObject>;
        emailFile: any;
      }
    >
  >,
  AssertsShape<
    Assign<
      ObjectShape,
      {
        usernameSolicitante: RequiredStringSchema<
          string | undefined,
          AnyObject
        >;
        usernameSuperior: yup.StringSchema<
          string | undefined,
          AnyObject,
          string | undefined
        >;
        justificativa: RequiredStringSchema<string | undefined, AnyObject>;
        emailFile: any;
      }
    >
  >
>;

export interface Options {
  value: string;
  label: string;
}

export interface GroupedOption {
  label: string;
  options: Options[];
}

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const AccessRequestForm = (props: {
  item: AccessRequestDTO;
  register?: boolean;
  approve?: boolean;
  groups?: boolean;
  onSubmit: onSubmitFn;
  onReject?: onSubmitFn;
}) => {
  const [isComiteReq, setIsComiteReq] = useState(false);
  const [groups, setGroups] = useState<GroupedOption[]>([]);

  useEffect(() => {
    schema = isComiteReq
      ? yup.object().shape({
          usernameSolicitante: yup.string().required(),
          usernameSuperior: yup.string().required(),
          justificativa: yup.string().required(),
          emailFile: yup.mixed().required(),
        })
      : yup.object().shape({
          usernameSolicitante: yup.string().required(),
          usernameSuperior: yup.string().optional(),
          justificativa: yup.string().required(),
          emailFile: yup.mixed().optional(),
        });
    console.log(isComiteReq, schema.describe());

    return () => {};
  }, [isComiteReq]);

  const handleCheckIsComiteReq = (event: any) => {
    setIsComiteReq(!isComiteReq);
  };

  let navigate = useNavigate();
  const backToHomepageHandler = () => {
    navigate("/");
  };
  const backOneHandler = () => {
    navigate(-1);
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getGroups = useCallback(async () => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_CONNSTR}/groups`
    );

    const groupedOptions: GroupedOption[] = [
      {
        label: "Diretorias",
        options: responseData.diretorias.map((d: string) => ({
          value: d,
          label: d,
        })),
      },
      {
        label: "Gerencias",
        options: responseData.gerencias.map((g: string) => ({
          value: g,
          label: g,
        })),
      },
      {
        label: "Departamentos",
        options: responseData.deptos.map((de: string) => ({
          value: de,
          label: de,
        })),
      },
    ];

    setGroups(groupedOptions);
  }, [sendRequest]);

  useEffect(() => {
    getGroups();

    return () => {};
  }, [getGroups]);

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize={true}
      onSubmit={(values) => {
        values.tipoSolicitacaoAcesso = isComiteReq
          ? tipoSolicitacaoAcesso.AcessoComite
          : tipoSolicitacaoAcesso.AcessoAoSistema;
        props.onSubmit(values);
      }}
      initialValues={props.item}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        touched,
        isValid,
        errors,
        dirty,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Card className="mx-auto" style={{ width: "28rem" }}>
            <Card.Title className="pt-3 px-3">Solicitação de Acesso</Card.Title>
            <Card.Body>
              {props.register && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik00">
                    <Form.Check
                      checked={isComiteReq}
                      onChange={handleCheckIsComiteReq}
                      type="switch"
                      id="custom-switch"
                      label="Membro do Comitê LGPD?"
                    />
                  </Form.Group>
                </Row>
              )}
              {(props.register || props.approve) && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Usuário AD do Solicitante</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameSolicitante"
                      value={values.usernameSolicitante}
                      disabled={props.approve}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.usernameSolicitante &&
                        !errors.usernameSolicitante
                      }
                      isInvalid={!!errors.usernameSolicitante}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              )}
              {((props.register && !isComiteReq) || props.approve) && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Usuário AD do Superior</Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameSuperior"
                      value={values.usernameSuperior}
                      disabled={props.approve}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.usernameSuperior && !errors.usernameSuperior
                      }
                      isInvalid={!!errors.usernameSuperior}
                    />
                    <Form.Control.Feedback type="invalid">
                      Esse campo é obrigatório
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              )}
              {(props.groups || isComiteReq) && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label>Grupos a serem acessados</Form.Label>
                    <Field
                      component={SelectField}
                      name="groupNames"
                      options={groups}
                    />
                  </Form.Group>
                </Row>
              )}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik03">
                  <Form.Label>Justificativa de acesso</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="justificativa"
                    value={values.justificativa}
                    disabled={props.approve}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.justificativa && !errors.justificativa}
                    isInvalid={!!errors.justificativa}
                  />
                  <Form.Control.Feedback type="invalid">
                    Esse campo é obrigatório
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              {!isComiteReq && (
                <Row className="mb-3">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>E-mail com autorização do superior</Form.Label>
                    <Form.Control
                      type="file"
                      name="emailFile"
                      onChange={(event) => {
                        const target = event.currentTarget as HTMLInputElement;
                        const files = target.files as FileList;

                        setFieldValue("emailFile", files[0]);
                      }}
                    />
                  </Form.Group>
                </Row>
              )}
              {props.register && (
                <React.Fragment>
                  <Button
                    type="submit"
                    className="float-end mt-3"
                    variant="success"
                    disabled={!(isValid && dirty)}
                  >
                    Solicitar
                  </Button>
                  <Button
                    type="button"
                    className="float-start mt-3"
                    onClick={backToHomepageHandler}
                  >
                    Fazer Login
                  </Button>
                </React.Fragment>
              )}
              {props.approve && (
                <React.Fragment>
                  <ButtonGroup className="float-end mt-3">
                    <Button
                      variant="danger"
                      onClick={() => props.onReject!(values)}
                    >
                      Reprovar
                    </Button>
                    <Button type="submit">Aprovar</Button>
                  </ButtonGroup>
                  <Button
                    type="button"
                    className="float-start mt-3"
                    onClick={backOneHandler}
                  >
                    Voltar
                  </Button>
                </React.Fragment>
              )}
              {props.groups && (
                <React.Fragment>
                  <Button
                    type="submit"
                    className="float-end mt-3"
                    variant="success"
                    disabled={!(isValid && dirty)}
                  >
                    Solicitar
                  </Button>
                  <Button
                    type="button"
                    className="float-start mt-3"
                    onClick={backToHomepageHandler}
                  >
                    Página Inicial
                  </Button>
                </React.Fragment>
              )}
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default AccessRequestForm;
