import axios from "axios";

export const userActions = {
  login,
  logout
};

function login(id, password) {
  console.log(id, password);
  const url = "http://15.165.18.192:8080/api/login";
  const datas = {
    uid: id,
    upw: password
  };
  console.log(datas);
  axios
    .post(url, datas)
    .then(res => {
      console.log(res);
      if (res.data.resmsg === "fail") {
        alert("아이디가 없거나 비밀번호가 일치하지 않습니다. ");
        return;
      }
      const token = res.data.token;
      localStorage.setItem("uid", id);
      localStorage.setItem("jwtToken", token);
      // dispatch(token)
    })
    .catch(e => {
      alert("아이디가 없거나 비밀번호가 일치하지 않습니다. ");
    });
}

function logout() {}
