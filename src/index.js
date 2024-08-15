import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Info from './components/information/info';
import Configuration from './components/configuration/configuration';
import Analysis from './components/analysis_results/analysis';
import Report from './components/report_a_problem/report_a_problem';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="/info" element={<Info />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
    {/* <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
