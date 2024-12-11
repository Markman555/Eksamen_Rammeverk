import React, { useState } from "react";
import UserManagement from "./UserManagement";
import CVManagement from "./CVManagement";
import { logout } from "../../Context/AuthContext";

const AdminDashboard = () => {
    const [view, setView] = useState("users"); 

    return (
        <div>
            <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <button onClick={logout}>Logg ut</button>
            </div>
            <div>
                <button onClick={() => setView("users")}>Administrer brukere</button>
                <button onClick={() => setView("cvs")}>Administrer CVer</button>
            </div>

            {view === "users" ? <UserManagement /> : <CVManagement />}
        </div>
    );
};

export default AdminDashboard;
