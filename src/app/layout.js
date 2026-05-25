import './globals.css'

export const metadata = {
  title: 'Semana de Ingeniería 2026 | Universidad Continental',
  description: 'Semana de Ingeniería 2026 en la Universidad Continental. Conoce las ponencias, talleres y eventos de nuestra semana de ingeniería.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
