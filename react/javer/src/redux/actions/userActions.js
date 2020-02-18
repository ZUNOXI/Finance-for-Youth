import axios from "axios";

export const userActions = {
  login,
  logout
};

// async function login(id, password) {
//   console.log(id, password);
//   const url = "http://15.165.18.192:8080/api/login";
//   const datas = {
//     uid: id,
//     upw: password
//   };
//   console.log("데이터", datas);

//   try {
//     const res = await axios.post(url, datas);
//     console.log("응답", res);
//     if (res.data.resmsg === "fail") {
//       alert("아이디가 없거나 비밀번호가 일치하지 않습니다. ");
//       return false;
//     }
//     const token = res.data.token;
//     localStorage.setItem("uid", id);
//     localStorage.setItem("jwtToken", token);
//     // dispatch(token)
//     return true;
//   } catch (e) {
//     alert("아이디가 없거나 비밀번호가 일치하지 않습니다. ");
//     return true;
//   }
// }

function login(id, password) {
  console.log(id, password);
  const url = "http://15.165.18.192:8080/api/login";
  const datas = {
    uid: id,
    upw: password
  };
  console.log("데이터", datas);

  // const [flag, setFlag] = React.useState(false);

  return axios
    .post(url, datas)
    .then(res => {
      console.log(res);
      if (res.data.resmsg === "fail") {
        alert("아이디가 없거나 비밀번호가 일치하지 않습니다. ");
        return false;
      } else if (res.data.resmsg === "succ") {
        const token = res.data.token;
        localStorage.setItem("uid", id);
        localStorage.setItem("jwtToken", token);
        return true;
      }
    })
    .catch(e => {
      console.log(e);
      alert("아이디가 없거나 비밀번호가 일치하지 않습니다. ");
    });
}

function logout() {}
