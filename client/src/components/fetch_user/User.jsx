import "./Fetch_user.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const View = () => {
  let navigate = useNavigate();
  let addClick = () => {
    navigate("/add");
  };

  let [fech, setFetch] = useState([]);

  useEffect(() => {
    let getData = async () => {
      let responseData = await axios.get("http://localhost:7000/api/getdata");
      setFetch(responseData.data);
    };
    getData();
  }, []);

  let deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (confirm) => {
      if (confirm.isConfirmed) {
        try {
          await axios.delete(`http://localhost:7000/api/delete/${id}`);
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
          // Optionally, refresh the data or update the state
          setFetch(fech.filter((user) => user._id !== id));
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "There was an error deleting your data.", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title m-b-0">User Listing</h5>
                <div id="addButton">
                  <div id="search-box"><input type="search" placeholder="Search"/></div>
                  <button  onClick={addClick}>
                    {" "}
                    <i class="fa fa-plus" aria-hidden="true"></i>  Add
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>
                        <label className="customcheckbox m-b-20">
                          <input type="checkbox" id="mainCheckbox" />
                          <span className="checkmark"></span>
                        </label>
                      </th>
                      <th scope="col">Sr No.</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Password</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="customtable">
                    {fech
                      .slice()
                      .reverse()
                        .map((val, index) => {
                          return (
                            <tr key={index}>
                              <th>
                                <label className="customcheckbox">
                                  <input
                                    type="checkbox"
                                    className="listCheckbox"
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </th>
                              <td>{index + 1}</td>
                              <td>{val.fname}</td>
                              <td>{val.lname}</td>
                              <td>{val.email}</td>
                              <td>{val.password}</td>
                              <td>
                                <Link onClick={()=>deleteUser(val._id)} style={{ color: "#C70000" }}>
                                  <i class="fa fa-trash"></i>
                                </Link>{" "}
                                |{" "}
                                <Link to={`/edit/` + val._id}>
                                  <i class="fa fa-edit"></i>
                                </Link>
                              </td>
                            </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
