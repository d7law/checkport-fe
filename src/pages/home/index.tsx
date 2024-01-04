import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.create({ baseURL: "/" }).get("/product");

        console.log(response);
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data:</h1>
      {data ? <h1>{data}</h1> : <p>Loading data...</p>}
    </div>
  );
};

export default Home;
