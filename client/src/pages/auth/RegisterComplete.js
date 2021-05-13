import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify"; //refer docs
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  // history can redirect other. But registerComplete should be one of the routing path
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // console.log(window, localStorage.getItem("emailForRegistration"));
    //   setEmail("vejifjdif");
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    //
    e.preventDefault(); // preventing browser from reload

    // validation
    if (!email || !password) {
      toast.error("Email and Password  is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password  must be atleast 6 characters");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log(result);
      if (result.user.emailVerified) {
        // remove user from local Storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password); // changes default to currently typed password
        const idTokenResult = await user.getIdTokenResult();
        //redux store
        console.log("user", user, "idTOkenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => {
            //
            console.log(error);
          });

        // redirect
        history.push("/");
      }
      toast.success("Your email has been added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />

      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
