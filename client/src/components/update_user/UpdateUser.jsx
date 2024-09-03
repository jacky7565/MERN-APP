import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export let Updateuser = () => {
  let nav = useNavigate();
  const backClick = () => {
    nav("/");
  };

  let upData = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  const { id } = useParams();
  const token=localStorage.getItem("token");
  let [userData, setUserdata] = useState(upData);
  let [errors,setErrors]=useState({})
  let inputHandler = (e) => {
    let { name, value } = e.target;
    setUserdata({ ...userData, [name]: value });
    
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/getone/" + id,{headers:{Authorization:`Bearer ${token}`}})
      .then((response) => {
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
        nav("/login")
      });
  }, [id]);

  let formValidation = () => {
    let errors = {};

    if (!userData.fname) {
      errors.fname = "First name Is Required";
    }
    if (!userData.lname) {
      errors.lname = "Last Name Is Required";
    }
    if (!userData.email) {
      errors.email = "Email Is Required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "Email Not Valid";
    }
    if (!userData.password) {
      errors.password = "Password Is Required";
    }

    return errors;
  };

  let submitUpdatedata = async (e) => {
    e.preventDefault();
    let upValidation = formValidation();
    let token=localStorage.getItem("token");
    if (Object.keys(upValidation).length > 0) {
      setErrors(upValidation)
    } else {
       await axios
        .put("http://localhost:7000/api/update/" + id,userData,{headers:{Authorization:`Bearer ${token}`}})
        .then((response) => {
          toast.success("Data Update SuccessFully", { position: "top-right" });
          nav("/");
        })
        .catch((error) => {
          console.log(error);
          nav("/login")
        });
    }
  };
  //  console.log(userData)

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
                    <i class="fa fa-arrow-left"></i>
                    Back
                  </button>
                  <h2 className="text-uppercase text-center mb-3">
                    Update an account
                  </h2>
                  <hr />
                  <form onSubmit={submitUpdatedata}>
                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="text"
                        id="fname"
                        onChange={inputHandler}
                        name="fname"
                        value={userData.fname}
                        className="form-control form-control-lg"
                        placeholder="First Name"
                      />
                      {errors.fname && <div className="text-danger">{errors.fname}</div>}
                      
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="text"
                        id="lname"
                        onChange={inputHandler}
                        name="lname"
                        value={userData.lname}
                        className="form-control form-control-lg"
                        placeholder="Last Name"
                      />
                      {errors.lname && <div className="text-danger">{errors.lname}</div>}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="email"
                        name="email"
                        onChange={inputHandler}
                        id="email"
                        value={userData.email}
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={inputHandler}
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Update User
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
