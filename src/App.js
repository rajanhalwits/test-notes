import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './component/login';
import List from './component/list';

function App() {
  return (
    <>
    <Router>
      <div className='container-fluid'>
        
        <Routes>
          <Route path="/list" element={<List/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
