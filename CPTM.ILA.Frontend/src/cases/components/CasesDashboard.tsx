import React, { useContext, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { GroupTotals } from "../../shared/models/DTOs/group-totals.model";
import { StatusTotals } from "../../shared/models/DTOs/status-totals.model";

type PieChartData = {
  title: string;
  value: number;
  color: string;
  key: number;
};

const dataMock: PieChartData[] = [
  { title: "One", value: 10, color: "#E38627", key: 1 },
  { title: "Two", value: 15, color: "#C13C37", key: 2 },
  { title: "Three", value: 20, color: "#6A2135", key: 3 },
];

const defaultLabelStyle = {
  fontSize: "5px",
  fontFamily: "sans-serif",
};

const CasesDashboard = () => {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

  const { user, token, currentGroup } = useContext(AuthContext);

  const { isLoading, error, isWarning, sendRequest, clearError } =
    useHttpClient();

  useEffect(() => {
    const getGroupThreadTotals = async () => {
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
            color: Math.floor(Math.random() * 16777215).toString(16),
            key: index,
          };
        });
        setPieChartData(transformedData);
      }
    };

    getGroupThreadTotals().catch((error) => {
      console.log(error);
    });
  }, [sendRequest, token, currentGroup.id]);

  return (
    <React.Fragment>
      <h3 className="mb-4">Visão de Processos</h3>
      <PieChart
        data={pieChartData}
        label={({ x, y, dx, dy, dataEntry, dataIndex }) => (
          <text
            key={dataIndex}
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              fontSize: "5px",
              fontFamily: "sans-serif",
            }}
          >
            {dataEntry.title + ": " + Math.round(dataEntry.percentage) + "%"}
          </text>
        )}
        radius={30}
        labelPosition={135}
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
    </React.Fragment>
  );
};

export default CasesDashboard;
