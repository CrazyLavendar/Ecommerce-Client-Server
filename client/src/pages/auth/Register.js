import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify"; //refer docs
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => {
    return { ...state };
  });

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]); // user as dependency
  const config = {
    url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    handleCodeInApp: true,
  };
  const handleSubmit = async (e) => {
    //
    e.preventDefault(); // preventing browser from reload
    // console.log("Env --> ", process.env.REACT_APP_REGISTER_REDIRECT_URL);

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );

    //save user email in local storage - Redoing again without asking email again

    window.localStorage.setItem("emailForRegistration", email);

    //clear state

    setEmail("");
    history.push("/login");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        placeholder="Your Email"
        // onChange={(e) => console.log(e.target.value)} // for debugging
        onChange={(e) => setEmail(e.target.value)} // change state
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
