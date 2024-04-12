import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { useState } from "react";
import { useCreateGoalMutation } from "../redux/features/goals/goalsApiSlice";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [text, setText] = useState("");
  const [createGoal] = useCreateGoalMutation();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      createGoal({ text });
      setText("");
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
          type="text"
          id="form2Example1"
          label="Gaol"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <MDBBtn type="submit" className="mb-4" block>
          Create Gaol
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}
