import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Equipment from './components/Equipment';
import Location from './components/Location';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Update document title
    document.title = "Canchas UCENIN - Reserva de Canchas de Padel";
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Equipment />
      <Location />
      <Footer />
    </div>
  );
}

export default App;