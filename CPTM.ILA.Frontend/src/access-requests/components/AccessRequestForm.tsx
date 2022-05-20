import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { AccessRequestDTO } from "../../shared/models/DTOs/access-request-dto.model";
import { tipoSolicitacaoAcesso } from "../../shared/models/access-control/access-request.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
} from "react-select";
import AsyncSelect from "react-select/async";

type onSubmitFn = (item: AccessRequestDTO) => void;

const AccessRequestForm = (props: {
  item: AccessRequestDTO;
  register?: boolean;
  approve?: boolean;
  groups?: boolean;
  onSubmit: onSubmitFn;
  onReject?: onSubmitFn;
}) => {
  const [isComiteReq, setIsComiteReq] = useState(false);
  const [groups, setGroups] = useState<
    GroupBase<{ value: string; label: string }>[]
  >([]);
  const [eFile, setEFile] = useState<File>(new File([""], "emptyFile.txt"));
  const [selectedSuperior, setSelectedSuperior] = useState("");

  const { token } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError, isWarning } =
    useHttpClient();

  const methods = useForm<AccessRequestDTO>({ defaultValues: props.item });
  const { reset } = methods;
  useEffect(() => reset(props.item), [reset, props.item]);

  const arid = useParams().arid;
  let navigate = useNavigate();
  const backToHomepageHandler = () => {
    navigate("/");
  };
  const backOneHandler = () => {
    navigate(-1);
  };

  // const handleCheckIsComiteReq = (event: any) => {
  //   setIsComiteReq(!isComiteReq);
  // };

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

      const groupedOptions: GroupBase<{
        value: string;
        label: string;
      }>[] = [
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
          options: responseData.deptos.map((dpto: string) => ({
            value: dpto,
            label: dpto,
          })),
        },
      ];

      console.log("groupedOptions: ", groupedOptions);

      setGroups(groupedOptions);
    };

    getGroups().catch((error) => {
      console.log(error);
    });

    return () => {
      setGroups([]);
    };
  }, [sendRequest]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file: File = event.target.files[0];
    setEFile(file);
    methods.setValue("emailFile", file);
  };

  const handleSingleFileValidation = (file: File) => {
    if (!file || file.size === 0) {
      return "Favor anexar um arquivo de autorização";
    }
    return true;
  };

  const handleGroupsToAddChange = (
    options: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (actionMeta.action === "clear") methods.setValue("groupNames", []);
    const values = options.map((o) => o.value);
    if (options) methods.setValue("groupNames", values);
  };

  const loadUsernameOptions = async (
    inputValue: string,
    callback: (options: OptionsOrGroups<string, never>) => void
  ) => {
    if (inputValue.length >= 3) {
      const response = await fetch(
        `${process.env.REACT_APP_CONNSTR}/users/query`,
        {
          method: "POST",
          body: JSON.stringify(inputValue),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = await response.json();
      const options = json.formattedResults;

      callback(options);
      return options;
    }
  };

  const onSubmit: SubmitHandler<AccessRequestDTO> = (
    item: AccessRequestDTO,
    event
  ) => {
    item.tipoSolicitacaoAcesso = props.groups
      ? tipoSolicitacaoAcesso.AcessoAGrupos
      : isComiteReq
      ? tipoSolicitacaoAcesso.AcessoComite
      : tipoSolicitacaoAcesso.AcessoAoSistema;

    item.emailFile = eFile;
    props.onSubmit(item);
  };

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  return (
    <React.Fragment>
      {error && (
        <Alert
          variant={isWarning ? "warning" : "danger"}
          onClose={clearError}
          dismissible
        >
          {error}
        </Alert>
      )}
      <Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="mx-auto" style={{ width: "28rem" }}>
          <Card.Title className="pt-3 px-3">Solicitação de Acesso</Card.Title>
          <Card.Body>
            {/* {props.register && (
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
              )} */}
            {(props.register || props.approve) && (
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik01">
                  <Form.Label>Login do Solicitante</Form.Label>
                  <Controller
                    rules={{ required: true, maxLength: 250 }}
                    control={methods.control}
                    name="usernameSolicitante"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Form.Control
                        type="text"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        isInvalid={
                          !!methods.formState.errors.usernameSolicitante
                        }
                        placeholder="Insira o seu login"
                        disabled={props.approve}
                      />
                    )}
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
                  <Form.Label>Login do Superior</Form.Label>
                  {props.approve ? (
                    <Controller
                      rules={{ required: true, maxLength: 250 }}
                      control={methods.control}
                      name="usernameSuperior"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          type="text"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          ref={ref}
                          isInvalid={
                            !!methods.formState.errors.usernameSuperior
                          }
                          disabled={props.approve}
                        />
                      )}
                    />
                  ) : (
                    <Controller
                      rules={{ required: true }}
                      control={methods.control}
                      name="usernameSuperior"
                      render={({ field }) => (
                        <AsyncSelect
                          {...field}
                          defaultOptions={[]}
                          cacheOptions
                          placeholder={"Busque o nome do seu superior"}
                          loadOptions={loadUsernameOptions}
                          className={
                            !!methods.formState.errors.usernameSuperior
                              ? "invalid-border-react-select"
                              : ""
                          }
                          isDisabled={props.approve}
                        />
                      )}
                    />
                  )}
                  {!!methods.formState.errors.usernameSuperior && (
                    <div className="invalid-feedback-react-select">
                      Esse campo é obrigatório
                    </div>
                  )}
                </Form.Group>
              </Row>
            )}
            {(props.groups || isComiteReq || props.approve) && (
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationFormik03">
                  <Form.Label>Grupos a serem acessados</Form.Label>
                  <Controller
                    rules={{ required: true }}
                    control={methods.control}
                    name="groupNames"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        options={groups}
                        value={value.map((v) => ({ value: v, label: v }))}
                        onChange={handleGroupsToAddChange}
                        onBlur={onBlur}
                        isSearchable
                        isMulti
                        placeholder="Selecione os grupos a serem acessados"
                        isDisabled={props.approve}
                      />
                    )}
                  />
                  {!!methods.formState.errors.groupNames && (
                    <div className="invalid-feedback-react-select">
                      Esse campo é obrigatório
                    </div>
                  )}
                </Form.Group>
              </Row>
            )}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormik04">
                <Form.Label>Justificativa de acesso</Form.Label>
                <Controller
                  rules={{ required: true, maxLength: 250 }}
                  control={methods.control}
                  name="justificativa"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      isInvalid={!!methods.formState.errors.justificativa}
                      disabled={props.approve}
                      ref={ref}
                    />
                  )}
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
                  <Controller
                    rules={{ validate: handleSingleFileValidation }}
                    control={methods.control}
                    name="emailFile"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        onBlur={onBlur}
                        ref={ref}
                        isInvalid={
                          !!methods.formState.errors.emailFile?.message
                        }
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {methods.formState.errors.emailFile?.message}
                  </Form.Control.Feedback>
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
                  disabled={!methods.formState.isDirty}
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
                    onClick={() => props.onReject!(methods.getValues())}
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
                  disabled={!methods.formState.isDirty}
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
    </React.Fragment>
  );
};

export default AccessRequestForm;
