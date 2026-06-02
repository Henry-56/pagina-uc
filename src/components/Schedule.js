'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, User, Tag, MapPin, Loader } from 'lucide-react';

const WEEKS = [
    { week: 0, label: 'Semana 1', start: '2026-05-25', end: '2026-05-30', dateLabel: '25 - 30 Mayo' },
    { week: 1, label: 'Semana 2', start: '2026-06-01', end: '2026-06-06', dateLabel: '1 - 6 Junio' },
    { week: 2, label: 'Semana 3', start: '2026-06-08', end: '2026-06-13', dateLabel: '8 - 13 Junio' },
];

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAY_NAMES = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

const getFacultyColor = (career) => {
    switch (career) {
        case 'Ingeniería Industrial': return '#A78BFA';
        case 'Ingeniería Civil': return '#FB923C';
        case 'Ingeniería Ambiental': return '#34D399';
        case 'Ingeniería Eléctrica': return '#FACC15';
        case 'Ingeniería Empresarial': return '#818CF8';
        case 'Ingeniería de Sistemas e Informática': return '#22D3EE';
        default: return '#F8FAFC';
    }
};

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

const formatDateDisplay = (isoDate) => {
    const date = new Date(isoDate + 'T00:00:00');
    return `${date.getDate()} ${MONTHS[date.getMonth()]} - ${DAY_NAMES[date.getDay()]}`;
};

const getWeekIndex = (isoDate) => {
    if (!isoDate) return -1;
    for (const w of WEEKS) {
        if (isoDate >= w.start && isoDate <= w.end) return w.week;
    }
    return -1;
};

export default function Schedule() {
    const [activeWeek, setActiveWeek] = useState(0);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/events')
            .then(res => {
                if (!res.ok) throw new Error('Error fetching events');
                return res.json();
            })
            .then(data => setEvents(data))
            .catch(err => {
                setError('No se pudieron cargar los eventos');
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const weekEvents = events.filter(e => e.date && getWeekIndex(e.date) === activeWeek);

    const dayMap = {};
    for (const event of weekEvents) {
        if (!dayMap[event.date]) dayMap[event.date] = [];
        dayMap[event.date].push(event);
    }

    const days = Object.entries(dayMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, dayEvents]) => ({ date, dayEvents }));

    return (
        <section id="cronograma" className="schedule-section">
            <div className="section-header">
                <h2 className="section-title">Cronograma de Eventos</h2>
                <p className="section-subtitle">Filtra y explora las ponencias, talleres y congresos diseñados para cada facultad en esta edición 2026.</p>
            </div>

            <div className="schedule-container">
                <div className="week-tabs">
                    {WEEKS.map(w => (
                        <button
                            key={w.week}
                            className={`tab-btn ${activeWeek === w.week ? 'active' : ''}`}
                            onClick={() => setActiveWeek(w.week)}
                        >
                            <span className="tab-title">{w.label}</span>
                            <span className="tab-date">{w.dateLabel}</span>
                        </button>
                    ))}
                </div>

                <div className="schedule-content">
                    {loading ? (
                        <div className="no-events" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                            <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />
                            <p>Cargando eventos...</p>
                        </div>
                    ) : error ? (
                        <div className="no-events"><p>{error}</p></div>
                    ) : days.length === 0 ? (
                        <div className="no-events">
                            <p>No hay eventos programados para esta semana aún.</p>
                        </div>
                    ) : (
                        days.map(({ date, dayEvents }, index) => (
                            <div key={date} className="day-container" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="day-header">
                                    <CalendarDays size={28} className="icon" style={{ color: "var(--uc-gold)" }} />
                                    <h3>{formatDateDisplay(date)}</h3>
                                </div>
                                <div className="events-grid">
                                    {dayEvents.map((event) => {
                                        const facColor = getFacultyColor(event.career);
                                        const facColorRGB = getFacultyColorRGB(event.career);
                                        return (
                                            <div
                                                key={event.id}
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
