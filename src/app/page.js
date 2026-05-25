'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, CalendarDays, Users, MonitorPlay, Globe } from 'lucide-react';
import Schedule from '@/components/Schedule';
import Image from 'next/image';

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main>
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="logo">
                        <img
                            src="https://ucontinental.edu.pe/site/wp-content/themes/salient-child/img/logo.svg"
                            alt="Universidad Continental"
                            className="logo-img"
                        />
                        <span className="event-name">Semana de Ingeniería</span>
                    </div>
                    <div className="nav-links">
                        <a href="#inicio" className="active">Inicio</a>
                        <a href="#cronograma">Cronograma</a>
                        <a href="#acerca">Acerca</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="inicio" className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="badge">Edición 2026</span>
                        <h1 className="hero-title">
                            Tu camino hacia el <span className="text-gold">futuro tecnológico</span>
                        </h1>
                        <p className="hero-subtitle">
                            Participa en la Semana de Ingeniería 2026. Tres semanas de ponencias magistrales, talleres y congresos diseñados para potenciar tus habilidades y conectarte con la industria.
                        </p>
                        <div className="hero-actions">
                            <a href="#cronograma" className="btn btn-primary">
                                Ver Cronograma
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                            <Image 
                                src="/campus_students.png" 
                                alt="Estudiantes en el campus"
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                </div>
                
                {/* SVG Curve inspired by UC Official Site */}
                <div className="curve-divider">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.24V0Z" opacity=".5" className="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section id="acerca" className="features-wrapper" style={{ position: 'relative', zIndex: 10, padding: '0 24px' }}>
                <div className="features-section">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Globe size={32} />
                            </div>
                            <div className="feature-text">
                                <h4>Visión Internacional</h4>
                                <p>Ponencias con enfoque global y visión a futuro para estar a la vanguardia de las tecnologías internacionales.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <MonitorPlay size={32} />
                            </div>
                            <div className="feature-text">
                                <h4>Modalidad Híbrida</h4>
                                <p>Conéctate desde cualquier lugar o asiste a los talleres presenciales en nuestros diversos campus equipados.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Users size={32} />
                            </div>
                            <div className="feature-text">
                                <h4>Networking</h4>
                                <p>Conecta con expertos de la industria, egresados destacados y compañeros de todas las ramas de la ingeniería.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule Data */}
            <Schedule />

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <div className="footer-logo">
                        <img
                            src="https://ucontinental.edu.pe/site/wp-content/themes/salient-child/img/logo.svg"
                            alt="Universidad Continental"
                            className="footer-logo-img"
                        />
                    </div>
                    <p className="footer-text">© 2026 Semana de Ingeniería. Todos los derechos reservados.</p>
                    <p className="footer-text" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Plataforma desarrollada para eventos académicos de ingeniería.</p>
                </div>
            </footer>
        </main>
    );
}
