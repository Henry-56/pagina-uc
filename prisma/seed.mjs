import dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('ERROR: DATABASE_URL no encontrado en .env.local ni .env');
    process.exit(1);
}

const pool = new Pool({ connectionString });
const db = new PrismaClient({ adapter: new PrismaPg(pool) });

const events = [
    // ─── SEMANA 1: 25–29 Mayo ────────────────────────────────────────────────
    // Lunes 25 Mayo
    { date: '2026-05-25', time: '09:30 a.m. - 11:00 a.m.', title: 'La IA como aliado de la Investigación de Operaciones', speaker: 'Ing. Christian Rojas Romero', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-25', time: '11:30 a.m. - 01:00 p.m.', title: 'IA y Gestión de Productos', speaker: 'Dr. Juana Gabriela Mendoza Ponce', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-25', time: '03:30 p.m. - 05:00 p.m.', title: 'IA generativa en operaciones: el fin de Excel como centro de decisión', speaker: 'Dr. Aizar Mejia Jalabe', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-25', time: '05:30 p.m. - 07:00 p.m.', title: 'De la IA al piso de producción: Cómo convertir algoritmos en resultados reales', speaker: 'Dr. Dora Luz Quevedo', type: 'Virtual', career: 'Ingeniería Industrial' },
    // Martes 26 Mayo
    { date: '2026-05-26', time: '09:30 a.m. - 11:00 a.m.', title: 'Inteligencia Artificial aplicada a la optimización de inventarios en la era digital', speaker: 'Dr. Mario Morales Rodriguez', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-26', time: '11:30 a.m. - 01:00 p.m.', title: 'El ingeniero que aún no existe: como diseñar hoy con IA y Backcasting', speaker: 'Dr. Cesar A. Arguello', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-26', time: '03:30 p.m. - 05:00 p.m.', title: 'Optimización de Procesos de Manufactura mediante Inteligencia Artificial: De los Datos a la Decisión Operativa', speaker: 'Ing. Jesus Burgos Quiroz', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-26', time: '05:30 p.m. - 07:00 p.m.', title: 'NotebookLm: El copiloto de estudios basado en fuentes reales', speaker: 'Ing. Miguel Cárdenas Agreda', type: 'Virtual', career: 'Ingeniería Industrial' },
    // Miércoles 27 Mayo
    { date: '2026-05-27', time: '09:30 a.m. - 11:00 a.m.', title: 'Transformación Industrial: un primer vistazo entre robótica y manufactura inteligente', speaker: 'Dr. Roberto Angel Melendez Armenta', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-27', time: '11:30 a.m. - 01:00 p.m.', title: 'IA en la gestión estratégica de abastecimiento: Optimización predictiva de Cadenas de Suministros', speaker: 'Ing. Denisse Mendoza Perez', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-27', time: '03:30 p.m. - 05:00 p.m.', title: 'Integración de tecnologías 4.0 aplicado en industria 5.0 con IA', speaker: 'Dr. José Cervantes León', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-27', time: '05:30 p.m. - 07:00 p.m.', title: 'Manufactura inteligente: Optimización de Procesos textiles mediante IA', speaker: 'Ing. German Perez Espinoza', type: 'Virtual', career: 'Ingeniería Industrial' },
    // Jueves 28 Mayo
    { date: '2026-05-28', time: '09:30 a.m. - 11:00 a.m.', title: 'De los algoritmos a la realidad: cómo la Inteligencia Artificial esta redefiniendo la industria, las decisiones y el futuro del trabajo', speaker: 'Ma. Vianey Cruz Sustaita', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-28', time: '11:30 a.m. - 01:00 p.m.', title: 'Inteligencia Artificial, Tecnoestrés y Burnout', speaker: 'Mg. Giovanni Luna Chontal', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-28', time: '03:30 p.m. - 05:00 p.m.', title: 'Tipología de apropiación de herramientas de inteligencia artificial entre estudiantes', speaker: 'Dr. Consuelo Lemus Pool', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-28', time: '05:30 p.m. - 07:00 p.m.', title: 'Integración de Análitica Prescriptiva en ecosistemas IoT de Gran escala', speaker: 'Msc. Gisela Ramirez Pimentel', type: 'Virtual', career: 'Ingeniería Industrial' },
    // Viernes 29 Mayo
    { date: '2026-05-29', time: '09:30 a.m. - 11:00 a.m.', title: 'IA en Marketing', speaker: 'Ing. Vivian Paola Picalua', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-29', time: '11:30 a.m. - 01:00 p.m.', title: 'Manufactura Inteligente con Machine Learning e IoT para la industria del futuro', speaker: 'Dr. José Velásquez Costa', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-29', time: '03:30 p.m. - 05:00 p.m.', title: 'Programación 2.0: Redefiniendo el pensamiento computacional en la era de la IA', speaker: 'Ing. Felipe Perez', type: 'Virtual', career: 'Ingeniería Industrial' },
    { date: '2026-05-29', time: '05:30 p.m. - 07:00 p.m.', title: 'Inteligencia de Mercados y analítica de datos: Fundamentos para la toma de decisiones estratégicas', speaker: 'Ms. Eduardo Parraga Baquerizo', type: 'Virtual', career: 'Ingeniería Industrial' },

    // ─── SEMANA 2: 1–6 Junio ─────────────────────────────────────────────────
    // Lunes 1 Junio
    { date: '2026-06-01', time: '09:00 a.m. - 01:00 p.m.', title: 'VI Civil Week', speaker: 'P.A Ing. Civil', type: 'Presencial', career: 'Ingeniería Civil' },
    { date: '2026-06-01', time: '03:30 p.m. - 05:00 p.m.', title: 'Programación de Arduino con IA', speaker: 'Ing. Kenneth Quispe e Ing. Camilo Raymundo', type: 'Presencial: Wichay', career: 'Ingeniería Industrial' },
    { date: '2026-06-01', time: '04:00 p.m. - 05:00 p.m.', title: 'PA Ing Sistemas e Informática', speaker: 'Varios', type: 'Híbrido', career: 'Ingeniería de Sistemas e Informática' },
    // Martes 2 Junio
    { date: '2026-06-02', time: '09:00 a.m. - 01:00 p.m.', title: 'VI Civil Week', speaker: 'P.A Ing. Civil', type: 'Presencial', career: 'Ingeniería Civil' },
    // Miércoles 3 Junio
    { date: '2026-06-03', time: '09:00 a.m. - 01:00 p.m.', title: 'VI Civil Week', speaker: 'P.A Ing. Civil', type: 'Presencial', career: 'Ingeniería Civil' },
    { date: '2026-06-03', time: '06:00 p.m. - 07:00 p.m.', title: 'Gestión Ambiental Aplicada: Retos, Herramientas y Soluciones para el Ejercicio Profesional', speaker: 'Ing. Giovanna Lázaro Espinoza', type: 'Presencial', career: 'Ingeniería Eléctrica' },
    // Jueves 4 Junio
    { date: '2026-06-04', time: '09:00 a.m. - 01:00 p.m.', title: 'VI Civil Week', speaker: 'P.A Ing. Civil', type: 'Presencial', career: 'Ingeniería Civil' },
    // Viernes 5 Junio
    { date: '2026-06-05', time: '09:00 a.m. - 01:00 p.m.', title: 'VI Civil Week', speaker: 'P.A Ing. Civil', type: 'Presencial', career: 'Ingeniería Civil' },
    { date: '2026-06-05', time: '03:00 p.m. - 03:40 p.m.', title: 'Retos de la inteligencia artificial aplicado a la ingeniería ambiental', speaker: 'Ing. José David Romero', type: 'Presencial', career: 'Ingeniería Ambiental' },
    { date: '2026-06-05', time: '03:40 p.m. - 04:20 p.m.', title: 'Ponencia Presencial Ambiental', speaker: 'Representante del Consejo de Ministros', type: 'Presencial', career: 'Ingeniería Ambiental' },
    { date: '2026-06-05', time: '04:20 p.m. - 05:20 p.m.', title: 'Talleres Simultáneos: SIGERSOL, Monitoreo Ambiental, Huella de Carbono', speaker: 'Ing. Ymelda Montoro, Ing. Juan Delgado, Ing. Hugo Madrid', type: 'Presencial', career: 'Ingeniería Ambiental' },
    { date: '2026-06-05', time: '05:20 p.m. - 06:00 p.m.', title: 'Taller de IPERC', speaker: 'Ing. Giovanna Lázaro', type: 'Presencial', career: 'Ingeniería Ambiental' },
    // Sábado 6 Junio
    { date: '2026-06-06', time: '09:00 a.m. - 11:00 a.m.', title: 'PA Ing Sistemas e Informática', speaker: 'Varios', type: 'Híbrido', career: 'Ingeniería de Sistemas e Informática' },

    // ─── SEMANA 3: 10–13 Junio ───────────────────────────────────────────────
    // Miércoles 10 Junio
    { date: '2026-06-10', time: '07:00 p.m. - 08:00 p.m.', title: 'Supervision o fiscalización Del sub sector de electricidad.', speaker: 'Ing. Elmer Pizarro Rimari', type: 'Presencial', career: 'Ingeniería Eléctrica' },
    // Jueves 11 Junio
    { date: '2026-06-11', time: '09:00 a.m. - 06:00 p.m.', title: 'Inicio del 4to Encuentro del Ecosistema Empresarial', speaker: 'Varios', type: 'Presencial', career: 'Ingeniería Empresarial' },
    { date: '2026-06-11', time: '07:00 p.m. - 08:00 p.m.', title: 'Gestión Segura de Trabajos en Altura: Prevención, Control y Toma de Decisiones', speaker: 'Ing. Luis Manuel Igreda Quintana', type: 'Presencial', career: 'Ingeniería Eléctrica' },
    // Viernes 12 Junio
    { date: '2026-06-12', time: '09:00 a.m. - 02:00 p.m.', title: 'Hackaton - Ing. Empresarial', speaker: 'Varios', type: 'Presencial', career: 'Ingeniería Empresarial' },
    { date: '2026-06-12', time: '06:00 p.m. - 07:00 p.m.', title: 'Impacto de la Movilidad Eléctrica sobre las Redes de Distribución', speaker: 'Ing. Fredy Paucar Condori', type: 'Presencial', career: 'Ingeniería Eléctrica' },
    { date: '2026-06-12', time: 'Desde las 06:00 p.m.', title: 'Congreso - Ing. Empresarial', speaker: 'Varios', type: 'Virtual', career: 'Ingeniería Empresarial' },
    // Sábado 13 Junio
    { date: '2026-06-13', time: '09:00 a.m. - 02:00 p.m.', title: 'Congreso - Ing. Empresarial', speaker: 'Varios', type: 'Presencial', career: 'Ingeniería Empresarial' },
    { date: '2026-06-13', time: '10:00 a.m. - 11:00 a.m.', title: 'Impacto para el desarrollo de la actividad productiva en zonas rurales de la Región Huancavelica', speaker: 'Ing. Romeo Rojas Bravo', type: 'Presencial', career: 'Ingeniería Eléctrica' },
];

async function main() {
    const count = await db.event.count();
    if (count > 0) {
        console.log(`La BD ya tiene ${count} eventos. Ejecuta "npx prisma db execute" para limpiarla primero si quieres re-sembrar.`);
        return;
    }

    const result = await db.event.createMany({ data: events });
    console.log(`✓ ${result.count} eventos insertados correctamente.`);
}

main()
    .catch(err => { console.error('Error en seed:', err); process.exit(1); })
    .finally(async () => {
        await db.$disconnect();
        await pool.end();
    });
