import { useState } from 'react';
import AngySimPreview from './AngySimPreview';
import ContactQr from './ContactQr';
import './App.css';
import cvData from './data/cv-data.json';

function App() {
  const { personalInfo, about, contact, skills, experience, education, certifications, projects, languages } = cvData;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* Navigation */}
      <a className="skip-link" href="#about">Skip to content</a>
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-identity"><a className="logo" href="#home" aria-label="Back to home"><span className="logo-mark">a<span>.</span></span><span>{personalInfo.name}<small>ROBOTICS / SOFTWARE</small></span></a><ContactQr website={contact.website} linkedin={contact.social.linkedin} whatsapp={contact.social.whatsapp} github={contact.social.github} /></div>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
          <ul id="main-menu" className={`nav-links ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow"><span /> ROBOTICS · SIMULATION · SOFTWARE</p>
            <p className="hero-intro">Hello, I'm Alejandro.</p>
            <h1>Engineering<br />the <em>physical</em><br />through code<span>.</span></h1>
            <p className="subtitle">{personalInfo.title}</p>
            <p className="description">{personalInfo.heroDescription}</p>
            <div className="hero-actions"><a href="#contact" className="cta-button">Let's connect <span>↗</span></a><a className="text-link" href="#about">Explore my background <span>↓</span></a></div>
          </div>
          <AngySimPreview />
        </div>
        <div className="hero-bottom"><span>{personalInfo.fullName}</span><span>{personalInfo.location}</span><a href="#about">SCROLL TO EXPLORE ↓</a></div>
      </section>
      <div className="discipline-strip" aria-label="Engineering disciplines"><span>Software meets the physical world</span><span>Robotics</span><i>＋</i><span>Simulation</span><i>＋</i><span>Embedded systems</span></div>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>{about.shortBio}</p>
            {about.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="about-sidebar">
            <div className="about-languages">
              <h3>Languages</h3>
              <ul>
                {languages.map((lang, index) => (
                  <li key={index}>{lang.language} — {lang.proficiency}</li>
                ))}
              </ul>
            </div>
            <div className="about-interests">
              <h3>Interests</h3>
              <ul>
                {about.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Mobile</h3>
            <ul className="skill-list">
              {skills.mobile.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Systems & Embedded</h3>
            <ul className="skill-list">
              {skills.systems.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Robotics & AI</h3>
            <ul className="skill-list">
              {skills.robotics.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Web</h3>
            <ul className="skill-list">
              {skills.web.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Tools & DevOps</h3>
            <ul className="skill-list">
              {skills.tools.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <h2>Work Experience</h2>
        <div className="experience-timeline">
          {experience.map((job) => (
            <div key={job.id} className="experience-item">
              <h3>{job.position}</h3>
              <div className="company">{job.company} — {job.location}</div>
              <div className="duration">{job.duration}</div>
              <p>{job.description}</p>
              {job.achievements && job.achievements.length > 0 && (
                <ul className="achievements-list">
                  {job.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              )}
              <div className="job-technologies">
                {job.technologies.map((tech, index) => (
                  <span key={index} className="job-tech">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="section">
        <h2>Education & Certifications</h2>
        <div className="education-grid">
          <div className="education-column">
            <h3>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="education-item">
                <h4>{edu.degree}</h4>
                <div className="institution">{edu.institution}</div>
                <div className="edu-location">{edu.location}</div>
                <div className="edu-dates">{edu.startDate} — {edu.endDate}</div>
                <p>{edu.description}</p>
              </div>
            ))}
          </div>
          <div className="education-column">
            <h3>Certifications</h3>
            <div className="certifications-list">
              {certifications.map((cert) => (
                <div key={cert.id} className="certification-item">
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-meta">{cert.issuer} — {cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-tech">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.links.demo && (
                    <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a href={project.links.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
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
            <a href={`mailto:${contact.email}`} className="contact-link">
              {contact.email}
            </a>
            {contact.social.linkedin && (
              <a href={contact.social.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {contact.social.github && (
              <a href={contact.social.github} className="contact-link" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      </main>
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 {personalInfo.fullName}. Built with React and deployed on GitHub Pages.</p>
      </footer>
    </div>
  );
}

export default App;
