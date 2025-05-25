import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx'; 
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ReservationPage from './pages/ReservationPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider> 
                <div className="app-container min-h-screen flex flex-col">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/reservation" element={<ReservationPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;