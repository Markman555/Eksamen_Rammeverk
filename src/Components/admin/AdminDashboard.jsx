import React, { useState } from "react";
import UserManagement from "./UserManagement";
import CVManagement from "./CVManagement";

const AdminDashboard = () => {
    const [view, setView] = useState("users"); 

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <button onClick={() => setView("users")}>Administrer brukere</button>
                <button onClick={() => setView("cvs")}>Administrer CVer</button>
            </div>

            {view === "users" ? <UserManagement /> : <CVManagement />}
        </div>
    );
};

export default AdminDashboard;
