import React, { useContext, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const PendingCasesCounter = (props: { gid: number }) => {
    const [pendingCasesCount, setPendingCasesCount] = useState(0);

    const { token } = useContext(AuthContext);

    const { sendRequest } = useHttpClient();

    useEffect(() => {
        const getGroupCasePendingTotals = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_CONNSTR}/cases/group/${props.gid}/status/pending/totals`,
                    undefined,
                    undefined,
                    {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    }
                );

                const loadedTotals: number = responseData.totalPending;
                console.log("groupCase pendingTotal: ", loadedTotals);

                setPendingCasesCount(loadedTotals);
            } catch (e) {
                console.log(e);
            }
        };

        getGroupCasePendingTotals().catch((error) => {
            console.log(error);
        });

        return () => {
            setPendingCasesCount(0);
        };
    }, [sendRequest, token, props.gid]);

    return (
        <Badge bg={pendingCasesCount !== 0 ? "danger" : "secondary"}>
            {pendingCasesCount}
        </Badge>
    );
};

export default PendingCasesCounter;
