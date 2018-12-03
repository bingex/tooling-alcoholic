import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div>
      <Link to="/">Homepage</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}