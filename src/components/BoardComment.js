import React from "react";
import { Button, TextField, Icon, Grid } from "@material-ui/core";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
`;

// DetailQuestion에서 요청
const BoardComment = ({ data, bnum, calldata }) => {
  const [editbool, setEditbool] = React.useState(false);
  const [editcontent, setEditcontent] = React.useState("");

  const handleEditChange = e => {
    setEditcontent(e.target.value);
  };

  const editboardcomment = data => {
    if (editbool) {
      setEditbool(false);
      // 수정 신호 보내고 리프레쉬
      const url = `http://localhost:9090/api/replyboard/replyupdate`;
      const datas = {
        rnum: data.rnum,
        bnum: data.bnum,
        uid: data.uid,
        rcontent: editcontent,
        rcreation_date: data.rcreation_date
      };
      axios
        .post(url, datas)
        .then(res => {
          console.log(res);
          calldata();
        })
        .catch(e => console.log(e));
    } else {
      setEditbool(true);
      // input 보여주고 value 넣어주기
      setEditcontent(data.rcontent);
    }
  };

  const deleteboardcomment = num => {
    const url = `http://localhost:9090/api/replyboard/replydelete`;
    const datas = {
      rnum: num
    };
    axios
      .post(url, datas)
      .then(res => {
        console.log(res);
        calldata();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const showqmentel = exist => {
    if (exist) {
      return (
        <div>
          {exist.map(one => (
            <div key={one.rnum}>
              <b>
                <p style={{ fontSize: "15px" }}>{one.uid}</p>
              </b>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Grid>
                  {editbool ? (
                    <TextField
                      variant="outlined"
                      value={editcontent}
                      onChange={handleEditChange}
                      style={{
                        backgroundColor: "#fafafa",
                        width: "100%",
                        marginBottom: "10px"
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: "15px" }}>{one.rcontent}</p>
                  )}

                  <p style={{ fontSize: "10px" }}>{one.rcreation_date}</p>
                </Grid>
                <Grid>
                  {editbool ? (
                    <StyledIcon
                      component={DoneIcon}
                      onClick={() => {
                        editboardcomment(one);
                      }}
                    />
                  ) : (
                    <StyledIcon
                      component={EditIcon}
                      onClick={() => {
                        editboardcomment(one);
                      }}
                    />
                  )}

                  <StyledIcon
                    component={DeleteIcon}
                    onClick={() => {
                      deleteboardcomment(one.rnum);
                    }}
                  />
                </Grid>
              </Grid>
              <hr style={{ border: "0.5px solid #c8d0d0" }} />
            </div>
          ))}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const [content, setContent] = React.useState("");

  const handleChange = e => {
    setContent(e.target.value);
  };

  const saveComment = e => {
    e.preventDefault();
    const url = "http://localhost:9090/api/replyboard/replyreg";
    const datas = {
      uid: "ssafy",
      bnum: bnum,
      rcontent: content
    };
    axios
      .post(url, datas)
      .then(res => {
        calldata();
        setContent("");
      })
      .catch(e => console.log(e));
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <form onSubmit={saveComment}>
        <TextField
          variant="outlined"
          value={content}
          onChange={handleChange}
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
        <div>{showqmentel(data)}</div>
      </form>
    </div>
  );
};

export default BoardComment;
