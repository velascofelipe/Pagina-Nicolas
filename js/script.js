function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
  }
  
  // Cerrar menú al hacer clic en enlace
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("nav-links").classList.remove("active");
    });
  });
  