/* ---- Email Check ---- starts*/
const emailCheck=(email)=>{
    let re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);

// if (re.test(email)) {
//   console.log("valid email :>> ");
//   setIsEmailValid(true);
// } else {
//   console.log("invalid email");
//   setIsEmailValid(false);
// }
}

/* ---- Email Check ---- ends*/
export {emailCheck};