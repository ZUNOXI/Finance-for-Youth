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
//Answer에서 요청
const Comment = ({ data, cnum, calldata }) => {
  const [editbool, setEditbool] = React.useState(-1);
  const [editcontent, setEditcontent] = React.useState("");

  const handleEditChange = e => {
    setEditcontent(e.target.value);
  };

  const editboardcomment = data => {
    console.log(data, "여기야아아아아");
    if (editbool !== -1) {
      setEditbool(-1);
      // 수정 신호 보내고 리프레쉬
      const url = `http://15.165.18.192:8080/api/replycomment/replyupdate`;
      const datas = {
        rnum: data.rnum,
        cnum: data.cnum,
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
      setEditbool(data.rnum);
      // input 보여주고 value 넣어주기
      setEditcontent(data.rcontent);
    }
  };

  const deleteboardcomment = num => {
    const url = `http://15.165.18.192:8080/api/replycomment/replydelete`;
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
                  {editbool === one.rnum ? (
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
                {one.uid === localStorage.getItem("uid") ? (
                  <Grid>
                    {editbool === one.rnum ? (
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
                ) : (
                  <></>
                )}
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
    const url = "http://15.165.18.192:8080/api/replycomment/replycommentreg";
    const datas = {
      cnum: cnum,
      uid: localStorage.getItem("uid"),
      rcontent: content
    };
    axios
      .post(url, datas)
      .then(res => {
        console.log(res);
        setContent("");
        calldata();
      })
      .catch(e => console.log(e));
  };

  const [authbool, setAuthbool] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("uid")) {
      setAuthbool(true);
    }
  }, []);

  return (
    <div className="whowho" style={{ marginBottom: "20px" }}>
      <form onSubmit={saveComment}>
        {authbool ? (
          <div>
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
          </div>
        ) : (
          <></>
        )}

        <div>{showqmentel(data)}</div>
      </form>
    </div>
  );
};

export default Comment;
