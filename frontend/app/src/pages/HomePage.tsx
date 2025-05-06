import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Hero';
import FeaturesSection from '../components/Features';
import EquipmentSection from '../components/Equipment';
import LocationSection from '../components/Location';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    useEffect(() => {
        // Update document title
        document.title = "Canchas UCENIN - Reserva de Canchas de Padel";

        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => { // Pequeño delay para asegurar que el DOM está listo
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroSection/>
            <FeaturesSection />
            <EquipmentSection />
            <LocationSection />
            <Footer />
        </div>
    );
};

export default HomePage;