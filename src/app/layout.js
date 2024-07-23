import './global.css';
import React from 'react';
export const metadata = {
  title: 'Star Wars Heroes',
  description: 'Explore the heroes of the Star Wars universe',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="inter-font">{children}</body>
    </html>
  );
}
