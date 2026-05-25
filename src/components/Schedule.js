'use client';

import { useState } from 'react';
import { CalendarDays, User, Tag, MapPin } from 'lucide-react';

const scheduleData = [
    {
        week: 0,
        days: [
            {
                date: "25 Mayo - LUNES",
                events: [
                    { time: "09:30 a.m. - 11:00 a.m.", title: "La IA como aliado de la Investigación de Operaciones", speaker: "Ing. Christian Rojas Romero", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "11:30 a.m. - 01:00 p.m.", title: "IA y Gestión de Productos", speaker: "Dr. Juana Gabriela Mendoza Ponce", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "03:30 p.m. - 05:00 p.m.", title: "IA generativa en operaciones: el fin de Excel como centro de decisión", speaker: "Dr. Aizar Mejia Jalabe", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "05:30 p.m. - 07:00 p.m.", title: "De la IA al piso de producción: Cómo convertir algoritmos en resultados reales", speaker: "Dr. Dora Luz Quevedo", type: "Virtual", career: "Ingeniería Industrial" }
                ]
            },
            {
                date: "26 Mayo - MARTES",
                events: [
                    { time: "09:30 a.m. - 11:00 a.m.", title: "Inteligencia Artificial aplicada a la optimización de inventarios en la era digital", speaker: "Dr. Mario Morales Rodriguez", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "11:30 a.m. - 01:00 p.m.", title: "El ingeniero que aún no existe: como diseñar hoy con IA y Backcasting", speaker: "Dr. Cesar A. Arguello", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "03:30 p.m. - 05:00 p.m.", title: "Optimización de Procesos de Manufactura mediante Inteligencia Artificial: De los Datos a la Decisión Operativa", speaker: "Ing. Jesus Burgos Quiroz", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "05:30 p.m. - 07:00 p.m.", title: "NotebookLm: El copiloto de estudios basado en fuentes reales", speaker: "Ing. Miguel Cárdenas Agreda", type: "Virtual", career: "Ingeniería Industrial" }
                ]
            },
            {
                date: "27 Mayo - MIÉRCOLES",
                events: [
                    { time: "09:30 a.m. - 11:00 a.m.", title: "Transformación Industrial: un primer vistazo entre robótica y manufactura inteligente", speaker: "Dr. Roberto Angel Melendez Armenta", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "11:30 a.m. - 01:00 p.m.", title: "IA en la gestión estratégica de abastecimiento: Optimización predictiva de Cadenas de Suministros", speaker: "Ing. Denisse Mendoza Perez", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "03:30 p.m. - 05:00 p.m.", title: "Integración de tecnologías 4.0 aplicado en industria 5.0 con IA", speaker: "Dr. José Cervantes León", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "05:30 p.m. - 07:00 p.m.", title: "Manufactura inteligente: Optimización de Procesos textiles mediante IA", speaker: "Ing. German Perez Espinoza", type: "Virtual", career: "Ingeniería Industrial" }
                ]
            },
            {
                date: "28 Mayo - JUEVES",
                events: [
                    { time: "09:30 a.m. - 11:00 a.m.", title: "De los algoritmos a la realidad: cómo la Inteligencia Artificial esta redefiniendo la industria, las decisiones y el futuro del trabajo", speaker: "Ma. Vianey Cruz Sustaita", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "11:30 a.m. - 01:00 p.m.", title: "Inteligencia Artificial, Tecnoestrés y Burnout", speaker: "Mg. Giovanni Luna Chontal", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "03:30 p.m. - 05:00 p.m.", title: "Tipología de apropiación de herramientas de inteligencia artificial entre estudiantes", speaker: "Dr. Consuelo Lemus Pool", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "05:30 p.m. - 07:00 p.m.", title: "Integración de Análitica Prescriptivaen ecosistemas IoT de Gran escala", speaker: "Msc. Gisela Ramirez Pimentel", type: "Virtual", career: "Ingeniería Industrial" }
                ]
            },
            {
                date: "29 Mayo - VIERNES",
                events: [
                    { time: "09:30 a.m. - 11:00 a.m.", title: "IA en Marketing", speaker: "Ing. Vivian Paola Picalua", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "11:30 a.m. - 01:00 p.m.", title: "Manufactura Inteligente con Machine Learning e IoT para la industria del futuro", speaker: "Dr. José Velásquez Costa", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "03:30 p.m. - 05:00 p.m.", title: "Programación 2.0: Redefiniendo en pensamiento computacional en la era de la IA", speaker: "Ing. Felipe Perez", type: "Virtual", career: "Ingeniería Industrial" },
                    { time: "05:30 p.m. - 07:00 p.m.", title: "Inteligencia de Mercados y analítica de datos: Fundamentos para la toma de decisiones estratégicas", speaker: "Ms. Eduardo Parraga Baquerizo", type: "Virtual", career: "Ingeniería Industrial" }
                ]
            }
        ]
    },
    {
        week: 1,
        days: [
            {
                date: "1 Junio - LUNES",
                events: [
                    { time: "09:00 a.m. - 01:00 p.m.", title: "VI Civil Week", speaker: "P.A Ing. Civil", type: "Presencial", career: "Ingeniería Civil" },
                    { time: "03:30 p.m. - 05:00 p.m.", title: "Programación de Arduino con IA", speaker: "Ing. Kenneth Quispe e Ing. Camilo Raymundo", type: "Presencial: Wichay", career: "Ingeniería Industrial" },
                    { time: "04:00 p.m. - 05:00 p.m.", title: "PA Ing Sistemas e Informática", speaker: "Varios", type: "Híbrido", career: "Ingeniería de Sistemas e Informática" }
                ]
            },
            {
                date: "2 Junio - MARTES",
                events: [
                    { time: "09:00 a.m. - 01:00 p.m.", title: "VI Civil Week", speaker: "P.A Ing. Civil", type: "Presencial", career: "Ingeniería Civil" }
                ]
            },
            {
                date: "3 Junio - MIÉRCOLES",
                events: [
                    { time: "09:00 a.m. - 01:00 p.m.", title: "VI Civil Week", speaker: "P.A Ing. Civil", type: "Presencial", career: "Ingeniería Civil" },
                    { time: "06:00 p.m. - 07:00 p.m.", title: "Gestión Ambiental Aplicada: Retos, Herramientas y Soluciones para el Ejercicio Profesional", speaker: "Ing. Giovanna Lázaro Espinoza", type: "Presencial", career: "Ingeniería Eléctrica" }
                ]
            },
            {
                date: "4 Junio - JUEVES",
                events: [
                    { time: "09:00 a.m. - 01:00 p.m.", title: "VI Civil Week", speaker: "P.A Ing. Civil", type: "Presencial", career: "Ingeniería Civil" }
                ]
            },
            {
                date: "5 Junio - VIERNES",
                events: [
                    { time: "09:00 a.m. - 01:00 p.m.", title: "VI Civil Week", speaker: "P.A Ing. Civil", type: "Presencial", career: "Ingeniería Civil" },
                    { time: "03:00 p.m. - 03:40 p.m.", title: "Retos de la inteligencia artificial aplicado a la ingeniería ambiental", speaker: "Ing. José David Romero", type: "Presencial", career: "Ingeniería Ambiental" },
                    { time: "03:40 p.m. - 04:20 p.m.", title: "Ponencia Presencial Ambiental", speaker: "Representante del Consejo de Ministros", type: "Presencial", career: "Ingeniería Ambiental" },
                    { time: "04:20 p.m. - 05:20 p.m.", title: "Talleres Simultáneos: SIGERSOL, Monitoreo Ambiental, Huella de Carbono", speaker: "Ing. Ymelda Montoro, Ing. Juan Delgado, Ing. Hugo Madrid", type: "Presencial", career: "Ingeniería Ambiental" },
                    { time: "05:20 p.m. - 06:00 p.m.", title: "Taller de IPERC", speaker: "Ing. Giovanna Lázaro", type: "Presencial", career: "Ingeniería Ambiental" }
                ]
            },
            {
                date: "6 Junio - SÁBADO",
                events: [
                    { time: "09:00 a.m. - 11:00 a.m.", title: "PA Ing Sistemas e Informática", speaker: "Varios", type: "Híbrido", career: "Ingeniería de Sistemas e Informática" }
                ]
            }
        ]
    },
    {
        week: 2,
        days: [
            {
                date: "10 Junio - MIÉRCOLES",
                events: [
                    { time: "07:00 p.m. - 08:00 p.m.", title: "Supervision o fiscalización Del sub sector de electricidad.", speaker: "Ing. Elmer Pizarro Rimari", type: "Presencial", career: "Ingeniería Eléctrica" }
                ]
            },
            {
                date: "11 Junio - JUEVES",
                events: [
                    { time: "09:00 a.m. - 06:00 p.m.", title: "Inicio del 4to Encuentro del Ecosistema Empresarial", speaker: "Varios", type: "Presencial", career: "Ingeniería Empresarial" },
                    { time: "07:00 p.m. - 08:00 p.m.", title: "Gestión Segura de Trabajos en Altura: Prevención, Control y Toma de Decisiones", speaker: "Ing. Luis Manuel Igreda Quintana", type: "Presencial", career: "Ingeniería Eléctrica" }
                ]
            },
            {
                date: "12 Junio - VIERNES",
                events: [
                    { time: "09:00 a.m. - 02:00 p.m.", title: "Hackaton - Ing. Empresarial", speaker: "Varios", type: "Presencial", career: "Ingeniería Empresarial" },
                    { time: "06:00 p.m. - 07:00 p.m.", title: "Impacto de la Movilidad Eléctrica sobre las Redes de Distribución", speaker: "Ing. Fredy Paucar Condori", type: "Presencial", career: "Ingeniería Eléctrica" },
                    { time: "Desde las 06:00 p.m.", title: "Congreso - Ing. Empresarial", speaker: "Varios", type: "Virtual", career: "Ingeniería Empresarial" }
                ]
            },
            {
                date: "13 Junio - SÁBADO",
                events: [
                    { time: "09:00 a.m. - 02:00 p.m.", title: "Congreso - Ing. Empresarial", speaker: "Varios", type: "Presencial", career: "Ingeniería Empresarial" },
                    { time: "10:00 a.m. - 11:00 a.m.", title: "Impacto para el desarrollo de la actividad productiva en zonas rurales de la Región Huancavelica", speaker: "Ing. Romeo Rojas Bravo", type: "Presencial", career: "Ingeniería Eléctrica" }
                ]
            }
        ]
    }
];

// Helper to assign a specific professional color to each faculty
const getFacultyColor = (career) => {
    switch (career) {
        case 'Ingeniería Industrial': return '#A78BFA'; // Purple
        case 'Ingeniería Civil': return '#FB923C'; // Orange
        case 'Ingeniería Ambiental': return '#34D399'; // Green
        case 'Ingeniería Eléctrica': return '#FACC15'; // Yellow
        case 'Ingeniería Empresarial': return '#818CF8'; // Indigo
        case 'Ingeniería de Sistemas e Informática': return '#22D3EE'; // Cyan
        default: return '#F8FAFC'; // Default White
    }
};

// Convert hex to rgb for opacity handling safely
const getFacultyColorRGB = (career) => {
    switch (career) {
        case 'Ingeniería Industrial': return '167, 139, 250';
        case 'Ingeniería Civil': return '251, 146, 60';
        case 'Ingeniería Ambiental': return '52, 211, 153';
        case 'Ingeniería Eléctrica': return '250, 204, 21';
        case 'Ingeniería Empresarial': return '129, 140, 248';
        case 'Ingeniería de Sistemas e Informática': return '34, 211, 238';
        default: return '248, 250, 252';
    }
};

export default function Schedule() {
    const [activeWeek, setActiveWeek] = useState(0);

    const weekData = scheduleData.find(w => w.week === activeWeek);

    return (
        <section id="cronograma" className="schedule-section">
            <div className="section-header">
                <h2 className="section-title">Cronograma de Eventos</h2>
                <p className="section-subtitle">Filtra y explora las ponencias, talleres y congresos diseñados para cada facultad en esta edición 2026.</p>
            </div>

            <div className="schedule-container">
                {/* Week Selector */}
                <div className="week-tabs">
                    <button 
                        className={`tab-btn ${activeWeek === 0 ? 'active' : ''}`}
                        onClick={() => setActiveWeek(0)}
                    >
                        <span className="tab-title">Semana 1</span>
                        <span className="tab-date">25 - 30 Mayo</span>
                    </button>
                    <button 
                        className={`tab-btn ${activeWeek === 1 ? 'active' : ''}`}
                        onClick={() => setActiveWeek(1)}
                    >
                        <span className="tab-title">Semana 2</span>
                        <span className="tab-date">1 - 6 Junio</span>
                    </button>
                    <button 
                        className={`tab-btn ${activeWeek === 2 ? 'active' : ''}`}
                        onClick={() => setActiveWeek(2)}
                    >
                        <span className="tab-title">Semana 3</span>
                        <span className="tab-date">8 - 13 Junio</span>
                    </button>
                </div>

                {/* Schedule Content */}
                <div className="schedule-content">
                    {(!weekData || weekData.days.length === 0) ? (
                        <div className="no-events">
                            <p>No hay eventos programados para esta semana aún.</p>
                        </div>
                    ) : (
                        weekData.days.map((day, index) => (
                            <div key={index} className="day-container" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="day-header">
                                    <CalendarDays size={28} className="icon" style={{ color: "var(--uc-gold)" }} />
                                    <h3>{day.date}</h3>
                                </div>
                                <div className="events-grid">
                                    {day.events.map((event, eIndex) => {
                                        const facColor = getFacultyColor(event.career);
                                        const facColorRGB = getFacultyColorRGB(event.career);
                                        
                                        return (
                                            <div 
                                                key={eIndex} 
                                                className="event-card"
                                                style={{ 
                                                    '--fac-color': facColor, 
                                                    '--fac-bg': `rgba(${facColorRGB}, 0.1)`, 
                                                    '--fac-border': `rgba(${facColorRGB}, 0.2)` 
                                                }}
                                            >
                                                <span className="event-time" style={{ color: facColor }}>{event.time}</span>
                                                <h4 className="event-title">{event.title}</h4>
                                                <div className="event-meta">
                                                    <div className="meta-item">
                                                        <User size={16} className="icon" />
                                                        <span>{event.speaker}</span>
                                                    </div>
                                                    <div className="event-badges">
                                                        <span className="badge-tag badge-career">
                                                            <Tag size={12} />
                                                            {event.career}
                                                        </span>
                                                        <span className="badge-tag badge-type">
                                                            <MapPin size={12} />
                                                            {event.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
