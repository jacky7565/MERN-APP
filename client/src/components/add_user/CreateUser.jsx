import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

library.add(faArrowLeft);

export const AddUser = () => {
  let nav = useNavigate();
  let backClick = () => {
    nav("/");
  };

  let userValue = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  let [user, setUsers] = useState(userValue);
  const [errors, setErrors] = useState({});

  const inputHandler = (e) => {
    let { name, value } = e.target;
    setUsers({ ...user, [name]: value });
  };

  let formValidation = () => {
    let errors = {};

    if (!user.fname) {
      errors.fname = "First name Is Required";
    }
    if (!user.lname) {
      errors.lname = "Last Name Is Required";
    }
    if (!user.email) {
      errors.email = "Email Is Required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email Not Valid";
    }
    if (!user.password) {
      errors.password = "Password Is Required";
    }

    return errors;
  };
  // console.log(errors)

  let submitForm = async (e) => {
    e.preventDefault();
    let validaionFun = formValidation();
    if (Object.keys(validaionFun).length > 0) {
      setErrors(validaionFun);
    } else {
      await axios
        .post("http://localhost:7000/api/create", user)
        .then((response) => {
          toast.success("Data Inserted Successfully", {
            position: "top-right",
          });
          nav("/");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
console.log(errors)
  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-90">
          <div className="row d-flex justify-content-center align-items-center h-90">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div id="czard_nzame" className="card">
                <div className="card-body p-5">
                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-secondary btn-sm"
                    onClick={backClick}
                  >
                    <FontAwesomeIcon icon="arrow-left" />
                    Back
                  </button>
                  <h2 className="text-uppercase text-center mb-3">
                    Create an account
                  </h2>
                  <hr />
                  <form onSubmit={submitForm}>
                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="text"
                        id="fname"
                        onChange={inputHandler}
                        name="fname"
                        className="form-control form-control-lg"
                        placeholder="First Name"
                      />

                      {errors.fname &&<div className="text-danger">{errors.fname}</div>}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="text"
                        id="lname"
                        onChange={inputHandler}
                        name="lname"
                        className="form-control form-control-lg"
                        placeholder="Last Name"
                      />
                       {errors.lname &&<div className="text-danger">{errors.lname}</div>}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="email"
                        name="email"
                        onChange={inputHandler}
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                       {errors.email &&<div className="text-danger">{errors.email}</div>}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={inputHandler}
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                       {errors.password &&<div className="text-danger">{errors.password}</div>}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
