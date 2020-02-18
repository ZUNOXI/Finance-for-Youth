import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { userActions } from "../redux/actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    display: "flex",
    justifyContent: "center"
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const useModalStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const Loginout = ({ jwtbool, setJwtbool }) => {
  const classes = useStyles();
  const modalclasses = useModalStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [userid, setUserid] = React.useState("");
  const [userpw, setUserpw] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [showid, setShowid] = React.useState("");
  const signupstyle = { fontSize: "7px" };

  const onChangeId = e => {
    setUserid(e.target.value);
  };
  const onChangePw = e => {
    setUserpw(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const login = e => {
    e.preventDefault();
    console.log("로그인 실행");
    const loggedInResult = userActions.login(userid, userpw);
    loggedInResult.then(res => {
      if (res) {
        // 로그인 성공시
        handleClose(); // 모달창을 종료
        setJwtbool(true); // 로그아웃창이 나타남
        const temp = localStorage.getItem("uid");
        if (temp) {
          setShowid(temp);
        }
        console.log("로그인성공");
      } else {
        // 로그인 실패
        handleClose(); // 모달창을 종료
        setJwtbool(false); // 로그아웃창이 사라짐
        console.log("로그인 실패");
      }
    });
  };

  const logout = () => {
    if (localStorage.getItem("jwtToken")) {
      localStorage.removeItem("jwtToken");
      setJwtbool(false);
      localStorage.removeItem("uid");
    } else {
      setJwtbool(false);
      alert("이미 로그아웃 되었습니다.");
    }
  };

  useEffect(() => {
    const temp = localStorage.getItem("uid");
    if (temp) {
      setShowid(temp);
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {jwtbool ? (
        <div>
          <div style={{ fontFamily: "Nanum Gothic", display: "inline" }}>
            {showid}
          </div>
          <Button
            color="inherit"
            onClick={logout}
            variant="outlined"
            style={{ marginLeft: "12px", fontFamily: "Nanum Gothic" }}
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <div>
          <Button
            color="inherit"
            onClick={handleOpen}
            variant="outlined"
            style={{ fontSize: "100%", fontFamily: "Nanum Gothic" }}
          >
            로그인
          </Button>
        </div>
      )}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <h1
              id="simple-modal-title"
              style={{ color: "blue", fontFamily: "bold" }}
            >
              JAVER
            </h1>
            <form
              className={modalclasses.root}
              noValidate
              autoComplete="off"
              onSubmit={login}
            >
              <div>
                <TextField
                  id="id"
                  label="Id"
                  variant="outlined"
                  value={userid}
                  onChange={onChangeId}
                  style={{ marginBottom: "5%" }}
                />
                <TextField
                  value={userpw}
                  onChange={onChangePw}
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </div>
              <Grid>
                <Button style={signupstyle} href="/signup">
                  회원가입
                </Button>
                <Button style={signupstyle}>아이디찾기</Button>
                <Button style={signupstyle}>비밀번호찾기</Button>
              </Grid>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </div>
            </form>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};
export default Loginout;
