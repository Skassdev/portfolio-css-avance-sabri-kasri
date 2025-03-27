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
      } else {
        project.style.display = 'none';
      }
    });
  });
});

// Animation des barres de compétences
function animateSkills() {
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(level => {
    const width = level.style.width;
    level.style.width = '0';
    
    setTimeout(() => {
      level.style.width = width;
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
let animated = false;

function checkIfSkillsIsVisible() {
  if (isElementInViewport(skillsSection) && !animated) {
    animateSkills();
    animated = true;
  }
}

// Vérifier au chargement de la page et au scroll
window.addEventListener('load', checkIfSkillsIsVisible);
window.addEventListener('scroll', checkIfSkillsIsVisible);

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