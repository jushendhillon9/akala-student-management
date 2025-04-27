import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SimpleSidebar from './components/Sidebar.jsx';
import StudentPage from './pages/StudentPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import { StudentProvider } from './Contexts/StudentContext.jsx';
import { ChatProvider } from './Contexts/ChatContext.jsx';
import './App.css'

function App() {
  return (
    <StudentProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <SimpleSidebar />
            <Routes>
              <Route path="/" element={<StudentPage />} />
              <Route path="/students" element={<StudentPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </div>
        </Router>
      </ChatProvider>
    </StudentProvider>
  )
}

export default App
