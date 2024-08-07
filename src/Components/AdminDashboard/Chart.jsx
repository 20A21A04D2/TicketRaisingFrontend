import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  BubbleController
} from 'chart.js';
import './Chart.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  BubbleController
);

const Chart = () => {
  const [data, setData] = useState({
    userCount: 0,
    ticketCount: 0,
    pendingTicketCount: 0,
    completedTicketCount: 0,
    developerCount: 0,
    workAssignmentCount: 0,
    assignmentCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/user-count');
        const userCountData = await userCountResponse.json();

        const ticketCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/ticket-count');
        const ticketCountData = await ticketCountResponse.json();

        const pendingTicketCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/pending-ticket-count');
        const pendingTicketCountData = await pendingTicketCountResponse.json();

        const completedTicketCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/completed-ticket-count');
        const completedTicketCountData = await completedTicketCountResponse.json();

        const developerCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/d-count');
        const developerCountData = await developerCountResponse.json();

        const workAssignmentCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/work-assignment-count');
        const workAssignmentCountData = await workAssignmentCountResponse.json();

        const assignmentCountResponse = await fetch('https://ticketraisingbackend.onrender.com/api/assignment-count');
        const assignmentCountData = await assignmentCountResponse.json();

        setData({
          userCount: userCountData.count,
          ticketCount: ticketCountData.count,
          pendingTicketCount: pendingTicketCountData.count,
          completedTicketCount: completedTicketCountData.count,
          developerCount: developerCountData.count,
          workAssignmentCount: workAssignmentCountData.count,
          assignmentCount: assignmentCountData.count
        });
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ['Users', 'Tickets', 'Pending Tickets', 'Completed Tickets', 'Developers', 'Work Assignments', 'Assignments'],
    datasets: [
      {
        label: 'Count',
        data: [
          data.userCount,
          data.ticketCount,
          data.pendingTicketCount,
          data.completedTicketCount,
          data.developerCount,
          data.workAssignmentCount,
          data.assignmentCount
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieData = {
    labels: ['Users', 'Tickets', 'Pending Tickets', 'Completed Tickets', 'Developers', 'Work Assignments', 'Assignments'],
    datasets: [
      {
        data: [
          data.userCount,
          data.ticketCount,
          data.pendingTicketCount,
          data.completedTicketCount,
          data.developerCount,
          data.workAssignmentCount,
          data.assignmentCount
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
          '#FF6F61',
          '#DCE775'
        ],
        hoverOffset: 4
      }
    ]
  };


  const lineData = {
    labels: ['Users', 'Tickets', 'Pending Tickets', 'Completed Tickets', 'Developers', 'Work Assignments', 'Assignments'],
    datasets: [
      {
        label: 'Count',
        data: [
          data.userCount,
          data.ticketCount,
          data.pendingTicketCount,
          data.completedTicketCount,
          data.developerCount,
          data.workAssignmentCount,
          data.assignmentCount
        ],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  };


  const bubbleData = {
    datasets: [
      {
        label: 'Counts',
        data: [
          { x: 1, y: data.userCount, r: 10 },
          { x: 2, y: data.ticketCount, r: 20 },
          { x: 3, y: data.pendingTicketCount, r: 30 },
          { x: 4, y: data.completedTicketCount, r: 40 },
          { x: 5, y: data.developerCount, r: 50 },
          { x: 6, y: data.workAssignmentCount, r: 60 },
          { x: 7, y: data.assignmentCount, r: 70 }
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Charts</h1>
      <div className="chart-container">
        <div className="chart-card">
          <h3>Bar Chart</h3>
          <Bar data={barData} />
        </div>
        <div className="pie-chart-container">
          <h3>Pie Chart</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-card">
          <h3>Line Chart</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-card">
          <h3>Bubble Chart</h3>
          <Bubble data={bubbleData} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
