import { useNavigate } from "react-router-dom";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  AccessRequest,
  headersAccessRequestsList,
} from "../../shared/models/access-request.model";

const headers: {
  title: string;
  isFilterable: boolean;
  isSortable: boolean;
  prop: headersAccessRequestsList;
}[] = [
  { title: "ID", prop: "id", isFilterable: true, isSortable: true },
  {
    title: "Usuário Solicitante",
    prop: "usernameSolicitante",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Justificativa",
    prop: "justificativa",
    isFilterable: true,
    isSortable: true,
  },
  {
    title: "Superior",
    prop: "usernameSuperior",
    isFilterable: true,
    isSortable: true,
  },
];

const AccessRequestsList = (props: { items: AccessRequest[] }) => {
  let navigate = useNavigate();

  if (props.items.length === 0) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Nada foi encontrado</Alert.Heading>
        <p>
          Não foi encontrado nenhum item do inventário de casos de uso de dados
          pessoais com o filtro determinado.
        </p>
      </Alert>
    );
  }

  const handleRowClick = (row: AccessRequest) => {
    navigate(`${row.id}`);
  };

  return (
    <DatatableWrapper
      body={props.items}
      headers={headers}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20],
        },
      }}
    >
      <Row className="mb-4">
        <Col
          xs={12}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter placeholder="Entre sua busca" />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0 my-auto"
        >
          <PaginationOpts labels={{ beforeSelect: "Linhas por página" }} />
        </Col>
        <Col
          xs={12}
          md={2}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Pagination
            labels={{
              firstPage: "Primeira",
              lastPage: "Última",
              nextPage: "Próxima",
              prevPage: "Anterior",
            }}
          />
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={headers} />
        <TableBody onRowClick={handleRowClick} />
      </Table>
    </DatatableWrapper>
  );
};

export default AccessRequestsList;
