import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Formtable from "./components/Formtable";
import { Formik, Form, Field } from "formik";

function App() {
  const [datas, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  async function getTask() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  const fetchUser = async () => {
    try {
      let res = await getTask();
      console.log(res.data);
      setData(res.data);
      setFilteredData(res.data);
      console.log(datas);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log(datas);
  }, []);

  const handleSearch = (values) => {
    const searchQuery = values.query.toLowerCase();
    const filtered = datas.filter((item) =>
      item.id.toString().toLowerCase().includes(searchQuery)
    );
    if(filtered.length==0){
      console.log("Not found")
    }
    setFilteredData(filtered);
  };

  return (
    <>
      <div>
        <div>Search Application</div>
        <Formik initialValues={{ query: "" }} onSubmit={handleSearch}>
          {() => (
            <Form>
              <Field name="query" placeholder="Search by name" />
              <button type="submit">Search</button>
            </Form>
          )}
        </Formik>
      </div>
      <div>{filteredData && filteredData.map((item) => <Formtable item={item} />)}</div>
    </>
  );
}

export default App;
