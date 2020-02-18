import React, { useState } from "react";
import MessageIcon from "@material-ui/icons/Message";
import styled from "styled-components";
import { TextField, Icon } from "@material-ui/core";
import Comment from "./Comment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import axios from "axios";
import Collapse from "@material-ui/core/Collapse";

const StyledIcon = styled(Icon)`
  margin-right: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const Answer = ({ data, calldata }) => {
  console.log(data);
  const [acbool, setAcbool] = useState(false);
  const acomment = () => {
    if (acbool) {
      setAcbool(false);
    } else {
      setAcbool(true);
    }
  };
  const show = one => {
    if (one) {
      return <Comment data={data.rlist} cnum={data.cnum} calldata={calldata} />;
    } else {
      return <div></div>;
    }
  };

  const [editbool, setEditbool] = useState(false);

  const editanswer = () => {
    if (editbool) {
      setEditbool(false);
      const url = `http://15.165.18.192:8080/api/comment/commentupdate`;
      const datas = {
        cnum: data.cnum,
        bnum: data.bnum,
        uid: data.uid,
        ccontent: editcontent,
        ccreation_date: data.ccreation_date
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
    } else {
      setEditbool(true);
      setEditcontent(data.ccontent);
    }
  };

  const deleteanswer = () => {
    const url = `http://15.165.18.192:8080/api/comment/commentdelete`;
    const datas = {
      cnum: data.cnum
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

  const icons = () => {
    // 사용자와 답변작성자가 일치하는지 확인
    if (localStorage.getItem("uid") === data.uid) {
      return (
        <div>
          <StyledIcon onClick={acomment} component={MessageIcon} />
          {editbool ? (
            <StyledIcon
              component={DoneIcon}
              onClick={() => {
                editanswer();
              }}
            />
          ) : (
            <StyledIcon
              component={EditIcon}
              onClick={() => {
                editanswer();
              }}
            />
          )}

          <StyledIcon
            component={DeleteIcon}
            onClick={() => {
              deleteanswer();
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <StyledIcon onClick={acomment} component={MessageIcon} />
        </div>
      );
    }
  };

  const [editcontent, setEditcontent] = useState("");

  const handleEditChange = e => {
    setEditcontent(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #c8d0d0",
        borderRadius: "5px",
        marginBottom: "20px"
      }}
    >
      <div style={{ marginLeft: "10%", marginRight: "5%" }}>
        <p>{data.uid}</p>
        <hr style={{ border: "0.5px solid #c8d0d0" }} />
        {editbool ? (
          <TextField
            multiline
            row={5}
            variant="outlined"
            value={editcontent}
            onChange={handleEditChange}
          />
        ) : (
          <p>{data.ccontent}</p>
        )}

        <br />
        <hr style={{ border: "0.5px solid #c8d0d0" }} />
        <footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "7px"
          }}
        >
          <p style={{ fontSize: "12px" }}>{data.ccreation_date}</p>
          <div>{icons()}</div>
        </footer>
        <Collapse in={acbool}>
          <div>{show(acbool)}</div>
        </Collapse>
      </div>
    </div>
  );
};

export default Answer;
