import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SimpleSidebar from './components/Sidebar.jsx';
import StudentPage from './pages/StudentPage.jsx';
import ThreadPage from './pages/ThreadPage.jsx';
import { StudentProvider } from './Contexts/StudentContext.jsx';
import { ChatProvider } from './Contexts/ChatContext.jsx';
import './App.css'

function App() {
  return (
    <StudentProvider>
      <ChatProvider>
        <Router>
          <div className="screenHeight bg-gray-100">
            <SimpleSidebar />
            <Routes>
              <Route path="/" element={<StudentPage />} />
              <Route path="/students" element={<StudentPage />} />
              <Route path="/thread/:studentId" element={<ThreadPage />} />
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </StudentProvider>
  )
}

export default App
