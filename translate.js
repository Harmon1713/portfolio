const translations = {
  en: {
      // All
      portfolioTitle: "Jackie Harmon's Portfolio",
      english: "English",
      spanish: "Spanish",
      portuguese: "Portuguese",
      welcomeLink: "Welcome",
      portfolioLink: "Portfolio",
      contactLink: "Contact Me",
      resumeLink: "Resume",
      footer: "Copyright &copy; 2024 Jackie Harmon. All rights reserved.",
      // Welcome
      introTitle: "Welcome to my portfolio!",
      introText: "I am a versatile professional with a passion for leveraging technology to enhance efficiency in various industries. My portfolio showcases not only my teaching prowess but also my expertise as a data visualization consultant, biomedical research analyst, and biomedical technician. Additionally, you'll find some of my fun personal projects on my website, offering a glimpse into my creativity and innovation beyond the professional realm. Dive in to explore how my multifaceted skillset can make a difference in your projects and endeavors.",
      authorization: "I am authorized to work professionally in both the USA and Brazil.",
      github: "Check out my GitHub:",
      // Contact
      nameTitle: "Jackie Harmon",
      detailsTitle: "Details",
      detailsText1: "With a Master's degree in Informatics, coupled with Bachelor's degrees in Engineering and Spanish, my academic background reflects a diverse intersection of disciplines. My professional journey includes roles as a professor, data visualization consultant and a biomedical engineering technician. Moreover, my experience working in multiple continents and proficiency in multiple languages allow me to collaborate effectively across borders and cultures.",
      detailsText2: "Please reach out to me so we can discuss how our skills and experiences can help each other achieve our goals.",
      contactInfoTitle: "Contact Info",
      email: "Email: jacquelynn.harmon@gmail.com",
      phone: "Phone: +1(470)836-5409"
  },
  es: {
      // Todo
      portfolioTitle: "Portafolio de Jackie Harmon",
      english: "Inglés",
      spanish: "Español",
      portuguese: "Portugués",
      welcomeLink: "Bienvenido",
      portfolioLink: "Portafolio",
      contactLink: "Contáctame",
      resumeLink: "Currículum",
            footer: "Derechos de autor &copy; 2024 Jackie Harmon. Todos los derechos reservados.",
      // Bienvenido
      introTitle: "¡Bienvenido a mi portafolio!",
      introText: "Soy un profesional versátil con una pasión por aprovechar la tecnología para mejorar la eficiencia en diversas industrias. Mi portafolio muestra no solo mi destreza en la enseñanza, sino también mi experiencia como consultor de visualización de datos, analista de investigación biomédica y técnico biomédico. Además, encontrarás algunos de mis proyectos personales divertidos en mi sitio web, que ofrecen una visión de mi creatividad e innovación más allá del ámbito profesional. Sumérgete para explorar cómo mi conjunto de habilidades multifacéticas puede marcar la diferencia en tus proyectos y esfuerzos.",
      authorization: "Estoy autorizado para trabajar profesionalmente en los EE. UU. y Brasil.",
      github: "Mira mi GitHub:",
      // Contáctame
      nameTitle: "Jackie Harmon",
      detailsTitle: "Detalles",
      detailsText1: "Con una maestría en informática, junto con licenciaturas en ingeniería y español, mi formación académica refleja una intersección diversa de disciplinas. Mi trayectoria profesional incluye roles como profesor, consultor de visualización de datos y técnico en ingeniería biomédica. Además, mi experiencia trabajando en múltiples continentes y mi dominio de varios idiomas me permiten colaborar eficazmente a través de fronteras y culturas.",
      detailsText2: "Póngase en contacto conmigo para que podamos discutir cómo nuestras habilidades y experiencias pueden ayudarnos a alcanzar nuestros objetivos.",
      contactInfoTitle: "Información de Contacto",
      email: "Correo Electrónico: jacquelynn.harmon@gmail.com",
      phone: "Teléfono: +1(470)836-5409"
  },
  pt: {
      // Todo
      portfolioTitle: "Portfólio de Jackie Harmon",
      english: "Inglês",
      spanish: "Espanhol",
      portuguese: "Português",
      welcomeLink: "Bem-vindo",
      portfolioLink: "Portfólio",
      contactLink: "Contate-me",
      resumeLink: "Currículo",
      footer: "Direitos autorais &copy; 2024 Jackie Harmon. Todos os direitos reservados.",
      // Bem-vindo
      introTitle: "Bem-vindo ao meu portfólio!",
      introText: "Sou um profissional versátil com uma paixão por alavancar a tecnologia para aumentar a eficiência em várias indústrias. Meu portfólio mostra não apenas minha destreza no ensino, mas também minha experiência como consultor de visualização de dados, analista de pesquisa biomédica e técnico biomédico. Além disso, você encontrará alguns dos meus projetos pessoais divertidos em meu site, oferecendo um vislumbre de minha criatividade e inovação além do campo profissional. Mergulhe para explorar como meu conjunto de habilidades multifacetadas pode fazer a diferença em seus projetos e empreendimentos.",
      authorization: "Estou autorizado a trabalhar profissionalmente tanto nos EUA quanto no Brasil.",
      github: "Confira meu GitHub:",
      // Contate-me
      nameTitle: "Jackie Harmon",
      detailsTitle: "Detalhes",
      detailsText1: "Com um mestrado em Informática, junto com bacharelados em Engenharia e Espanhol, minha formação acadêmica reflete uma interseção diversificada de disciplinas. Minha trajetória profissional inclui funções como professor, consultor de visualização de dados e técnico em engenharia biomédica. Além disso, minha experiência de trabalho em vários continentes e minha proficiência em vários idiomas me permitem colaborar efetivamente através de fronteiras e culturas.",
      detailsText2: "Entre em contato comigo para que possamos discutir como nossas habilidades e experiências podem nos ajudar a alcançar nossos objetivos.",
      contactInfoTitle: "Informações de Contato",
      email: "Email: jacquelynn.harmon@gmail.com",
      phone: "Telefone: +1(470)836-5409"
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
