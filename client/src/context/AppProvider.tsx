import { getApi } from "@/apis";
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
  const [refetchBatch, setRefetchBatch] = useState(false);

  useEffect(() => {
    fetchBatches();
  }, [refetchBatch]);

  const fetchBatches = async () => {
    try {
      const data = await getApi("batch");
      setBatches(data?.data || []);
    } catch (error) {
      console.log("Error to fetch batches", error);
    }
  };

  const values = {
    batches,
    setBatches,
    refetchBatch,
    setRefetchBatch,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
