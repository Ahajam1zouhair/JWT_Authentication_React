import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";

// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [register, { isError, error, isLoading }] = useRegisterMutation();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
      });
      const token = response.data.token;
      const name = response.data.name;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        setUserInput({
          name: "",
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
      <h3>Create new Account</h3>
      <form onSubmit={onSubmit}>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="form3Example1"
              label="Name"
              value={userInput.name}
              required
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
            />
          </MDBCol>
        </MDBRow>
        <MDBInput
          className="mb-4"
          type="email"
          id="form3Example3"
          label="Email address"
          required
          value={userInput.email}
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form3Example4"
          label="Password"
          minLength={3}
          required
          value={userInput.password}
          onChange={(e) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
        />
        <MDBBtn type="submit" className="mb-4" block disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </MDBBtn>
      </form>
      {isError && error && (
        <p style={{ color: "red" }}> {error.data.message}</p>
      )}
    </MDBContainer>
  );
}
