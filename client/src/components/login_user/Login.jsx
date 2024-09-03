import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Login = () => {

  let redirect=useNavigate()

  let checkInput = {
    email: "",
    password: "",
  };
  let [iniVal, setVal] = useState(checkInput);
  let [error, setError] = useState({});

  let checkUaserHandler = (e) => {
    let { name, value } = e.target;
    // console.log(value)
    setVal({ ...iniVal, [name]: value });
  };

  let checkUserValidation = () => {
    let error = {};
    if (!iniVal.email) {
      error.email = "Please Enter Your Email";
    }
    if (!iniVal.password) {
      error.password = "Enter Your Valid Password";
    }
    return error;
  };

  let userSubmitForm = async (e) => {
    e.preventDefault();
    let formValidation = checkUserValidation();
    if (Object.keys(formValidation) > 0) {
      setError(formValidation);
    } else {
      await axios
        .post("http://localhost:7000/api/checkUser",iniVal)
        .then((response) => {
          let token=response.data.token;
            localStorage.setItem('token',token);
          console.log(response)
          toast.success(response.data.msg,{ position: "top-right" });
          redirect("/");
        })
        .catch((error)=>{
          console.log(error)
           toast.error(error.response.data.msg,{position:"top-right"})
          //  redirect("/");
        })
    }
  };

  return (
    <>
      <div className="form-box">
        <div className="header-text">Login Form</div>
        <form onSubmit={userSubmitForm}>
          <input
            placeholder="Your Email Address"
            type="text"
            name="email"
            onChange={checkUaserHandler}
          />
          {error.email && <div className="text-danger">{error.password}</div>}
          <input
            placeholder="Your Password"
            name="password"
            type="password"
            onChange={checkUaserHandler}
          />
          {error.password && (
            <div className="text-danger">{error.password}</div>
          )}

          <span>
            <a>Forgat Password</a>
          </span>
          <button>login</button>
        </form>
        <div className="signUPDiv">
          <span>
            Don`t have an account ? <Link to={"../add"}>Sign Up</Link>
          </span>
        </div>
      </div>
    </>
  );
};
