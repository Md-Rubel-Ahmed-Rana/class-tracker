/* eslint-disable react-hooks/exhaustive-deps */
import { getApi } from "@/apis";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AppContext = createContext<any>({});

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [batches, setBatches] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [revalidateUser, setRevalidateUser] = useState(false);
  const [refetchBatch, setRefetchBatch] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, [refetchBatch]);

  useEffect(() => {
    fetchLoggedInUser();
  }, [revalidateUser]);

  const fetchBatches = async () => {
    try {
      const data = await getApi("batch");
      setBatches(data?.data || []);
    } catch (error) {
      console.log("Error to fetch batches", error);
    }
  };

  const fetchLoggedInUser = async () => {
    setUserLoading(true);
    try {
      const data = await getApi("auth");
      setUser(data?.data);
      setUserLoading(false);
    } catch (error) {
      setUserLoading(false);
      console.log("Error to fetch logged in user", error);
    } finally {
      setUserLoading(false);
    }
  };

  const values = {
    user,
    userLoading,
    setRevalidateUser,
    batches,
    setBatches,
    refetchBatch,
    setRefetchBatch,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
