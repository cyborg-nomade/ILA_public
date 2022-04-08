import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiFillCaretDown } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { CommentDTO } from "./../../shared/models/DTOs/comment-dto";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const CreateCommentBox = (props: { item: string }) => {
  const [text, setText] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { user, token, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  const handleTextChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(changeEvent.currentTarget.value);
  };

  const handleOverlayOpen = () => {
    setOverlayOpen((prevState) => !prevState);
  };

  const clearMessage = () => {
    setMessage("");
    setOverlayOpen(false);
  };

  const sendCommentHandler = async () => {
    console.log(text);

    const commentDto: CommentDTO = {
      author: user,
      groupId: currentGroup.id,
      refItem: props.item,
      text,
    };

    console.log(commentDto);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/threads/`,
        "POST",
        JSON.stringify(commentDto),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData);
      setMessage(responseData.message);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h4">Enviar comentário com dúvida</Popover.Header>
      {!isLoading && !error && !message && (
        <Popover.Body>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={handleTextChange}
          />
          <Button variant="primary" onClick={sendCommentHandler}>
            Enviar
          </Button>
        </Popover.Body>
      )}
      {isLoading && (
        <Popover.Body>
          <Row className="justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        </Popover.Body>
      )}
      {!isLoading && error && (
        <Popover.Body>
          <Alert
            variant={isWarning ? "warning" : "danger"}
            onClose={clearError}
            dismissible
          >
            Ocorreu um erro: {error}
          </Alert>
        </Popover.Body>
      )}
      {!isLoading && !error && message && (
        <Popover.Body>
          <Alert variant="success" onClose={clearMessage} dismissible>
            {message}
          </Alert>
        </Popover.Body>
      )}
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      overlay={popover}
      show={overlayOpen}
    >
      <Button variant="success" onClick={handleOverlayOpen}>
        <Row className="justify-content-around align-items-center">
          <Col lg={1}>Enviar dúvida</Col>
          <Col lg={2}>
            <AiFillCaretDown />
          </Col>
        </Row>
      </Button>
    </OverlayTrigger>
  );
};

export default CreateCommentBox;
