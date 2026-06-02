'use client';

import AdminPanel from '@/components/AdminPanel';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './admin.module.css';

export default function AdminPage() {
    return (
        <main className={styles.adminContainer}>
            <div className={styles.header}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    Volver al inicio
                </Link>
                <h1>Panel de Administración</h1>
            </div>

            <div className={styles.content}>
                <AdminPanel />
            </div>
        </main>
    );
}
