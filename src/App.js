import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import UserDashboard from './Components/UserDashboard/UserDashboard'
import RaiseTicket from './Components/UserDashboard/RaiseTicket';
import UpdateTicket from './Components/UserDashboard/UpdateTicket';
import ViewTicket from './Components/UserDashboard/ViewTicket';
import UserTable from './Components/AdminDashboard/UserTable';
import TicketTable from './Components/AdminDashboard/TicketTable';
import WorkAssignment from './Components/AdminDashboard/WorkAssigment';
import CompleteTicket from './Components/DeveloperDashboard/CompleteTicket'
import DeveloperDashboard from './Components/DeveloperDashboard/DeveloperDashboard';
import Land from './Components/Landingpage/Land';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/raise-ticket" element={<RaiseTicket/>} />
          <Route path="/editticket/:id" element={<UpdateTicket />} />
          <Route path="/viewticket/:id" element={<ViewTicket />} />
          <Route path="/usertable" element={<UserTable />}/>
          <Route path="/tickettable"element={<TicketTable/>}/>
          <Route path="/w-assign"element={<WorkAssignment />}/>
          <Route path="/dd-dashboard"element={<DeveloperDashboard/>}/>
          <Route path="/c-task/:ticketId"element={<CompleteTicket />}/>
          <Route path='//'element={<Land />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
