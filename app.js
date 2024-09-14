var resumeForm = document.getElementById('resume-form');
var resumeDisplayContainer = document.getElementById('resume-display');
var imageInput = document.getElementById('image');
if (resumeForm && resumeDisplayContainer) {
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var nameInput = document.getElementById('name');
        var aboutTextArea = document.getElementById('about');
        var emailInput = document.getElementById('email');
        var phoneInput = document.getElementById('phone');
        var linkedinInput = document.getElementById('linkedin');
        var facebookInput = document.getElementById('facebook');
        var discordInput = document.getElementById('discord');
        var githubInput = document.getElementById('github');
        var skillsInput = document.getElementById('skills');
        var experienceTitleInput = document.getElementById('experience-title');
        var experienceDatesInput = document.getElementById('experience-dates');
        var experienceDescriptionTextArea = document.getElementById('experience-description');
        var heroDescriptionInput = document.getElementById('hero-description');
        if (nameInput && aboutTextArea && emailInput && phoneInput && linkedinInput &&
            facebookInput && discordInput && githubInput && skillsInput &&
            experienceTitleInput && experienceDatesInput && experienceDescriptionTextArea &&
            heroDescriptionInput && imageInput && imageInput.files && imageInput.files.length > 0) {
            var file = imageInput.files[0]; // Get the file from input
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                var result = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                if (typeof result === 'string') { // Ensure result is a string
                    var resumeData = {
                        name: nameInput.value,
                        about: aboutTextArea.value,
                        email: emailInput.value,
                        phone: phoneInput.value,
                        linkedin: linkedinInput.value,
                        facebook: facebookInput.value,
                        discord: discordInput.value,
                        github: githubInput.value,
                        skills: skillsInput.value.split(',').map(function (skill) { return skill.trim(); }),
                        experience: [{
                                title: experienceTitleInput.value,
                                dates: experienceDatesInput.value,
                                description: experienceDescriptionTextArea.value
                            }],
                        heroDescription: heroDescriptionInput.value,
                        image: result // Convert to base64 string
                    };
                    generateResume(resumeData); // Call the function to generate resume
                }
                else {
                    console.error('Error reading image file.');
                }
            };
            reader.onerror = function () {
                console.error('Error reading file.');
            };
            reader.readAsDataURL(file); // Convert file to base64 URL
        }
        else {
            console.error('Please fill all fields and upload an image.');
        }
    });
}
function generateResume(data) {
    if (resumeDisplayContainer) {
        var imageElement = data.image ? "<img src=\"".concat(data.image, "\" alt=\"Profile Image\" class=\"profile-image\"/>") : '';
        resumeDisplayContainer.innerHTML = "\n      <header class=\"navbar\">\n        <h1>".concat(data.name, "</h1>\n        <ul id=\"links\">\n          <li><a href=\"#about\">About</a></li>\n          <li><a href=\"#skills\">Skills</a></li>\n          <li><a href=\"#experience\">Experience</a></li>\n          <li><a href=\"#contact\">Contact</a></li>\n        </ul>\n      </header>\n\n      <div class=\"hero\">\n        <div class=\"hero-content\">\n          ").concat(imageElement, "\n          <h1>").concat(data.name, "</h1>\n          <p>").concat(data.heroDescription, "</p>\n          <div class=\"icons\">\n            ").concat(data.facebook ? "<a href=\"".concat(data.facebook, "\" target=\"_blank\"><i class=\"fa-brands fa-facebook\"></i></a>") : '', "\n            ").concat(data.linkedin ? "<a href=\"".concat(data.linkedin, "\" target=\"_blank\"><i class=\"fa-brands fa-linkedin\"></i></a>") : '', "\n            ").concat(data.discord ? "<a href=\"".concat(data.discord, "\" target=\"_blank\"><i class=\"fa-brands fa-discord\"></i></a>") : '', "\n            ").concat(data.github ? "<a href=\"".concat(data.github, "\" target=\"_blank\"><i class=\"fa-brands fa-github\"></i></a>") : '', "\n          </div>\n        </div>\n      </div>\n\n      <main>\n        <section id=\"about\" class=\"section\">\n          <h2 class=\"section-title\">About Me</h2>\n          <p class=\"section-content\">").concat(data.about, "</p>\n        </section>\n\n        <section id=\"skills\" class=\"section\">\n          <h2 class=\"section-title\">Skills</h2>\n          <ul class=\"skills-list\">\n            ").concat(data.skills.map(function (skill) { return "<li><i class=\"fa-solid fa-check\" style=\"color: #199f34;\"></i> ".concat(skill, "</li>"); }).join(''), "\n          </ul>\n        </section>\n\n        <section id=\"experience\" class=\"section\">\n          <h2 class=\"section-title\">Experience</h2>\n          <div class=\"experience-item\">\n            <h3>").concat(data.experience[0].title, "</h3>\n            <p class=\"dates\">").concat(data.experience[0].dates, "</p>\n            <p>").concat(data.experience[0].description, "</p>\n          </div>\n        </section>\n\n        <section id=\"contact\" class=\"section\">\n          <h2 class=\"section-title\">Contact Details</h2>\n          <p class=\"section-content\"><i class=\"fa-solid fa-envelope\"></i> Email: ").concat(data.email, "</p>\n          <p class=\"section-content\"><i class=\"fa-solid fa-phone\"></i> Phone: ").concat(data.phone, "</p>\n          <p class=\"section-content\"><i class=\"fa-brands fa-linkedin\"></i> LinkedIn: <a href=\"").concat(data.linkedin, "\" target=\"_blank\">").concat(data.linkedin, "</a></p>\n        </section>\n      </main>\n    ");
        resumeForm === null || resumeForm === void 0 ? void 0 : resumeForm.classList.add('hidden');
        resumeDisplayContainer.classList.remove('hidden');
    }
}
