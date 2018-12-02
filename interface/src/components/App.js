import React from 'react';
import Topbar from './components/Topbar';
import AppRouter from './../routes';

export default function App() {
  return (
    <React.Fragment>
      <Topbar />
      <AppRouter />
    </React.Fragment>
  );
}
