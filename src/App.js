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
import PendingTickets from './Components/AdminDashboard/pendingtickets';
import CompleteTickets from './Components/AdminDashboard/Completedtickets'
import InCompletedTickets from'./Components/AdminDashboard/IncompletedTickets'
import AssignedTickets from './Components//AdminDashboard/AssignedTickets'
import Chart from './Components/AdminDashboard/Chart';
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
          <Route path="/pendingtickets" element={<PendingTickets />} />
          <Route path="/cticket" element={<CompleteTickets />} />
          <Route path="/incticket" element={<InCompletedTickets />} />
          <Route path="/assticket" element={<AssignedTickets />} />
          <Route path='/view'element={<Chart />}/>
          <Route path='//'element={<Land />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
