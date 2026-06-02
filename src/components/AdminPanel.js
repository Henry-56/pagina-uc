'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, X, Save, Loader, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import styles from './AdminPanel.module.css';

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAY_LABELS = ['L','M','M','J','V','S','D'];

function CalendarFilter({ events, selectedDate, onSelectDate }) {
    const [viewDate, setViewDate] = useState(new Date(2026, 4, 1)); // Mayo 2026

    useEffect(() => {
        const dates = events.map(e => e.date).filter(Boolean).sort();
        if (dates.length > 0) {
            const [y, m] = dates[0].split('-').map(Number);
            setViewDate(new Date(y, m - 1, 1));
        }
    }, [events.length]);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay + 6) % 7; // lunes primero

    const eventDates = new Set(events.map(e => e.date).filter(Boolean));

    const toISO = (d) =>
        `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    const cells = [
        ...Array(startOffset).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
        <div className={styles.calendar}>
            <div className={styles.calHeader}>
                <button
                    className={styles.calNav}
                    onClick={() => setViewDate(new Date(year, month - 1, 1))}
                >
                    <ChevronLeft size={15} />
                </button>
                <span className={styles.calTitle}>{MONTH_NAMES[month]} {year}</span>
                <button
                    className={styles.calNav}
                    onClick={() => setViewDate(new Date(year, month + 1, 1))}
                >
                    <ChevronRight size={15} />
                </button>
            </div>

            <div className={styles.calGrid}>
                {DAY_LABELS.map((label, i) => (
                    <div key={i} className={styles.calDayLabel}>{label}</div>
                ))}
                {cells.map((day, i) => {
                    if (!day) return <div key={`g-${i}`} />;
                    const iso = toISO(day);
                    const hasEvent = eventDates.has(iso);
                    const isSelected = selectedDate === iso;
                    return (
                        <button
                            key={iso}
                            onClick={() => onSelectDate(isSelected ? null : iso)}
                            className={[
                                styles.calDay,
                                hasEvent ? styles.calDayEvent : '',
                                isSelected ? styles.calDaySelected : '',
                            ].filter(Boolean).join(' ')}
                        >
                            <span>{day}</span>
                            {hasEvent && <span className={styles.calDot} />}
                        </button>
                    );
                })}
            </div>

            {selectedDate && (
                <button className={styles.calClearBtn} onClick={() => onSelectDate(null)}>
                    <X size={12} /> Ver todos los eventos
                </button>
            )}
        </div>
    );
}

export default function AdminPanel() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        date: '', time: '', title: '', speaker: '', type: 'Virtual', career: '', meetLink: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => { fetchEvents(); }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/events');
            if (!res.ok) throw new Error('Error fetching events');
            setEvents(await res.json());
            setError(null);
        } catch (err) {
            setError('Error cargando los eventos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddEvent = async () => {
        if (!formData.time || !formData.title || !formData.speaker || !formData.career) {
            setError('Por favor completa todos los campos obligatorios');
            return;
        }
        try {
            setSubmitting(true);
            setError(null);
            if (editingId) {
                const res = await fetch(`/api/events/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (!res.ok) throw new Error('Error updating event');
                setSuccess('Evento actualizado exitosamente');
                setEditingId(null);
            } else {
                const res = await fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (!res.ok) throw new Error('Error creating event');
                setSuccess('Evento creado exitosamente');
            }
            await fetchEvents();
            setFormData({ date: '', time: '', title: '', speaker: '', type: 'Virtual', career: '', meetLink: '' });
            setShowForm(false);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message || 'Error al procesar el evento');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditEvent = (event) => {
        setFormData({
            date: event.date || '', time: event.time, title: event.title,
            speaker: event.speaker, type: event.type, career: event.career, meetLink: event.meetLink || '',
        });
        setEditingId(event.id);
        setShowForm(true);
        setError(null);
    };

    const handleDeleteEvent = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) return;
        try {
            setSubmitting(true);
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error deleting event');
            setSuccess('Evento eliminado exitosamente');
            await fetchEvents();
            setTimeout(() => setSuccess(null), 3000);
        } catch {
            setError('Error al eliminar el evento');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ date: '', time: '', title: '', speaker: '', type: 'Virtual', career: '', meetLink: '' });
        setError(null);
    };

    const displayedEvents = selectedDate
        ? events.filter(e => e.date === selectedDate)
        : events;

    const formatDateBanner = (iso) => {
        const [y, m, d] = iso.split('-').map(Number);
        return `${d} de ${MONTH_NAMES[m - 1]}, ${y}`;
    };

    return (
        <div className={styles.adminPanel}>
            <div className={styles.header}>
                <h2>Panel Admin — Gestión de Eventos</h2>
                {!showForm && (
                    <button className={styles.btnAdd} onClick={() => setShowForm(true)} disabled={submitting}>
                        <Plus size={20} /> Nuevo Evento
                    </button>
                )}
            </div>

            {error && (
                <div className={styles.alert} style={{ background: '#FEE2E2', borderColor: '#EF4444', color: '#DC2626' }}>
                    {error}
                </div>
            )}
            {success && (
                <div className={styles.alert} style={{ background: '#D1FAE5', borderColor: '#10B981', color: '#059669' }}>
                    {success}
                </div>
            )}

            {showForm && (
                <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                        <h3>{editingId ? 'Editar Evento' : 'Crear Nuevo Evento'}</h3>
                        <button className={styles.btnClose} onClick={handleCloseForm} disabled={submitting}>
                            <X size={24} />
                        </button>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Fecha</label>
                            <input type="date" name="date" value={formData.date} onChange={handleInputChange} disabled={submitting} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Hora *</label>
                            <input type="text" name="time" placeholder="Ej: 09:30 a.m. - 11:00 a.m." value={formData.time} onChange={handleInputChange} disabled={submitting} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Título *</label>
                            <input type="text" name="title" placeholder="Título de la charla/taller" value={formData.title} onChange={handleInputChange} disabled={submitting} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Profesor/Expositor *</label>
                            <input type="text" name="speaker" placeholder="Nombre del profesor" value={formData.speaker} onChange={handleInputChange} disabled={submitting} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Carrera *</label>
                            <input type="text" name="career" placeholder="Ingeniería Industrial" value={formData.career} onChange={handleInputChange} disabled={submitting} />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Modalidad</label>
                            <select name="type" value={formData.type} onChange={handleInputChange} disabled={submitting}>
                                <option value="Virtual">Virtual</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Híbrido">Híbrido</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Enlace Meet (si es Virtual)</label>
                            <input type="url" name="meetLink" placeholder="https://meet.google.com/..." value={formData.meetLink} onChange={handleInputChange} disabled={submitting} />
                        </div>
                        <div className={styles.formActions}>
                            <button type="button" className={styles.btnSave} onClick={handleAddEvent} disabled={submitting}>
                                {submitting ? <Loader size={18} className={styles.spinner} /> : <Save size={18} />}
                                {editingId ? 'Actualizar' : 'Crear'} Evento
                            </button>
                            <button type="button" className={styles.btnCancel} onClick={handleCloseForm} disabled={submitting}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.calendarEventsLayout}>
                <CalendarFilter
                    events={events}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                />

                <div className={styles.eventsPane}>
                    {selectedDate && (
                        <div className={styles.filterBanner}>
                            <CalendarDays size={15} />
                            <span>{formatDateBanner(selectedDate)}</span>
                            <span className={styles.filterCount}>{displayedEvents.length} evento{displayedEvents.length !== 1 ? 's' : ''}</span>
                        </div>
                    )}

                    <div className={styles.eventsList}>
                        {loading ? (
                            <div className={styles.loadingState}>
                                <Loader size={32} className={styles.spinner} />
                                <p>Cargando eventos...</p>
                            </div>
                        ) : displayedEvents.length === 0 ? (
                            <p className={styles.emptyState}>
                                {selectedDate ? 'No hay eventos para esta fecha.' : 'No hay eventos registrados. Crea uno nuevo.'}
                            </p>
                        ) : (
                            displayedEvents.map(event => (
                                <div key={event.id} className={styles.eventCard}>
                                    <div className={styles.eventContent}>
                                        <div className={styles.eventMeta}>
                                            {event.date && <span className={styles.date}>{event.date}</span>}
                                            <span className={styles.time}>{event.time}</span>
                                            <span className={`${styles.type} ${styles[event.type.toLowerCase()]}`}>
                                                {event.type}
                                            </span>
                                        </div>
                                        <h4 className={styles.title}>{event.title}</h4>
                                        <p className={styles.speaker}><strong>Profesor:</strong> {event.speaker}</p>
                                        <p className={styles.career}><strong>Carrera:</strong> {event.career}</p>
                                        {event.meetLink && (
                                            <p className={styles.meetLink}>
                                                <strong>Meet:</strong>{' '}
                                                <a href={event.meetLink} target="_blank" rel="noopener noreferrer">{event.meetLink}</a>
                                            </p>
                                        )}
                                    </div>
                                    <div className={styles.eventActions}>
                                        <button className={styles.btnEdit} onClick={() => handleEditEvent(event)} disabled={submitting} title="Editar">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className={styles.btnDelete} onClick={() => handleDeleteEvent(event.id)} disabled={submitting} title="Eliminar">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
