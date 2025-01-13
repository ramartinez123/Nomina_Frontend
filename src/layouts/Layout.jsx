import React from 'react';
import Nav from './nav';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  ); 
}