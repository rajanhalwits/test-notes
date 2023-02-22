import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './component/login';
import List from './component/list';
import { Provider } from 'react-redux';
import store from './store'

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className='container-fluid'>
        <Routes>
          <Route path="/list" element={<List/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
