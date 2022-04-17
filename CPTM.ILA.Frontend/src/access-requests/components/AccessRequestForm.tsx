import React, { useContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { AccessRequestDTO } from "./../../shared/models/DTOs/access-request-dto.model";
import {
  AccessRequest,
  tipoSolicitacaoAcesso,
} from "../../shared/models/access-control/access-request.model";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  Assign,
  ObjectShape,
  AnyObject,
  TypeOfShape,
  AssertsShape,
} from "yup/lib/object";
import { RequiredStringSchema } from "yup/lib/string";
import SelectFieldMulti from "../../shared/components/UI/SelectFieldMulti";
import { RequiredArraySchema } from "yup/lib/array";
import { MixedSchema } from "yup/lib/mixed";
import { AuthContext } from "../../shared/context/auth-context";

type onSubmitFn = (item: AccessRequestDTO) => void;

let schema:
  | yup.ObjectSchema<
      Assign<
        ObjectShape,
        {
          usernameSuperior: RequiredStringSchema<string | undefined, AnyObject>;
          groupNames: RequiredArraySchema<
            yup.AnySchema<any, any, any>,
            AnyObject,
            any[] | undefined
          >;
          justificativa: RequiredStringSchema<string | undefined, AnyObject>;
          emailFile: MixedSchema<any, AnyObject, any>;
        }
      >,
      AnyObject,
      TypeOfShape<
        Assign<
          ObjectShape,
          {
            usernameSuperior: RequiredStringSchema<
              string | undefined,
              AnyObject
            >;
            groupNames: RequiredArraySchema<
              yup.AnySchema<any, any, any>,
              AnyObject,
              any[] | undefined
            >;
            justificativa: RequiredStringSchema<string | undefined, AnyObject>;
            emailFile: MixedSchema<any, AnyObject, any>;
          }
        >
      >,
      AssertsShape<
        Assign<
          ObjectShape,
          {
            usernameSuperior: RequiredStringSchema<
              string | undefined,
              AnyObject
            >;
            groupNames: RequiredArraySchema<
              yup.AnySchema<any, any, any>,
              AnyObject,
              any[] | undefined
            >;
            justificativa: RequiredStringSchema<string | undefined, AnyObject>;
            emailFile: MixedSchema<any, AnyObject, any>;
          }
        >
      >
    >
  | yup.ObjectSchema<
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

  const { token } = useContext(AuthContext);

  useEffect(() => {
    schema = props.groups
      ? yup.object().shape({
          usernameSuperior: yup.string().required(),
          groupNames: yup.array().required(),
          justificativa: yup.string().required(),
          emailFile: yup.mixed().required(),
        })
      : isComiteReq
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

    return () => {};
  }, [isComiteReq, props.groups, props.item]);

  const handleCheckIsComiteReq = (event: any) => {
    setIsComiteReq(!isComiteReq);
  };

  const arid = useParams().arid;
  let navigate = useNavigate();
  const backToHomepageHandler = () => {
    navigate("/");
  };
  const backOneHandler = () => {
    navigate(-1);
  };
  const getFileHandler = async () => {
    const fileRes = await fetch(
      `${process.env.REACT_APP_CONNSTR}/access-requests/get-file/${arid}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    const fileBlob = await fileRes.blob();

    const url = window.URL.createObjectURL(new Blob([fileBlob]));
    const filename = fileRes.headers.get("Filename") || "";
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);

    console.log(link, url, fileBlob, fileRes.headers.get("Filename"));
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getGroups = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/groups`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
        }
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
    };

    getGroups().catch((error) => {
      console.log(error);
    });

    return () => {
      setGroups([]);
    };
  }, [sendRequest]);

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize={true}
      onSubmit={(values) => {
        values.tipoSolicitacaoAcesso = props.groups
          ? tipoSolicitacaoAcesso.AcessoAGrupos
          : isComiteReq
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
              {((props.register && !isComiteReq) ||
                props.approve ||
                props.groups) && (
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
              {(props.groups || isComiteReq || props.approve) && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label>Grupos a serem acessados</Form.Label>
                    <Field
                      isDisabled={props.approve}
                      component={SelectFieldMulti}
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
              {!isComiteReq && !props.approve && (
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
              {props.approve && (
                <Row className="mb-3">
                  <Button onClick={getFileHandler}>
                    Baixar Arquivo de Autorização
                  </Button>
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
