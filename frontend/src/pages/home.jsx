import {
  useDeleteGoalMutation,
  useGetGoalsQuery,
} from "../redux/features/goals/goalsApiSlice";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
function Home() {
  const { data: goals, isLoading, error, isError } = useGetGoalsQuery();
  const [deleteGoal] = useDeleteGoalMutation();
  const navgate = useNavigate();
  return (
    <div className="p-5">
      {isError && error && (
        <p style={{ color: "red" }}> {error.data.message}</p>
      )}
      <MDBBtn
        className="m-1"
        color="success"
        onClick={() => navgate("/create")}
      >
        Add Todo
        <MDBIcon far icon="plus-square" />
      </MDBBtn>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">text</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            goals &&
            goals.length &&
            goals.map((elem) => (
              <tr key={elem._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{elem._id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{elem.text}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <MDBBtn
                    rounded
                    className="mx-2"
                    color="info"
                    onClick={() => navgate(`/update/${elem._id}`)}
                  >
                    <MDBIcon fas icon="edit" />
                  </MDBBtn>
                  <MDBBtn
                    rounded
                    className="mx-2"
                    color="danger"
                    onClick={() => deleteGoal(elem._id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                </td>
              </tr>
            ))
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default Home;
