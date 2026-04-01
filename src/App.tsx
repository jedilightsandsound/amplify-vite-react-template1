import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    // 1. Email collection trigger (runs once on land)
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowEmailModal(true);
      localStorage.setItem("hasVisited", "true");
    }

    const sub = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', margin: 0 }}>
      {/* --- HEADER / HERO SECTION --- */}
      <header style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80")', 
        backgroundSize: 'cover', 
        height: '60vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white',
        textAlign: 'center'
      }}>
        <nav style={{ position: 'absolute', top: '20px' }}>
          <a href="#about" style={navStyle}>About Us</a>
          <a href="#contact" style={navStyle}>Contact Us</a>
          <a href="#book" style={navStyle}>Book Us</a>
          <a href="#gallery" style={navStyle}>Gallery</a>
        </nav>
        <h1 style={{ fontSize: '3rem' }}>Welcome to Our Service</h1>
        <button style={btnStyle} onClick={() => window.location.href='#book'}>Book Now</button>
      </header>

      {/* --- ABOUT US --- */}
      <section id="about" style={sectionStyle}>
        <h2>About Us</h2>
        <p>We provide world-class services tailored to your specific needs.</p>
      </section>

      {/* --- INSTAGRAM GALLERY --- */}
      <section id="gallery" style={{ ...sectionStyle, background: '#f9f9f9' }}>
        <h2>Gallery</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', padding: '20px' }}>
          {/* Note: Real Instagram embedding usually requires an <iframe> or a 3rd party widget like Elfsight */}
          <p style={{ color: '#888' }}>[Instagram Embed Container]</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
             <div style={placeholderImg}></div>
             <div style={placeholderImg}></div>
          </div>
        </div>
      </section>

      {/* --- BOOK US / CONTACT --- */}
      <section id="book" style={sectionStyle}>
        <h2>Book Us</h2>
        <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto', gap: '10px' }}>
          <input type="text" placeholder="Your Name" style={inputStyle} />
          <input type="email" placeholder="Your Email" style={inputStyle} />
          <textarea placeholder="Tell us about your event" style={inputStyle}></textarea>
          <button type="submit" style={btnStyle}>Send Request</button>
        </form>
      </section>

      {/* --- EMAIL MODAL --- */}
      {showEmailModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Join Our Newsletter</h3>
            <p>Sign up for exclusive updates and offers!</p>
            <input type="email" placeholder="email@example.com" style={inputStyle} />
            <div style={{ marginTop: '15px' }}>
              <button onClick={() => setShowEmailModal(false)} style={btnStyle}>Sign Up</button>
              <button onClick={() => setShowEmailModal(false)} style={{ ...btnStyle, background: 'none', color: '#666' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple styles objects
const navStyle = { margin: '0 15px', color: 'white', textDecoration: 'none', fontWeight: 'bold' as const };
const sectionStyle = { padding: '60px 20px', textAlign: 'center' as const };
const btnStyle = { padding: '10px 25px', backgroundColor: '#ff4757', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' };
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };
const placeholderImg = { height: '150px', background: '#eee', borderRadius: '8px' };
const modalOverlay = { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalContent = { background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' as const };

export default App;