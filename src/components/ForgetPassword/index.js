import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'
const ForgetPassword = () => {
    let data;
  const resetPass = async (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const result = await axios.post("http://localhost:4000/forgetPassword", {
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPass: e.target.confirmPassword.value,
    });
    // const email = result.data.email;
    // navigate(`/confirmAccount/${email}`);
    data=result.data;
    console.log(result.data, "  ", data);
    if(result==true){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your account has been confirmed',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        Swal.fire({
            title: 'Oops',
            text: "Your password does not reset try it again!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: 'red',
            confirmButtonText: 'ok'
          })
    }
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={resetPass}>
          {/* <span {data ? className="show":className="hide"}>{data}</span> */}
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <input type="password" name="confirmPassword" placeholder="confirm password" />
          <button type="submit">reset</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
