import React, { useEffect, useState } from "react";
import AdminSideNav from "../../components/admin/AdminSideNav";
import AdminDashboard from "../../components/admin/AdminDashboard";
import NavBar from "../../components/admin/NavBar";
import { useDispatch } from "react-redux";
import { fetchNewUsersAndTrainers } from "../../redux/admin/adminThunk";
import PieChartComponent from "../../components/admin/PieChartComponent";

function AdminConsole() {
  const [newUsers, setNewUsers] = useState([]);
  const [newTrainers, setNewTrainers] = useState([]);
  const [trainerCount, setTrainersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewUsersAndTrainers()).then((res) => {
      setNewTrainers(res.payload.trainers);
      setNewUsers(res.payload.users);
      setTrainersCount(res.payload.trainerCount);
      setUsersCount(res.payload.userCount);
      setRevenue(res.payload.totalWallet);
      console.log(res.payload);
    });
  }, [dispatch]);

  return (
    <div className="admin-console d-flex vh-100"> 
      <AdminSideNav />
      <div className="flex-grow-1 d-flex flex-column">
        <NavBar />
        <h4 className="text-white m-3">Hi, Welcome back</h4>

        <div className="flex-grow-1 overflow-auto">
          <div className="w-100 d-flex flex-row">
            <div
              className="flex-grow-1 p-4"
              style={{ backgroundColor: "#212529" }}
            >
              <AdminDashboard />
            </div>

            <div className="d-flex flex-column p-4" style={{ width: "40%" }}>
              <div
                className="p-2"
                style={{ backgroundColor: "#343a40" }}
              >
                <div className="row">
                  <div className="col-6">
                    <h5 className="text-white">New Trainers</h5>
                  </div>
                  <div className="col-6">
                    <h5 className="text-white">New Customers</h5>
                  </div>
                </div>
              </div>

              <div
                className="p-2 mb-4"
                style={{ backgroundColor: "#343a40", borderRadius: "5px" }}
              >
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      {newTrainers.map((trainer) => (
                        <div
                          key={trainer.trainerId}
                          className="bg-dark text-white p-2 mb-2"
                          style={{ borderRadius: "5px" }}
                        >
                          {trainer.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex flex-column">
                      {newUsers.map((user) => (
                        <div
                          key={user.userId}
                          className="bg-dark text-white p-2 mb-2"
                          style={{ borderRadius: "5px" }}
                        >
                          {user.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-4"
                style={{ backgroundColor: "#343a40", borderRadius: "5px" }}
              >
                <h5 className="text-white">Summary</h5>
                <PieChartComponent usersCount={usersCount} trainerCount={trainerCount} revenue={revenue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminConsole;
