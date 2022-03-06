import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Landing from './components/layouts/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import Dashboard from './views/Dashboard';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/login' element={<Auth authRoute="login" />} />
            <Route path='/register' element={<Auth authRoute="register" />} />
            <Route path='/dashboard' element={<ProtectedRoute component={Dashboard}/>}/>
            <Route path='/about' element={<ProtectedRoute component={About}/>}/>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
