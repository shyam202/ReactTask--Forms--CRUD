import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";

const App = () => {
  const [componentToDisplay, setComponentToDisplay] = useState("Dashboard");
  const [formObject, setFormObject] = useState({});
  const [formData, setFormData] = useState([]);
  const [mode, setMode] = useState("create");
  const [selectedidx, setSelectedIdx] = useState(null);

  const manipulateFormData = (form, index) => {
    if (index === undefined) {
      setFormData([...formData, form]);
    } else {
      setFormData((prevData) => {
        return prevData.map((data, id) => (id === index ? form : data));
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(formData));
  }, [formData]);

  const onDelete = (id) => {
    setFormData((oldData) => {
      return oldData.filter((_currData, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
      <Navbar />
      {componentToDisplay === "Dashboard" ? (
        <Dashboard
          setMode={setMode}
          setIndex={setSelectedIdx}
          formData={formData}
          formObj={formObject}
          setFormObject={setFormObject}
          deleteItem={onDelete}
          setComponent={() => setComponentToDisplay("Form")}
        />
      ) : (
        <Form
          formData={formData}
          manipulateFormData={manipulateFormData}
          mode={mode}
          setFormObject={setFormObject}
          formObj={formObject}
          selectedidx={selectedidx}
          setComponent={()=>setComponentToDisplay("Dashboard")}
        />
      )}
    </>
  );
};

export default App;
