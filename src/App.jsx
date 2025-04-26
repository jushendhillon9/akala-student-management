import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import SimpleSidebar from './components/Sidebar.jsx';
import StudentPage from './pages/StudentPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import './App.css'

function App() {
  return (
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
  )
}

export default App
