import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Grid } from "@material-ui/core";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const Signup = ({ history }) => {
  const [values, setValues] = useState({
    id: "",
    password: "",
    confirm: "",
    name: "",
    nickname: "",
    phonenumber: "",
    email: "",
    address: "",
    favor_ctg: [],
    photo: null,
    birth_date: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    if (prop === "photo") {
    } else {
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const save = e => {
    console.log(e.target.value);
    e.preventDefault();
    const URL = "http://15.165.18.192:8080/api/addMem";
    const data = {
      uid: values.id,
      upw: values.password,
      uname: values.name,
      unickname: values.nickname,
      uphonenum: values.phonenumber,
      uemail: values.email,
      uaddress: values.address,
      ufavorList: values.favor_ctg,
      uprofilephoto: values.photo,
      ubirth_date: values.birth_date
    };
    axios
      .post(URL, data)
      .then(res => {
        console.log(data);
        console.log(res);
        history.push("/");
      })
      .catch(e => console.log(e));
  };

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  }));

  const classes = useStyles();
  const theme = useTheme();

  const names = ["부동산", "주식", "암호화폐", "펀드", "기타"];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  }

  return (
    <form onSubmit={save} style={{ marginLeft: "10%", marginRight: "10%" }}>
      <Grid container direction="row" justify="center">
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <h1 style={{ color: "blue", fontSize: "60px" }}>JAVER</h1>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="id">아이디</InputLabel>
              <OutlinedInput
                name="id"
                id="id"
                onChange={handleChange("id")}
                variant="outlined"
                labelWidth={50}
              />
            </FormControl>

            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">비밀번호</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="password"
                id="password"
                onChange={handleChange("password")}
                labelWidth={65}
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">비밀번호 확인</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="confirm"
                id="confirm"
                onChange={handleChange("confirm")}
                labelWidth={100}
                type={values.showPassword ? "text" : "password"}
                value={values.confirm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="name">이름</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="name"
                id="name"
                onChange={handleChange("name")}
                labelWidth={35}
              />
            </FormControl>

            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="name">별명</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="nickname"
                id="nickname"
                onChange={handleChange("nickname")}
                labelWidth={35}
              />
            </FormControl>
            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="name">핸드폰 번호</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="phonenumber"
                id="phonenumber"
                onChange={handleChange("phonenumber")}
                labelWidth={85}
              />
            </FormControl>

            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="name">이메일</InputLabel>
              <OutlinedInput
                label="이메일"
                variant="outlined"
                name="email"
                id="email"
                onChange={handleChange("email")}
                labelWidth={50}
              />
            </FormControl>
            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="address">주소</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="address"
                id="address"
                labelWidth={35}
                onChange={handleChange("address")}
              />
            </FormControl>
            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-mutiple-chip-label">선호분야</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={values.favor_ctg}
                onChange={handleChange("favor_ctg")}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chips}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, values.favor_ctg, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <div style={{ width: "100%" }}>
              <p
                style={{
                  fontSize: "10px",
                  marginBottom: "2px",
                  color: "#6E6E6E",
                  fontWeight: "bold"
                }}
              >
                프로필사진
              </p>
            </div>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                variant="outlined"
                name="photo"
                id="photo"
                onChange={handleChange("photo")}
                type="file"
              />
            </FormControl>
            <br />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="birth_date">생년월일</InputLabel>
              <OutlinedInput
                variant="outlined"
                name="birth_date"
                id="birth_date"
                onChange={handleChange("birth_date")}
                labelWidth={65}
              />
            </FormControl>
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ fontSize: "20px", height: "56px", width: "100%" }}
            >
              가입하기
            </Button>
            <footer style={{ height: "30px" }}></footer>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signup;
