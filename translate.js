const translations = {
  en: {
      portfolioTitle: "Jackie Harmon's Portfolio",
      english: "English",
      spanish: "Spanish",
      portuguese: "Portuguese",
      welcomeLink: "Welcome",
      portfolioLink: "Portfolio",
      contactLink: "Contact Me",
      resumeLink: "Resume",
      introTitle: "Welcome to my portfolio!",
      introText: "I am a versatile professional with a passion for leveraging technology to enhance efficiency in various industries. My portfolio showcases not only my teaching prowess but also my expertise as a data visualization consultant, biomedical research analyst, and biomedical technician. Additionally, you'll find some of my fun personal projects on my website, offering a glimpse into my creativity and innovation beyond the professional realm. Dive in to explore how my multifaceted skillset can make a difference in your projects and endeavors.",
      authorization: "I am authorized to work professionally in both the USA and Brazil.",
      github: "Check out my GitHub:",
      footer: "Copyright &copy; 2024 Jackie Harmon. All rights reserved."
  },
  es: {
      portfolioTitle: "Portafolio de Jackie Harmon",
      english: "Inglés",
      spanish: "Español",
      portuguese: "Portugués",
      welcomeLink: "Bienvenido",
      portfolioLink: "Portafolio",
      contactLink: "Contáctame",
      resumeLink: "Currículum",
      introTitle: "¡Bienvenido a mi portafolio!",
      introText: "Soy un profesional versátil con una pasión por aprovechar la tecnología para mejorar la eficiencia en diversas industrias. Mi portafolio muestra no solo mi destreza en la enseñanza, sino también mi experiencia como consultor de visualización de datos, analista de investigación biomédica y técnico biomédico. Además, encontrarás algunos de mis proyectos personales divertidos en mi sitio web, que ofrecen una visión de mi creatividad e innovación más allá del ámbito profesional. Sumérgete para explorar cómo mi conjunto de habilidades multifacéticas puede marcar la diferencia en tus proyectos y esfuerzos.",
      authorization: "Estoy autorizado para trabajar profesionalmente en los EE. UU. y Brasil.",
      github: "Mira mi GitHub:",
      footer: "Derechos de autor &copy; 2024 Jackie Harmon. Todos los derechos reservados."
  },
  pt: {
      portfolioTitle: "Portfólio de Jackie Harmon",
      english: "Inglês",
      spanish: "Espanhol",
      portuguese: "Português",
      welcomeLink: "Bem-vindo",
      portfolioLink: "Portfólio",
      contactLink: "Contate-me",
      resumeLink: "Currículo",
      introTitle: "Bem-vindo ao meu portfólio!",
      introText: "Sou um profissional versátil com uma paixão por alavancar a tecnologia para aumentar a eficiência em várias indústrias. Meu portfólio mostra não apenas minha destreza no ensino, mas também minha experiência como consultor de visualização de dados, analista de pesquisa biomédica e técnico biomédico. Além disso, você encontrará alguns dos meus projetos pessoais divertidos em meu site, oferecendo um vislumbre de minha criatividade e inovação além do campo profissional. Mergulhe para explorar como meu conjunto de habilidades multifacetadas pode fazer a diferença em seus projetos e empreendimentos.",
      authorization: "Estou autorizado a trabalhar profissionalmente tanto nos EUA quanto no Brasil.",
      github: "Confira meu GitHub:",
      footer: "Direitos autorais &copy; 2024 Jackie Harmon. Todos os direitos reservados."
  }
};

// Function to change the language
function changeLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
      const translateKey = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][translateKey]) {
          el.innerText = translations[lang][translateKey];
      }
  });
  setActiveLanguageButton(lang); // Set the active button
}
