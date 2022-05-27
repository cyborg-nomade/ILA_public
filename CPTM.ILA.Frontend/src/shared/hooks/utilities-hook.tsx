import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "./http-hook";

export const useUtilities = () => {
  const [systems, setSystems] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const { token } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getSystems = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/utilities/systems`,
        undefined,
        undefined,
        { "Content-Type": "application/json", Authorization: "Bearer " + token }
      );

      const systems: string[] = responseData.systems;
      console.log("systems: ", systems);

      setSystems(systems);
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest, token]);

  const getCountries = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/utilities/countries`,
        undefined,
        undefined,
        { "Content-Type": "application/json", Authorization: "Bearer " + token }
      );

      const countries: string[] = responseData.countries;
      console.log("countries: ", countries);

      setCountries(countries);
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest, token]);

  useEffect(() => {
    const runUtilities = async () => {
      try {
        await getSystems();
        await getCountries();
      } catch (error) {
        console.log(error);
      }
    };

    runUtilities().catch((error) => {
      console.log(error);
    });

    return () => {
      setCountries([]);
      setSystems([]);
    };
  }, [getCountries, getSystems]);

  return { systems, countries, isLoading, error, clearError };
};
