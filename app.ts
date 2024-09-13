interface ResumeData {
  name: string;
  about: string;
  email: string;
  phone: string;
  linkedin: string;
  facebook: string;
  discord: string;
  github: string;
  skills: string[];
  experience: {
    title: string;
    dates: string;
    description: string;
  }[];
  heroDescription: string;
  image: string;
}

const resumeForm = document.getElementById('resume-form') as HTMLFormElement | null;
const resumeDisplayContainer = document.getElementById('resume-display') as HTMLElement | null;

if (resumeForm && resumeDisplayContainer) {
  resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const aboutTextArea = document.getElementById('about') as HTMLTextAreaElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
    const linkedinInput = document.getElementById('linkedin') as HTMLInputElement | null;
    const facebookInput = document.getElementById('facebook') as HTMLInputElement | null;
    const discordInput = document.getElementById('discord') as HTMLInputElement | null;
    const githubInput = document.getElementById('github') as HTMLInputElement | null;
    const skillsInput = document.getElementById('skills') as HTMLInputElement | null;
    const experienceTitleInput = document.getElementById('experience-title') as HTMLInputElement | null;
    const experienceDatesInput = document.getElementById('experience-dates') as HTMLInputElement | null;
    const experienceDescriptionTextArea = document.getElementById('experience-description') as HTMLTextAreaElement | null;
    const heroDescriptionInput = document.getElementById('hero-description') as HTMLInputElement | null;
    const imageInput = document.getElementById('image') as HTMLInputElement | null;

    if (
      nameInput && aboutTextArea && emailInput && phoneInput && linkedinInput &&
      facebookInput && discordInput && githubInput && skillsInput &&
      experienceTitleInput && experienceDatesInput && experienceDescriptionTextArea &&
      heroDescriptionInput && imageInput
    ) {
      const resumeData: ResumeData = {
        name: nameInput.value,
        about: aboutTextArea.value,
        email: emailInput.value,
        phone: phoneInput.value,
        linkedin: linkedinInput.value,
        facebook: facebookInput.value,
        discord: discordInput.value,
        github: githubInput.value,
        skills: skillsInput.value.split(',').map(skill => skill.trim()),
        experience: [{
          title: experienceTitleInput.value,
          dates: experienceDatesInput.value,
          description: experienceDescriptionTextArea.value
        }],
        heroDescription: heroDescriptionInput.value,
        image: imageInput.value
      };

      generateResume(resumeData);
    } else {
      console.error('One or more form elements are missing.');
    }
  });
}

function generateResume(data: ResumeData) {
  if (resumeDisplayContainer) {
    resumeDisplayContainer.innerHTML = `
      <header class="navbar">
        <h1>${data.name}</h1>
        <ul id="links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </header>

      <div class="hero">
        <div class="hero-content">
          <img src="${data.image}" alt="Profile Image" class="profile-image"/>
          <h1>${data.name}</h1>
          <p>${data.heroDescription}</p>
          <div class="icons">
            ${data.facebook ? `<a href="${data.facebook}" target="_blank"><i class="fa-brands fa-facebook"></i></a>` : ''}
            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>` : ''}
            ${data.discord ? `<a href="${data.discord}" target="_blank"><i class="fa-brands fa-discord"></i></a>` : ''}
            ${data.github ? `<a href="${data.github}" target="_blank"><i class="fa-brands fa-github"></i></a>` : ''}
          </div>
        </div>
      </div>

      <main>
        <section id="about" class="section">
          <h2 class="section-title">About Me</h2>
          <p class="section-content">${data.about}</p>
        </section>

        <section id="skills" class="section">
          <h2 class="section-title">Skills</h2>
          <ul class="skills-list">
            ${data.skills.map(skill => `<li><i class="fa-solid fa-check" style="color: #199f34;"></i> ${skill}</li>`).join('')}
          </ul>
        </section>

        <section id="experience" class="section">
          <h2 class="section-title">Experience</h2>
          <div class="experience-item">
            <h3>${data.experience[0].title}</h3>
            <p class="dates">${data.experience[0].dates}</p>
            <p>${data.experience[0].description}</p>
          </div>
        </section>

        <section id="contact" class="section">
          <h2 class="section-title">Contact Details</h2>
          <p class="section-content"><i class="fa-solid fa-envelope"></i> Email: ${data.email}</p>
          <p class="section-content"><i class="fa-solid fa-phone"></i> Phone: ${data.phone}</p>
          <p class="section-content"><i class="fa-brands fa-linkedin"></i> LinkedIn: <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>
        </section>
      </main>
    `;

    if (resumeForm) resumeForm.classList.add('hidden');
    resumeDisplayContainer.classList.remove('hidden');
  
  }
}
