import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateCommentBox = () => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h4">Enviar comentário com dúvida</Popover.Header>
      <Popover.Body>
        <Form.Control as="textarea" rows={3} />
        <Button variant="primary">Enviar</Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="left" overlay={popover}>
      <Button variant="success">
        Enviar dúvida <i className="bi bi-arrow-down"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default CreateCommentBox;
