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
const headersMinimal: {
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
];

const CasesList = (props: {
    items: CaseListItem[];
    redirect: boolean;
    minimal?: boolean;
}) => {
    let navigate = useNavigate();

    if (props.items.length === 0) {
        return (
            <Alert variant="warning">
                <p>
                    Não há dados para o grupo atual. Selecione um novo grupo
                    para nova pesquisa.
                </p>
            </Alert>
        );
    }

    const handleRowClick = (row: CaseListItem) => {
        if (props.redirect && !props.minimal) {
            navigate(`${row.id}`);
        }

        if (props.redirect && props.minimal) {
            navigate(`../cases/edit/${row.id}`);
        }
    };

    return (
        <Card>
            <DatatableWrapper
                body={props.items}
                headers={props.minimal ? headersMinimal : headers}
                paginationOptionsProps={{
                    initialState: {
                        rowsPerPage: 10,
                        options: [5, 10, 15, 20],
                    },
                }}
            >
                {!props.minimal && (
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
                )}
                <Table>
                    <TableHeader />
                    <TableBody
                        onRowClick={handleRowClick}
                        labels={{ noResults: "Nenhum resultado encontrado" }}
                        rowProps={(row: CaseListItem) => ({
                            style: {
                                background: row.aprovado
                                    ? "#198754"
                                    : row.reprovado
                                    ? "#dc3545"
                                    : row.encaminhadoAprovacao
                                    ? "#6c757d"
                                    : "#ffc107",
                                color: row.aprovado
                                    ? "white"
                                    : row.reprovado
                                    ? "white"
                                    : row.encaminhadoAprovacao
                                    ? "white"
                                    : "black",
                                cursor: props.redirect ? "pointer" : "",
                            },
                        })}
                        // rowProps={{
                        //     style: { cursor: props.redirect ? "pointer" : "" },
                        // }}
                    />
                </Table>
            </DatatableWrapper>
        </Card>
    );
};

export default CasesList;
