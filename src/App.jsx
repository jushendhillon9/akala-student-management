import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SimpleSidebar from './components/Sidebar.jsx';
import StudentPage from './pages/StudentPage.jsx';
import ThreadPage from './pages/ThreadPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { StudentProvider } from './Contexts/StudentContext.jsx';
import { ChatProvider } from './Contexts/ChatContext.jsx';
import './App.css';

function MainContent() {
  const location = useLocation();
  
  const getScreenClass = () => {
    if (location.pathname === '/' || location.pathname.startsWith('/thread/')) {
      return 'screenHeightTwo';
    }
    return 'screenHeight';
  };

  return (
    <div className={getScreenClass()}>
      <SimpleSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/thread/:studentId" element={<ThreadPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <ChatProvider>
        <Router>
          <MainContent />
        </Router>
      </ChatProvider>
    </StudentProvider>
  );
}

export default App;