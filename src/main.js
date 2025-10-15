import './style.css'

// Create animated background stars
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';
    starsContainer.appendChild(star);
  }
  
  document.body.appendChild(starsContainer);
}

// Intersection Observer for reveal animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// Smooth scrolling for navigation
function setupNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuButton && mobileMenu && hamburgerIcon && closeIcon) {
    mobileMenuButton.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (isHidden) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        // Add blur to background
        document.body.classList.add('mobile-menu-open');
      } else {
        // Hide menu
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        // Remove blur from background
        document.body.classList.remove('mobile-menu-open');
      }
    });

    // Close menu when clicking on navigation links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        // Remove blur from background
        document.body.classList.remove('mobile-menu-open');
      });
    });

    // Close menu when clicking on the overlay (outside the menu content)
    mobileMenu.addEventListener('click', (e) => {
      // Check if clicked element is the overlay, the centering container, or outside menu content
      const isOverlay = e.target === mobileMenu;
      const isContainer = e.target.classList.contains('mobile-overlay-container');
      const isMenuContent = e.target.closest('.glass');
      
      if ((isOverlay || isContainer) && !isMenuContent) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        // Remove blur from background
        document.body.classList.remove('mobile-menu-open');
      }
    });

    // Alternative: Listen for clicks anywhere when menu is open
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden')) {
        // Menu is open, check if click is outside menu content
        if (!e.target.closest('#mobile-menu .glass') && !e.target.closest('#mobile-menu-button')) {
          mobileMenu.classList.add('hidden');
          hamburgerIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
          // Remove blur from background
          document.body.classList.remove('mobile-menu-open');
        }
      }
    });
  }
}

// Create the portfolio content
function createPortfolio() {
  const app = document.querySelector('#app');

  const startWorkingDate = new Date('2023-10-01');
  const currentDate = new Date();
  const yearsOfExperience = currentDate.getFullYear() - startWorkingDate.getFullYear();

  const copyEmailToClipboard = () => {
    const email = 'warathep187@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showCopyAlert();
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  }

  const showCopyAlert = () => {
    // Remove any existing alert
    const existingAlert = document.getElementById('copy-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create the alert
    const alert = document.createElement('div');
    alert.id = 'copy-alert';
    alert.className = 'fixed top-20 left-1/2! transform -translate-x-1/2 z-50 glass rounded-2xl px-6 py-4 flex items-center space-x-3';
    alert.innerHTML = `
      <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <div>
        <p class="text-white font-semibold">Email Copied to Clipboard</p>
        <p class="text-gray-300 text-sm">warathep187@gmail.com</p>
      </div>
    `;

    // Add to DOM
    document.body.appendChild(alert);

    // Remove after 3 seconds with fade out
    setTimeout(() => {
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, 500);
    }, 3000);
  }
  
  app.innerHTML = `
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 glass">
      <div class="mx-auto px-4 py-2">
        <div class="flex justify-between items-center">
          <a href="#top" class="text-2xl font-bold text-white cursor-pointer hover:text-space-accent transition-colors" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <span class="text-glow">&lt;Warathep /&gt;</span>
          </a>
          <div class="hidden md:flex md:gap-6">
            <a href="#about" class="text-lg text-gray-300 hover:text-space-accent transition-colors">About Me</a>
            <a href="#skills" class="text-lg text-gray-300 hover:text-space-accent transition-colors">Skills</a>
            <a href="#education" class="text-lg text-gray-300 hover:text-space-accent transition-colors">Education</a>
            <a href="#experience" class="text-lg text-gray-300 hover:text-space-accent transition-colors">Experience</a>
            <a href="#projects" class="text-lg text-gray-300 hover:text-space-accent transition-colors">Projects</a>
          </div>
          <button id="mobile-menu-button" class="md:hidden text-white cursor-pointer hover:text-space-accent transition-colors">
            <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu Overlay -->
        <div id="mobile-menu" class="md:hidden hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div class="mobile-overlay-container flex items-center justify-center min-h-screen p-6">
            <div class="glass rounded-2xl p-8 w-full max-w-sm animate-fade-in">
              <h3 class="text-2xl font-bold text-white text-center mb-6">Navigation</h3>
              <div class="flex flex-col space-y-6">
                <a href="#about" class="text-lg text-center text-white hover:text-space-accent transition-all duration-300 mobile-nav-link hover:scale-105">About Me</a>
                <a href="#skills" class="text-lg text-center text-white hover:text-space-accent transition-all duration-300 mobile-nav-link hover:scale-105">Skills</a>
                <a href="#education" class="text-lg text-center text-white hover:text-space-accent transition-all duration-300 mobile-nav-link hover:scale-105">Education</a>
                <a href="#experience" class="text-lg text-center text-white hover:text-space-accent transition-all duration-300 mobile-nav-link hover:scale-105">Experience</a>
                <a href="#projects" class="text-lg text-center text-white hover:text-space-accent transition-all duration-300 mobile-nav-link hover:scale-105">Projects</a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section / About Me -->
    <section id="about" class="min-h-screen flex items-center justify-center px-6 pt-20">
      <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div class="reveal">
          <div class="relative">
            <div class="w-80 h-80 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-space-accent to-space-blue p-1 animate-glow">
              <div class="w-full h-full rounded-full bg-space-dark flex items-center justify-center overflow-hidden">
                <img src="/me.jpg" 
                     alt="Warathep" class="w-full h-full object-cover rounded-full">
              </div>
            </div>
            <div class="absolute -top-4 -right-4 w-8 h-8 bg-space-accent rounded-full animate-float"></div>
            <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-space-glow rounded-full animate-float" style="animation-delay: 2s;"></div>
          </div>
        </div>
        <div class="reveal text-center lg:text-left">
          <h1 class="text-5xl lg:text-7xl font-bold text-white mb-6">
            Hi, I'm <span class="text-glow text-space-accent">Warathep</span>
          </h1>
          <p class="text-xl text-gray-300 mb-4">Software Engineer</p>
          <p class="text-lg text-gray-400 mb-4 leading-relaxed">
            Passionate software engineer with ${yearsOfExperience} years of experience specializing in scalable software development 
            and platform engineering. I thrive on building robust, distributed systems that can handle massive scale while 
            maintaining reliability and performance. My expertise spans modern web development, sophisticated CI/CD pipelines, 
            and cloud-native infrastructure.
          </p>
          <p class="text-lg text-gray-400 mb-8 leading-relaxed">
            I believe in creating elegant solutions that not only solve today's problems 
            but are architected to evolve with tomorrow's challenges.
          </p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4 text-glow">
            Technical <span class="text-space-accent">Skills</span>
          </h2>
          <p class="text-gray-400 text-lg">Technologies and tools I familiar with</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Software Development Skills -->
          <div class="reveal glass rounded-2xl p-8 hover-glow">
            <h3 class="text-2xl font-bold text-space-accent mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
              Software Development
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">JavaScript / TypeScript</div>
                <div class="text-space-glow text-sm">Node.js, Next.js, Vanilla JS</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Next.js</div>
                <div class="text-space-glow text-sm">Tailwind CSS, DaisyUI, etc.</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Golang</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Python</div>
                <div class="text-space-glow text-sm">LLM Application, RAG, Machine Learning</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">NoSQL</div>
                <div class="text-space-glow text-sm">MongoDB, Redis, Elasticsearch</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">SQL</div>
                <div class="text-space-glow text-sm">MySQL, PostgreSQL</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Event Streaming</div>
                <div class="text-space-glow text-sm">Kafka, ksqlDB</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Testing</div>
                <div class="text-space-glow text-sm">Jest, Cypress</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Shell Scripting</div>
                <div class="text-space-glow text-sm">Bash, Zsh</div>
              </div>
            </div>
          </div>

          <!-- Platform Engineering Skills -->
          <div class="reveal glass rounded-2xl p-8 hover-glow">
            <h3 class="text-2xl font-bold text-space-accent mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"></path>
              </svg>
              Platform Engineering
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Docker</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Kubernetes</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">AWS</div>
                <div class="text-space-glow text-sm">EC2, EKS, etc.</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">CI/CD</div>
                <div class="text-space-glow text-sm">Gitlab CI, Jenkins, ArgoCD</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Terraform</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Ansible</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Monitoring</div>
                <div class="text-space-glow text-sm">Grafana, Prometheus, Jaeger, etc.</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Linux</div>
                <div class="text-space-glow text-sm">System Administration</div>
              </div>
              <div class="skill-item bg-space-midnight/50 p-4 rounded-lg">
                <div class="text-white font-semibold">Cloudflare</div>
                <div class="text-space-glow text-sm">Cloudflare Tunnel (for home server)</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4 text-glow">
            Academic <span class="text-space-accent">Journey</span>
          </h2>
          <p class="text-gray-400 text-lg">Educational background</p>
        </div>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-space-accent via-space-glow to-space-accent opacity-50"></div>
          
          <div class="space-y-12">
            <!-- Bachelor's Degree -->
            <div class="reveal flex items-start">
              <!-- Timeline Dot -->
              <div class="flex-shrink-0 w-16 h-16 bg-space-accent rounded-full flex items-center justify-center relative z-10 animate-glow">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              
              <!-- Content -->
              <div class="ml-8 glass rounded-2xl p-6 hover-glow flex-1">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                  <h3 class="text-2xl font-bold text-white">Bachelor of Computer Science</h3>
                  <span class="text-space-accent font-mono text-lg">2020 - 2024</span>
                </div>
                <a href="https://www.cmu.ac.th" target="_blank" class="block w-fit text-space-glow text-lg mb-3 hover:text-space-accent hover:underline">Chiang Mai University</a>
                <p class="text-gray-400 mb-4">
                  Specialized in Software Engineering with focus on database systems, software engineering, system design, and software architecture.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Database Systems</span>
                  <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Software Engineering</span>
                  <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">System Design</span>
                  <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Software Architecture</span>
                </div>
              </div>
            </div>

            <!-- Secondary School -->
            <div class="reveal flex items-start">
              <!-- Timeline Dot -->
              <div class="flex-shrink-0 w-16 h-16 bg-space-glow rounded-full flex items-center justify-center relative z-10 animate-float">
                <img src="/high-school-icon.svg" alt="Yupparaj Wittayalai School" class="w-8 h-8 -mt-[6px]" style="filter: invert(1);">
              </div>
              
              <!-- Content -->
              <div class="ml-8 glass rounded-2xl p-6 hover-glow flex-1">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                  <h3 class="text-2xl font-bold text-white">Secondary School</h3>
                  <span class="text-space-accent font-mono text-lg">2017 - 2020</span>
                </div>
                <a href="https://www.yupparaj.ac.th/index.php" target="_blank" class="block w-fit text-space-glow text-lg mb-3 hover:text-space-accent hover:underline">Yupparaj Wittayalai School</a>
                <p class="text-gray-400">
                  Science and Mathematics Program
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Working Experience Section -->
    <section id="experience" class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16 reveal">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4 text-glow">
            Working <span class="text-space-accent">Experience</span>
          </h2>
          <p class="text-gray-400 text-lg">My journey in the tech industry</p>
        </div>

        <div class="space-y-8">
          <div class="reveal glass rounded-2xl p-8 hover-glow">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 class="text-2xl font-bold text-white">Software Engineer</h3>
                <a href="https://www.thinknet.co.th" target="_blank" class="block w-fit text-space-glow text-lg hover:text-space-accent hover:underline">THiNKNET Co. Ltd.</a>
              </div>
              <span class="text-space-accent font-mono">2023 - Present</span>
            </div>
            <p class="text-gray-400 mb-4">
              Developed and maintained <a href="https://www.jobthai.com" target="_blank" class="text-space-glow font-bold hover:text-space-accent hover:underline">JobThai</a> (Job Search Platform).
            </p>
            <ul class="text-gray-400 space-y-2">
              <li class="flex items-start">
                <span class="text-space-accent mr-2">▸</span>
                Enhanced a Node.js service performance by applying Multi-threading technique to increase throughput to 4x. Also, apply thread pooling to make the service more efficient.
              </li>
              <li class="flex items-start">
                <span class="text-space-accent mr-2">▸</span>
                Enhanced a Node.js (Express.js) service performance by developing a new Validation Library, resulting in a 50% increase in throughput.
              </li>
              <li class="flex items-start">
                <span class="text-space-accent mr-2">▸</span>
                etc.
              </li>
            </ul>
            <div class="mt-4 flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Node.js</span>
              <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Microservices</span>
            </div>
          </div>

          <div class="reveal glass rounded-2xl p-8 hover-glow">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 class="text-2xl font-bold text-white">Software Engineer Intern</h3>
                <a href="https://www.thinknet.co.th" target="_blank" class="block w-fit text-space-glow text-lg hover:text-space-accent hover:underline">THiNKNET Co. Ltd.</a>
              </div>
              <span class="text-space-accent font-mono">6 Months</span>
            </div>
            <p class="text-gray-400 mb-4">
              Developed and maintained <a href="https://www.jobthai.com" target="_blank" class="text-space-glow font-bold hover:text-space-accent hover:underline">JobThai</a> (Job Search Platform).
            </p>
            <ul class="text-gray-400 space-y-2">
              <li class="flex items-start">
                <span class="text-space-accent mr-2">▸</span>
                Developed a library for rendering Cookie Consent UI for the company's websites.
              </li>
              <li class="flex items-start">
                <span class="text-space-accent mr-2">▸</span>
                Built End-to-End testing by using Cypress.js.
              </li>
            </ul>
            <div class="mt-4 flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Vanilla JavaScript</span>
              <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Node.js</span>
              <span class="px-3 py-1 bg-space-accent/20 text-space-accent rounded-full text-sm">Cypress.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Personal Projects Section -->
    <section id="projects" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-10 md:mb-14 reveal">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4 text-glow">
            Featured <span class="text-space-accent">Projects</span>
          </h2>
          <p class="text-gray-400 text-lg">Some of my favorite creations. If you want to see more, check out my <a href="https://github.com/Warathep187" target="_blank" class="text-space-glow font-bold hover:text-space-accent hover:underline">GitHub</a>.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div></div>

          <div class="reveal glass rounded-2xl p-6 hover-glow group">
            <div class="mb-4">
              <div class="w-full h-48 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">MGSH (MongoDB Shell Helper)</h3>
              <p class="text-gray-400 mb-4">
                A simple command-line tool to manage and connect to multiple MongoDB instances easily. This tool helps you organize and quickly access different MongoDB connections across various environments (development, production, etc.). Built on top of <a href="https://www.mongodb.com/docs/mongodb-shell/" target="_blank" class="text-space-glow font-bold hover:text-space-accent hover:underline">Mongo Shell</a>.
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-space-accent/20 text-space-accent rounded text-xs">Shell Script</span>
              </div>
              <div class="flex space-x-4">
                <a href="https://github.com/Warathep187/mgsh/blob/main/docs/demo.gif" target="_blank" class="text-space-accent hover:text-space-glow transition-colors">Live Demo</a>
                <a href="https://github.com/Warathep187/mgsh" target="_blank" class="text-space-accent hover:text-space-glow transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div class="reveal">
          <h2 class="text-4xl lg:text-5xl font-bold text-white mb-8 text-glow">
            Let's <span class="text-space-accent">Connect</span>
          </h2>
          <div class="flex flex-wrap justify-center gap-6">
            <div id="contact-email-button"
               class="glass cursor-pointer px-8 py-4 rounded-lg hover-glow flex items-center space-x-3 transition-all duration-300">
              <svg class="w-6 h-6 text-space-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span class="text-white">Email</span>
            </div>
            <a href="https://github.com/Warathep187" target="_blank" 
               class="glass px-8 py-4 rounded-lg hover-glow flex items-center space-x-3 transition-all duration-300">
              <svg class="w-6 h-6 text-space-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/warathep-komwongsa-092423231" target="_blank" 
               class="glass px-8 py-4 rounded-lg hover-glow flex items-center space-x-3 transition-all duration-300">
              <svg class="w-6 h-6 text-space-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
              </svg>
              <span class="text-white">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-space-accent/20">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-gray-400">
          © 2025 Warathep. Crafted with lots of ☕
        </p>
      </div>
    </footer>
  `;

  const contactEmailButton = document.getElementById('contact-email-button');
  contactEmailButton.addEventListener('click', copyEmailToClipboard);
}

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
  createPortfolio();
  createStars();
  setupScrollAnimations();
  setupNavigation();
  
  // Setup mobile menu after DOM is updated
  setTimeout(() => {
    setupMobileMenu();
  }, 0);
});
