import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Form = (props) => {
  const { setComponent, mode, selectedidx, formData, manipulateFormData } = props;
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (mode === "edit") {
      setFormValues(formData[selectedidx]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const backToDashboard = () => {
    setComponent("Dashboard");
  }

  const reset = () => {
    setFormValues({ name: "", samples: "", owner: "", marker: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "create") {
      manipulateFormData({
        name: formValues.name,
        samples: formValues.samples,
        owner: formValues.owner,
        marker: formValues.marker,
      });
    } else {
      manipulateFormData(
        {
          name: formValues.name,
          samples: formValues.samples,
          owner: formValues.owner,
          marker: formValues.marker,
        },
        selectedidx
      );
    }
    setComponent("Dashboard");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid
        container
        className="container"
        alignItems="center"
        direction="column"
      >
        <TextField
          id="name-input"
          name="name"
          label="Data PoolName"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
        />

        <TextField
          id="samples-input"
          name="samples"
          label="samples"
          type="number"
          value={formValues.samples}
          onChange={handleInputChange}
        />

        <TextField
          id="owner-input"
          name="owner"
          label="owner"
          type="text"
          value={formValues.owner}
          onChange={handleInputChange}
        />

        <TextField
          id="marker-input"
          name="marker"
          label="marker"
          type="text"
          value={formValues.marker}
          onChange={handleInputChange}
        />
        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <br />
        <Button variant="contained" color="primary" onClick={reset}>
          Reset
        </Button>
        <br />
        <Button variant="contained" color="primary" onClick={backToDashboard}>
          Back to Dashboard
        </Button>
      </Grid>
    </form>
  );
};
export default Form;
