import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const DashboardPage = () => (
  <div>
    Dashboard page content 2
    <Link to="/chat">Chat</Link>
  </div>
);

export default DashboardPage;
