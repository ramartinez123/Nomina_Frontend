import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="text-white text-center py-# custom-footer">
      <div className="container">
        {/* Sección de enlaces */}
        <div className="mb-3">
          <a href="/about" className=" footer-link text-white mx-3 text-decoration-none">
            Acerca de
          </a>
          <a href="/privacy" className="footer-link text-white mx-3 text-decoration-none">
            Política de Privacidad
          </a>
          <a href="/terms" className="footer-link text-white mx-3 text-decoration-none">
            Términos y Condiciones
          </a>
          <a href="/contact" className="footer-link text-white mx-3 text-decoration-none">
            Contacto
          </a>
        </div>

        {/* Mensaje de derechos reservados */}
        <p className="mb-0">&copy; 2024 MiApp. Todos los derechos reservados.</p>

        {/* Opcional: Redes sociales */}
        <div className="mt-3">
          <a
            href="https://facebook.com"
            className="footer-link text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook" style={{ fontSize: '1.2rem' }}></i>
          </a>
          <a
            href="https://twitter.com"
            className="footer-link text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-twitter" style={{ fontSize: '1.2rem' }}></i>
          </a>
          <a
            href="https://instagram.com"
            className="footer-link text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram" style={{ fontSize: '1.2rem' }}></i>
          </a>
          <a
            href="https://linkedin.com"
            className="footer-link text-white mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin" style={{ fontSize: '1.2rem' }}></i>
          </a>
        </div>
      </div>
    </footer>
  );
}