import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
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

type PieChartData = {
  title: string;
  value: number;
  color: string;
  key: number;
};

const colors = randomColor({
  count: 100,
  hue: "random",
  luminosity: "random",
  seed: "same2",
});

const CasesDashboard = () => {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [, setHovered] = useState<number | undefined>(undefined);
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

  const { user, token, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

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

      console.log(responseData.totals);

      const loadedTotals: StatusTotals[] = responseData.totals;

      if (loadedTotals.length === 0) {
        setPieChartData([]);
      } else {
        const transformedData: PieChartData[] = loadedTotals.map((d, index) => {
          return {
            title: d.nome,
            value: d.quantidadeByStatus,
            color: colors[index],
            key: index,
          };
        });
        console.log(transformedData);

        setPieChartData(transformedData);
      }
    };

    const getComiteCasesTotals = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/group/comite-member/totals`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData.totals);

      const loadedTotals: GroupTotals[] = responseData.totals;

      if (loadedTotals.length === 0) {
        setPieChartData([]);
      } else {
        const transformedData: PieChartData[] = loadedTotals.map((d, index) => {
          return {
            title: d.groupName,
            value: d.quantityInGroup,
            color: colors[index],
            key: index,
          };
        });
        console.log(transformedData);

        setPieChartData(transformedData);
      }
    };

    const getDpoCasesTotals = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/extensao-encarregado/totals`,
        undefined,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData.totals);

      const loadedTotals: ExtensaoEncarregadoTotals[] = responseData.totals;

      if (loadedTotals.length === 0) {
        setPieChartData([]);
      } else {
        const transformedData: PieChartData[] = loadedTotals.map((d, index) => {
          return {
            title: d.extensaoNome,
            value: d.quantityByExtensao,
            color: colors[index],
            key: index,
          };
        });
        console.log(transformedData);

        setPieChartData(transformedData);
      }
    };

    if (user.isComite && user.isDPO) {
      getDpoCasesTotals().catch((error) => {
        console.log(error);
      });
    } else if (user.isComite && !user.isDPO) {
      getComiteCasesTotals().catch((error) => {
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
  }, [sendRequest, token, currentGroup.id, user.isComite, user.isDPO]);

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
      {pieChartData.length === 0 && (
        <Alert variant="warning" dismissible>
          "Não existem dados para a seleção!"
        </Alert>
      )}
      <Row>
        <h3 className="mb-4">Visão de Processos</h3>
      </Row>
      <Row>
        <Card border="primary" className="m-0" style={{ height: "400px" }}>
          <PieChart
            data={pieChartData}
            label={({ x, y, dx, dy, dataEntry, dataIndex }) => (
              <text
                key={dataIndex}
                x={x + 5}
                y={y + 9}
                dx={dx}
                dy={dy}
                dominantBaseline="auto"
                textAnchor="middle"
                style={{
                  fontSize: "4px",
                  fontFamily: "sans-serif",
                }}
              >
                {dataEntry.title +
                  ": " +
                  Math.round(dataEntry.percentage) +
                  "%"}
              </text>
            )}
            radius={20}
            labelPosition={200}
            onClick={(event, index) => {
              console.log("CLICK", { event, index });
              setSelected(index === selected ? undefined : index);
            }}
            onMouseOver={(_, index) => {
              setHovered(index);
            }}
            onMouseOut={() => {
              setHovered(undefined);
            }}
          />
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default CasesDashboard;
