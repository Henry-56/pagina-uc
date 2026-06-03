'use client';

import AdminPanel from '@/components/AdminPanel';
import { ArrowLeft, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminPage() {
    const router = useRouter();

    async function handleLogout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    }

    return (
        <main className={styles.adminContainer}>
            <div className={styles.header}>
                <div className={styles.headerNav}>
                    <Link href="/" className={styles.backLink}>
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={16} />
                        Cerrar sesión
                    </button>
                </div>
                <h1>Panel de Administración</h1>
            </div>

            <div className={styles.content}>
                <AdminPanel />
            </div>
        </main>
    );
}
