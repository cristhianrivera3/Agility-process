import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Landing.css';
import NeuralBackground from '../components/NeuralBackground';
import GooeyText from '../components/GooeyText';
import ShinyCta from '../components/ShinyCta';
import TextScramble from '../components/TextScramble';


const ContactBgWrapper = ({ children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'local-particles';
    wrapper.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 3.5 + 1.5,
          opacity: Math.random() * 0.7 + 0.25,
        });
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${Math.max(0, 0.25 - dist / 1200)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00d4ff';
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      drawConnections();
      animId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const onResize = () => {
      resize();
      createParticles();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.remove();
    };
  }, []);

  return <div ref={wrapperRef} className="contact-bg-wrapper">{children}</div>;
};

const Landing = () => {
  const testimonials = [
    {
      name: "Carlos Méndez",
      role: "CEO & Fundador @ Agility Process",
      quote: "Nuestra misión es transformar negocios a través de tecnología innovadora y estrategias digitales de alto impacto.",
      avatar: "https://i.pravatar.cc/128?img=11",
    },
    {
      name: "Ana Lucía Torres",
      role: "CTO @ Agility Process",
      quote: "Cada línea de código que escribimos está pensada para escalar tu negocio al siguiente nivel.",
      avatar: "https://i.pravatar.cc/128?img=5",
    },
    {
      name: "Miguel Ángel Ríos",
      role: "Director de Innovación @ Agility Process",
      quote: "La clave está en entender tu industria para ofrecer soluciones que realmente marquen la diferencia.",
      avatar: "https://i.pravatar.cc/128?img=12",
    },
    {
      name: "Sofía Martínez",
      role: "Head of Design @ Agility Process",
      quote: "El diseño no es solo cómo se ve, sino cómo funciona. Cada pixel cuenta en la experiencia digital.",
      avatar: "https://i.pravatar.cc/128?img=9",
    },
  ];

  return (
    <div className="landing-page">
      <NeuralBackground
        color="#00d4ff"
        trailOpacity={0.06}
        particleCount={800}
        speed={0.9}
      />

      {/* HERO */}
      <motion.section
        className="landing-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <TextScramble
            text="Agility Process — Soluciones Tecnológicas"
            className="hero-badge tracking-wider uppercase"
            duration={2.5}
            delay={0.3}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <TextScramble
              text="Transformamos"
              className="block gradient-text"
              duration={2}
              delay={1}
            />
            <TextScramble
              text="Negocios en"
              className="block gradient-text"
              duration={2}
              delay={2.2}
            />
            <TextScramble
              text="Experiencias Digitales"
              className="block gradient-text"
              duration={2}
              delay={3.5}
            />
          </motion.h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Soluciones tecnológicas que aceleran tu crecimiento.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <ShinyCta href="/nosotros">
              <TextScramble text="Agendar Consulta" as="span" duration={1.5} delay={0.5} />
            </ShinyCta>
            <ShinyCta href="/portafolio">
              <TextScramble text="Ver Proyectos" as="span" duration={1.5} delay={0.7} />
            </ShinyCta>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Ideas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Áreas tech</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CONTACT BG ZONE */}
      <ContactBgWrapper>
        <motion.div
          className="gooey-above-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <GooeyText texts={["Innovación","Tecnología","Futuro","Agility","Process","IA","Transparencia","Profesionalismo"]} />
        </motion.div>

        <motion.section
          className="landing-section section-offset"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            ¿Te pasa esto?
          </motion.h2>
          <motion.ul
            className="problem-list"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >🚫 ¿Tu negocio no tiene presencia digital sólida?</motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >📉 ¿Tu web no genera resultados?</motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >⚠️ ¿No tienes estrategia tecnológica?</motion.li>
            <motion.li
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >⏳ ¿Pierdes tiempo sin soluciones claras?</motion.li>
          </motion.ul>
        </motion.section>

        <motion.section
          className="landing-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            ¿Por qué elegirnos?
          </motion.h2>
          <motion.div
            className="trust-grid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ShinyCta className="trust-shiny">
              <TextScramble text="Transparencia" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta className="trust-shiny">
              <TextScramble text="Precios diferenciadores" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta className="trust-shiny">
              <TextScramble text="Escalabilidad real" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta className="trust-shiny">
              <TextScramble text="Atención 24/7" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta className="trust-shiny">
              <TextScramble text="Enfoque en resultados" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta className="trust-shiny">
              <TextScramble text="Soluciones integrales" as="span" duration={1.5} inView />
            </ShinyCta>
          </motion.div>
        </motion.section>

        <motion.section
          className="landing-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Nuestros Servicios
          </motion.h2>
          <motion.div
            className="services-grid-landing"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ShinyCta href="/servicios/ciberseguridad" className="service-shiny">
              <TextScramble text="🔒 Ciberseguridad" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta href="/servicios/marketing-digital" className="service-shiny">
              <TextScramble text="📈 Marketing Digital" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta href="/servicios/desarrollo-web" className="service-shiny">
              <TextScramble text="🌐 Desarrollo Web" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta href="/servicios/diseno-uiux" className="service-shiny">
              <TextScramble text="🎨 UI/UX" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta href="/servicios/cloud-devops" className="service-shiny">
              <TextScramble text="☁️ Cloud" as="span" duration={1.5} inView />
            </ShinyCta>
            <ShinyCta href="/servicios/data-analytics" className="service-shiny">
              <TextScramble text="📊 Data & IA" as="span" duration={1.5} inView />
            </ShinyCta>
          </motion.div>
        </motion.section>

        <motion.section
          className="landing-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </motion.h2>
        </motion.section>

        <motion.div
          className="testimonials-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={{ zIndex: testimonials.length - i }}>
                <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                <p className="testimonial-quote">"{t.quote}"</p>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-role">{t.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="info-boxes"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="info-box">
            <span className="info-icon">📍</span>
            <span className="info-title">Ubicación</span>
            <span className="info-text">Bogotá, Colombia</span>
          </div>
          <div className="info-box">
            <span className="info-icon">📞</span>
            <span className="info-title">Teléfono</span>
            <span className="info-text">+57 300 000 0000</span>
          </div>
          <div className="info-box">
            <span className="info-icon">✉️</span>
            <span className="info-title">Email</span>
            <span className="info-text">contacto@agilityprocess.com</span>
          </div>
          <div className="info-box">
            <span className="info-icon">🕐</span>
            <span className="info-title">Horario</span>
            <span className="info-text">Lun – Vie, 9:00 – 18:00</span>
          </div>
        </motion.div>
      </ContactBgWrapper>
    </div>
  );
};

export default Landing;
