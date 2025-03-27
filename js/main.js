// Menu mobile
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});

// Filtrage des projets
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');

filters.forEach(filter => {
  filter.addEventListener('click', function() {
    // Retirer la classe active de tous les filtres
    filters.forEach(f => f.classList.remove('active'));
    
    // Ajouter la classe active au filtre cliqué
    this.classList.add('active');
    
    // Récupérer la valeur du filtre
    const filterValue = this.getAttribute('data-filter');
    
    // Filtrer les projets
    projects.forEach(project => {
      if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
        project.style.display = 'block';
        
        // Ajouter une animation pour les projets qui apparaissent
        setTimeout(() => {
          project.style.opacity = '1';
          project.style.transform = 'translateY(0)';
        }, 100);
      } else {
        project.style.opacity = '0';
        project.style.transform = 'translateY(20px)';
        
        // Masquer après l'animation
        setTimeout(() => {
          project.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Animation des barres de compétences
function animateSkills() {
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(level => {
    const width = level.style.width;
    level.style.setProperty('--skill-width', width);
    level.style.width = '0';
    
    setTimeout(() => {
      level.classList.add('animate');
    }, 300);
  });
}

// Fonction pour vérifier si un élément est visible dans la fenêtre
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Observer pour déclencher les animations
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

// Animation des éléments au scroll
const animateElements = document.querySelectorAll('.animate-element');
const animatedElements = new Set();

function checkElementsInView() {
  // Animer les barres de compétences
  if (skillsSection && isElementInViewport(skillsSection) && !skillsAnimated) {
    animateSkills();
    skillsAnimated = true;
  }
  
  // Animer les éléments au scroll
  animateElements.forEach(element => {
    if (isElementInViewport(element) && !animatedElements.has(element)) {
      element.classList.add('animated');
      animatedElements.add(element);
    }
  });
}

// Vérifier au chargement de la page et au scroll
window.addEventListener('load', checkElementsInView);
window.addEventListener('scroll', checkElementsInView);

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Thème jour/nuit
const themeToggle = document.getElementById('theme-toggle');

// Vérifier si un thème est stocké dans localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.checked = true;
}

// Changer le thème quand le bouton est cliqué
themeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
});

// Curseur personnalisé
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  
  const follower = document.createElement('div');
  follower.classList.add('cursor-follower');
  
  document.body.appendChild(cursor);
  document.body.appendChild(follower);
  document.body.classList.add('custom-cursor');
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Le follower suit avec un léger délai pour un effet plus fluide
    setTimeout(() => {
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    }, 50);
  });
  
  // Effet d'agrandissement sur les éléments interactifs
  const interactiveElements = document.querySelectorAll('a, button, .btn, .filter, .menu-btn, .project-card, input, textarea, .social-icon');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
      follower.classList.add('expand-follower');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
      follower.classList.remove('expand-follower');
    });
  });
  
  // Effet de clic
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    follower.style.transform = 'translate(-50%, -50%) scale(0.7)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

// Initialiser le curseur personnalisé
initCustomCursor();

// Micro-interactions supplémentaires
document.addEventListener('DOMContentLoaded', () => {
  // Animation de pulse pour le logo au hover
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.animation = 'pulse 0.8s ease-in-out';
    });
    
    logo.addEventListener('animationend', () => {
      logo.style.animation = '';
    });
  }
  
  // Animation des boutons sociaux
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateY(-5px) rotate(15deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
  });
  
  // Effet visuel sur les champs du formulaire
  const formInputs = document.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
  
  // Animation pour l'image de profil
  const profileImage = document.querySelector('.image-box');
  if (profileImage) {
    profileImage.addEventListener('mouseenter', () => {
      profileImage.style.transform = 'rotate(3deg) scale(1.02)';
    });
    
    profileImage.addEventListener('mouseleave', () => {
      profileImage.style.transform = '';
    });
  }
  
  // Feedback tactile sur les cartes de projet
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'translateY(-10px)';
      }, 100);
    });
  });
});