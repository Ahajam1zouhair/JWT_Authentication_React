import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import {
  useGetGoalByIdMutation,
  useUpdateGoalMutation,
} from "../redux/features/goals/goalsApiSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [updateGoal] = useUpdateGoalMutation();
  const navigate = useNavigate();
  const [getGoalById, { data }] = useGetGoalByIdMutation();

  useEffect(() => {
    // Fetch goal data when component mounts
    getGoalById(id);
  }, [getGoalById, id]);

  useEffect(() => {
    // Set text when data changes
    if (data) {
      setText(data.text);
    }
  }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGoal({ id, text });
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
          label="Goal"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <MDBBtn type="submit" className="mb-4" block>
          Update Goal
        </MDBBtn>
      </form>
    </MDBContainer>
  );
}
