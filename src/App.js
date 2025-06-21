import './App.css';
import cvData from './data/cv-data.json';

function App() {
  const { personalInfo, about, contact, skills, experience, projects } = cvData;

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">{personalInfo.name}</div>
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
          <h1>Hello, I'm {personalInfo.fullName}</h1>
          <p className="subtitle">{personalInfo.title}</p>
          <p className="description">
            {personalInfo.heroDescription}
          </p>
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>
      </section>

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
          <div className="about-image">
            <img
              src={personalInfo.profileImage}
              alt={`${personalInfo.fullName} Profile`}
              className="profile-image"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNEY0NkU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCI+UHJvZmlsZTwvdGV4dD48L3N2Zz4=";
              }}
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
              {skills.frontend.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul className="skill-list">
              {skills.backend.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Mobile</h3>
            <ul className="skill-list">
              {skills.mobile.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Tools & Others</h3>
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
              <div className="company">{job.company} - {job.location}</div>
              <div className="duration">{job.duration}</div>
              <p>{job.description}</p>
              {job.achievements && (
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

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjBhNWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCI+UHJvamVjdDwvdGV4dD48L3N2Zz4=";
                }}
              />
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
                  {project.links.case_study && (
                    <a href={project.links.case_study} className="project-link" target="_blank" rel="noopener noreferrer">
                      Case Study
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
              📧 {contact.email}
            </a>
            {contact.social.linkedin && (
              <a href={contact.social.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
                💼 LinkedIn
              </a>
            )}
            {contact.social.github && (
              <a href={contact.social.github} className="contact-link" target="_blank" rel="noopener noreferrer">
                🐙 GitHub
              </a>
            )}
            {contact.social.twitter && (
              <a href={contact.social.twitter} className="contact-link" target="_blank" rel="noopener noreferrer">
                🐦 Twitter
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 {personalInfo.fullName}. Built with React and deployed on GitHub Pages.</p>
      </footer>
    </div>
  );
}

export default App;
