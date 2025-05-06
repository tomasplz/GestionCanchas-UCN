import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ReservationPage from './pages/ReservationPage';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container min-h-screen flex flex-col">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/reservar" element={<ReservationPage />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;