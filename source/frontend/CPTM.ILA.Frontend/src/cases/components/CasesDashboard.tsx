import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { PieChart } from "react-minimal-pie-chart";
import {
    PieChart,
    Pie,
    Sector,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import randomColor from "randomcolor";

import { ExtensaoEncarregadoTotals } from "../../shared/models/DTOs/extensao-encarregado-totals.model";
import { GroupTotals } from "../../shared/models/DTOs/group-totals.model";
import { StatusTotals } from "../../shared/models/DTOs/status-totals.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";

type PieChartData = {
    name: string;
    value: number;
};

const colors = randomColor({
    count: 100,
    hue: "random",
    luminosity: "random",
    seed: "same2",
});

const getChartColor = (statusName: string, index: number) => {
    if (statusName === "Em Preenchimento") {
        return "#ffc107";
    }
    if (statusName === "Pendente Aprovação") {
        return "#6c757d";
    }
    if (statusName === "Concluído") {
        return "#198754";
    }
    if (statusName === "Reprovado") {
        return "#dc3545";
    }
    return colors[index];
};

const renderLabel = (entry: any) => {
    return `${entry.name}: ${Math.round(entry.percent * 100)}%`;
};

const CasesDashboard = () => {
    const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
    const [showAlert, setShowAlert] = useState(true);

    const { user, token, currentGroup, currentComiteMember } =
        useContext(AuthContext);

    const { isLoading, error, isWarning, sendRequest, clearError } =
        useHttpClient();

    let navigate = useNavigate();

    useEffect(() => {
        const getGroupCaseTotals = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/group/${currentGroup.id}/status/totals`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedTotals: StatusTotals[] = responseData.totals;
            console.log("groupCase loadedTotals: ", loadedTotals);

            if (loadedTotals.length === 0) {
                setPieChartData([]);
            } else {
                const transformedData: PieChartData[] = loadedTotals.map(
                    (d, index) => {
                        return {
                            name: d.nome,
                            value: d.quantidadeByStatus,
                        };
                    }
                );

                console.log("transformedData: ", transformedData);
                setPieChartData(transformedData);
            }
        };

        const getComiteCasesTotals = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/user/${user.id}/group/totals`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedTotals: GroupTotals[] = responseData.totals;
            console.log("comiteCase loadedTotals: ", loadedTotals);

            if (loadedTotals.length === 0) {
                setPieChartData([]);
            } else {
                const transformedData: PieChartData[] = loadedTotals.map(
                    (d, index) => {
                        return {
                            name: d.groupName,
                            value: d.quantityInGroup,
                            // color: colors[index],
                            // key: index,
                        };
                    }
                );

                console.log("transformedData: ", transformedData);
                setPieChartData(transformedData);
            }
        };

        const getDpoCasesTotals = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/extensao-encarregado/${currentComiteMember.id}/status/totals`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedTotals: StatusTotals[] = responseData.totals;
            console.log("dpoCase loadedTotals: ", loadedTotals);

            if (loadedTotals.length === 0) {
                setPieChartData([]);
            } else {
                const transformedData: PieChartData[] = loadedTotals.map(
                    (d, index) => {
                        return {
                            name: d.nome,
                            value: d.quantidadeByStatus,
                        };
                    }
                );

                console.log("transformedData: ", transformedData);
                setPieChartData(transformedData);
            }
        };

        const getDpoAllComiteMembersTotals = async () => {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_CONNSTR}/cases/status/totals`,
                undefined,
                undefined,
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            );

            const loadedTotals: StatusTotals[] = responseData.totals;
            console.log("dpoCase loadedTotals: ", loadedTotals);

            if (loadedTotals.length === 0) {
                setPieChartData([]);
            } else {
                const transformedData: PieChartData[] = loadedTotals.map(
                    (d, index) => {
                        return {
                            name: d.nome,
                            value: d.quantidadeByStatus,
                        };
                    }
                );

                console.log("transformedData: ", transformedData);
                setPieChartData(transformedData);
            }
        };

        if (
            user.isComite &&
            user.isDPO &&
            currentComiteMember.nome !== "TODOS"
        ) {
            getDpoCasesTotals().catch((error) => {
                console.log(error);
            });
        } else if (user.isComite && currentGroup.nome === "TODOS") {
            getComiteCasesTotals().catch((error) => {
                console.log(error);
            });
        } else if (user.isDPO && currentComiteMember.nome === "TODOS") {
            getDpoAllComiteMembersTotals().catch((error) => {
                console.log(error);
            });
        } else {
            getGroupCaseTotals().catch((error) => {
                console.log(error);
            });
        }

        return () => {
            setPieChartData([]);
        };
    }, [
        sendRequest,
        token,
        currentGroup.id,
        user.isComite,
        user.isDPO,
        currentComiteMember.id,
        user.id,
        currentGroup.nome,
        currentComiteMember.nome,
    ]);

    const onClickChart = (arg: CategoricalChartState) => {
        if (arg) {
            console.log(arg.activePayload);

            arg.activePayload?.forEach((ap) => {
                if (ap.payload.name === "Em Preenchimento") {
                    if (!user.isComite) {
                        console.log("Em Preenchimento");
                        return navigate("../cases/continue");
                    }
                }
                if (ap.payload.name === "Pendente Aprovação") {
                    if (user.isDPO) {
                        console.log("Pendente Aprovação");
                        return navigate("../cases/pending");
                    }
                    if (user.isComite && !user.isDPO) {
                        console.log("Pendente Aprovação");
                        return navigate("../cases/approve");
                    }
                }
                if (ap.payload.name === "Concluído") {
                    if (!user.isComite) {
                        console.log("Concluído");
                        return navigate("../cases/edit");
                    }
                    if (user.isComite && !user.isDPO) {
                        console.log("Concluído");
                        return navigate("../cases/");
                    }
                }
                if (ap.payload.name === "Reprovado") {
                    if (!user.isComite) {
                        console.log("Reprovado");
                        return navigate("../cases/reprovados");
                    }
                }

                return console.log(ap.payload.name);
            });
        }
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
            {pieChartData.length === 0 && showAlert && (
                <Alert
                    variant="warning"
                    dismissible
                    onClose={() => setShowAlert(false)}
                >
                    "Não existem dados para o grupo selecionado!"
                </Alert>
            )}
            <Row>
                <h3 className="mb-4">Visão de Processos</h3>
            </Row>
            <Row>
                <Card
                    border="primary"
                    className="m-0"
                    style={{ height: "400px" }}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart
                            width={400}
                            height={400}
                            onClick={onClickChart}
                        >
                            <Pie
                                data={pieChartData}
                                cx={"50%"}
                                cy={"50%"}
                                labelLine
                                label={renderLabel}
                                outerRadius={40}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={getChartColor(entry.name, index)}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </Row>
        </React.Fragment>
    );
};

export default CasesDashboard;
