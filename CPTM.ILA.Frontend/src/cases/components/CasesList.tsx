import { useNavigate } from "react-router-dom";
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
} from "react-bs-datatable";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import {
    CaseListItem,
    headersCaseListItem,
} from "../../shared/models/DTOs/case-list-item.model";

const headers: {
    title: string;
    isFilterable: boolean;
    isSortable: boolean;
    prop: headersCaseListItem;
}[] = [
    { title: "Nome", prop: "nome", isFilterable: true, isSortable: true },
    { title: "Ref", prop: "ref", isFilterable: true, isSortable: true },
    { title: "Área", prop: "area", isFilterable: true, isSortable: true },
    {
        title: "Usuário Responsável",
        prop: "usuarioResp",
        isFilterable: true,
        isSortable: true,
    },
    {
        title: "Data de Envio",
        prop: "dataEnvio",
        isFilterable: true,
        isSortable: true,
    },
    {
        title: "Data de Aprovação",
        prop: "dataAprovacao",
        isFilterable: true,
        isSortable: true,
    },
    {
        title: "Data de Próxima Revisão",
        prop: "dataProxRevisao",
        isFilterable: true,
        isSortable: true,
    },
    {
        title: "Trata Dados Pessoais Sensíveis?",
        prop: "dadosPessoaisSensiveis",
        isSortable: true,
        isFilterable: false,
    },
];

const CasesList = (props: { items: CaseListItem[]; redirect: boolean }) => {
    let navigate = useNavigate();

    if (props.items.length === 0) {
        return (
            <Alert variant="warning">
                <Alert.Heading>Nada foi encontrado</Alert.Heading>
                <p>
                    Não foi encontrado nenhum item do inventário de casos de uso
                    de dados pessoais com o filtro determinado.
                </p>
            </Alert>
        );
    }

    const handleRowClick = (row: CaseListItem) => {
        if (props.redirect) {
            navigate(`${row.id}`);
        }
    };

    return (
        <Card>
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
                        className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    >
                        <PaginationOptions
                            labels={{ beforeSelect: "Linhas por página" }}
                        />
                    </Col>
                    <Col
                        xs={12}
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
                    <TableHeader />
                    <TableBody
                        onRowClick={handleRowClick}
                        labels={{ noResults: "Nenhum resultado encontrado" }}
                        rowProps={{
                            style: { cursor: props.redirect ? "pointer" : "" },
                        }}
                    />
                </Table>
            </DatatableWrapper>
        </Card>
    );
};

export default CasesList;
