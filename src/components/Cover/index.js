import React from 'react';

export default function Cover() {
  return <div className="cover">
    <div className="backdrop" style={{
      backgroundImage: "url('https://img.youtube.com/vi/qu577tNp1hA/maxresdefault.jpg')"
    }}></div>
    <img src="https://img.youtube.com/vi/qu577tNp1hA/maxresdefault.jpg" alt="/" />
  </div>;
}