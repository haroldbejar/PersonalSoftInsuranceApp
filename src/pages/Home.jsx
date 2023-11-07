import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import endPoints from "../endpoints/endPoints";
import useFetch from "../hooks/useFetch";

function Home(){

  const { data, loading, error, get } = useFetch();
  const [isLoading, setIsloading] = useState(true);
  
  useEffect(() => {
    const getListInsurance = () => {
      try {
        if (isLoading) {
          get(`${endPoints.Insurances.policies}`);
          setIsloading(false);
        }
        
      } catch (err) {
        console.log(err);
      }
    }
    getListInsurance();
  }, [get,isLoading]);

  return (
    <>
      <Navbar />
      <Table datos={data} loading={loading} error={error}/>
    </>
  );
}

export default Home;