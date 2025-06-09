import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Your Name</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Hello, I'm Your Name</h1>
          <p className="subtitle">Software Developer & Problem Solver</p>
          <p className="description">
            Passionate about creating innovative solutions and building amazing user experiences.
            I love to code, learn new technologies, and solve complex problems.
          </p>
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate software developer with a strong background in full-stack development.
              I enjoy working with modern technologies and creating efficient, scalable solutions.
            </p>
            <p>
              My journey in technology started with curiosity and has evolved into a career focused on
              continuous learning and innovation. I believe in writing clean, maintainable code and
              delivering exceptional user experiences.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or sharing knowledge with the developer community.
            </p>
          </div>
          <div className="about-image">
            <img
              src="/api/placeholder/300/300"
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul className="skill-list">
              <li className="skill-item">React</li>
              <li className="skill-item">JavaScript</li>
              <li className="skill-item">TypeScript</li>
              <li className="skill-item">HTML/CSS</li>
              <li className="skill-item">Vue.js</li>
              <li className="skill-item">Tailwind CSS</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul className="skill-list">
              <li className="skill-item">Node.js</li>
              <li className="skill-item">Python</li>
              <li className="skill-item">Express.js</li>
              <li className="skill-item">Django</li>
              <li className="skill-item">PostgreSQL</li>
              <li className="skill-item">MongoDB</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Tools & Others</h3>
            <ul className="skill-list">
              <li className="skill-item">Git</li>
              <li className="skill-item">Docker</li>
              <li className="skill-item">AWS</li>
              <li className="skill-item">CI/CD</li>
              <li className="skill-item">Figma</li>
              <li className="skill-item">Linux</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <h2>Work Experience</h2>
        <div className="experience-timeline">
          <div className="experience-item">
            <h3>Senior Software Developer</h3>
            <div className="company">Tech Company Inc.</div>
            <div className="duration">2022 - Present</div>
            <p>
              Lead development of web applications using React and Node.js. Collaborate with
              cross-functional teams to deliver high-quality software solutions. Mentor junior
              developers and contribute to architectural decisions.
            </p>
          </div>
          <div className="experience-item">
            <h3>Full Stack Developer</h3>
            <div className="company">Startup Solutions</div>
            <div className="duration">2020 - 2022</div>
            <p>
              Developed and maintained multiple web applications using modern frameworks.
              Implemented responsive designs and optimized application performance.
              Worked closely with designers and product managers.
            </p>
          </div>
          <div className="experience-item">
            <h3>Junior Developer</h3>
            <div className="company">Digital Agency</div>
            <div className="duration">2019 - 2020</div>
            <p>
              Started my professional journey building websites and learning industry best practices.
              Gained experience in version control, testing, and agile development methodologies.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <img src="/api/placeholder/400/200" alt="Project 1" />
            <div className="project-content">
              <h3>E-Commerce Platform</h3>
              <p>
                A full-stack e-commerce solution built with React, Node.js, and PostgreSQL.
                Features include user authentication, payment processing, and admin dashboard.
              </p>
              <div className="project-links">
                <a href="https://example.com" className="project-link">Live Demo</a>
                <a href="https://github.com" className="project-link">GitHub</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img src="/api/placeholder/400/200" alt="Project 2" />
            <div className="project-content">
              <h3>Task Management App</h3>
              <p>
                A collaborative task management application with real-time updates.
                Built using React, Socket.io, and MongoDB with a focus on user experience.
              </p>
              <div className="project-links">
                <a href="https://example.com" className="project-link">Live Demo</a>
                <a href="https://github.com" className="project-link">GitHub</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img src="/api/placeholder/400/200" alt="Project 3" />
            <div className="project-content">
              <h3>Weather Dashboard</h3>
              <p>
                A responsive weather dashboard that displays current conditions and forecasts.
                Integrated with multiple weather APIs and features location-based services.
              </p>
              <div className="project-links">
                <a href="https://example.com" className="project-link">Live Demo</a>
                <a href="https://github.com" className="project-link">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <p>
            I'm always interested in new opportunities and interesting projects.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:your.email@example.com" className="contact-link">
              📧 your.email@example.com
            </a>
            <a href="https://linkedin.com/in/yourprofile" className="contact-link" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
            <a href="https://github.com/yourusername" className="contact-link" target="_blank" rel="noopener noreferrer">
              🐙 GitHub
            </a>
            <a href="https://twitter.com/yourusername" className="contact-link" target="_blank" rel="noopener noreferrer">
              🐦 Twitter
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Your Name. Built with React and deployed on GitHub Pages.</p>
      </footer>
    </div>
  );
}

export default App;
