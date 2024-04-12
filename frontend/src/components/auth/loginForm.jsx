import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [login, { isError, error, isLoading }] = useLoginMutation();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: userInput.email,
        password: userInput.password,
      });
      const token = response.data.token;
      const name = response.data.name;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        setUserInput({
          email: "",
          password: "",
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={onSubmit}>
        <MDBInput
          className="mb-4"
          type="email"
          id="form2Example1"
          label="Email address"
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form2Example2"
          label="Password"
          required
          onChange={(e) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
        />
        <MDBBtn type="submit" className="mb-4" block disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </MDBBtn>
        <div className="text-center">
          <p>
            Not a member?{" "}
            <a href="#!" onClick={() => navigate("/register")}>
              Register
            </a>
          </p>
        </div>
      </form>
      {isError && error && (
        <p style={{ color: "red" }}> {error.data.message}</p>
      )}
    </MDBContainer>
  );
}
