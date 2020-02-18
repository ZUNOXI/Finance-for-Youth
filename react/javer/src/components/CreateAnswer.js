import React from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";

const CreateAnswer = withRouter(({ match, calldata, showanswer }) => {
  const [values, setValues] = React.useState({
    num: "",
    content: ""
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const saveAnswer = e => {
    e.preventDefault();
    const url = "http://15.165.18.192:8080/api/comment/commentreg";
    const datas = {
      bnum: match.params.id,
      uid: localStorage.getItem("uid"),
      ccontent: values.content
    };
    axios
      .post(url, datas)
      .then(res => {
        calldata();
        showanswer();
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={saveAnswer}>
      <div style={{ marginBottom: "20px" }}>
        <TextField
          multiline
          rows="6"
          variant="outlined"
          value={values.content}
          onChange={handleChange("content")}
          style={{
            backgroundColor: "#fafafa",
            width: "100%",
            marginBottom: "10px"
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" type="submit">
            등록
          </Button>
        </div>
      </div>
    </form>
  );
});

export default CreateAnswer;
