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
      footer: "Copyright © 2024 Jackie Harmon. All rights reserved.",
      scrollTopBtn: "^",
      // Welcome
      introTitle: "Welcome to my portfolio!",
      introText:
        "I am a versatile professional with a passion for leveraging technology to enhance efficiency in various industries. My portfolio showcases not only my teaching prowess but also my expertise as a data visualization consultant, biomedical research analyst, and biomedical technician. Additionally, you'll find some of my fun personal projects on my website, offering a glimpse into my creativity and innovation beyond the professional realm. Dive in to explore how my multifaceted skillset can make a difference in your projects and endeavors.",
      authorization: "I am authorized to work professionally in both the USA and Brazil.",
      github: "Check out my GitHub:",
      //Portfolio
      skills: "I'm skilled in:",
      skillPrompt:
        "Click the icons below to see examples of my skillset, or search by skill. Each project is a hyperlink to the source materials. To view all projects, search for 'all'.",
      frontend: "Front-End Development",
      appDev: "Application Development",
      dataViz: "Data Visualization",
      techWriting: "Technical Writing",
      cadDrafting: "CAD Drafting",
      research: "Research",
      frontendModal: "Front-End Development",
      cppApp: "Portfolio Website",
      cpp: "HTML (Bootstrap), CSS, JavaScript (jQuery, popper)",
      frontendContent: "In this portfolio project, I have leveraged a range of technical skills to create a dynamic and responsive web experience. The project employs HTML with Bootstrap for layout and design, ensuring responsive and mobile-friendly content. CSS manipulation is used extensively to dynamically adjust styles based on user interactions. JavaScript ES6 features enhance code readability and efficiency. The portfolio demonstrates asynchronous programming with the Fetch API for retrieving JSON data. DOM manipulation is employed to update content and styles dynamically, while event handling sets up interactions. The project also includes conditional logic to control application flow and array operations using methods like forEach, filter, and map for data manipulation. The use of local storage ensures language preferences are saved, providing a tailored user experience across sessions. Additionally, error handling and debugging techniques are implemented to manage exceptions and trace computations, ensuring reliable functionality throughout the application.",
      appDevModal: "Application Development",
      giraffeApp: "Giraffe Warmer Maintenance Application",
      pythonSqlite: "Python (tkinter, datetime, SQLite), SQL",
      giraffeAppContent:
        "This Python program is a maintenance tracking application for Giraffe Warmers, typically used in neonatal care. The application features a user-friendly graphical interface that allows users to add, update, and monitor the maintenance records of Giraffe Warmer machines. It uses SQLite for its backend database to store serial numbers, maintenance dates, and logs, enabling robust data handling through CRUD operations. Key technical skills include GUI development, event handling, and date manipulation; it also emphasizes error handling and data validation to ensure smooth operation. This project exemplifies a practical application of combining software development skills with domain-specific knowledge, showcasing the ability to develop a functional and specialized tool for industry-specific needs.",
      snakeGame: "Snake Game Application",
      pygameSqlite: "Python (Pygame, SQLite), SQL",
      snakeGameContent:
        "This Python program showcases a fully functional snake game, incorporating advanced game mechanics, GUI elements, and database operations. The gameplay is enhanced with responsive control mechanisms through keyboard inputs and dynamically adjusts the interface with an interactive menu system. Additionally, the code integrates SQLite to manage player usernames, scores, and times. Key technical skills displayed include game design principles, object-oriented programming, event handling, and CRUD operations with SQLite, highlighting a comprehensive understanding of both game development and database management.",
      dataVizModal: "Data Visualization",
      TravelMap: "Interactive Travel Map",
      TravelMapContent:
        "This interactive map showcases my travels, demonstrating advanced technical skills in data manipulation, visualization, and web applications. The map is created using D3.js and rendered using GeoJSON data fetched from an external source and filtered into a custom dataset to highlight visited countries. The projection and path functions of D3.js are utilized to convert the GeoJSON data into precise Scalable Vector Graphics (SVG) paths. Interactive features include zoom controls and custom tooltips, which provide images from my travels when hovering over a country. This project not only highlights my proficiency in HTML, CSS, and JavaScript, but also my ability to create rich, interactive web applications that combine technical precision with engaging storytelling.",
      clickToInteract: "Click here to interact with the visualization:",
      Graphs: "Interactive Graphs",
      GraphsContent:
        "These interactive graphs were developed using a combination of advanced R programming techniques and data visualization tools. To add interactivity, the ggiraph package was utilized, enabling the inclusion of interactive tooltips and dynamic elements that enhance user engagement. Additionally, the patchwork package was used to combine multiple graphs into cohesive visualizations, while htmlwidgets facilitated the export of these interactive plots as standalone HTML files. This seamless integration of R's data manipulation, visualization, and interactivity capabilities demonstrates a strong understanding of data science and web technologies, culminating in an engaging and interactive user experience. The integration of these graphs into web applications enables real-time updates and interactions, making the visualizations a dynamic part of the web experience. This approach not only engages users but also makes complex data more accessible and understandable to a broader audience, ensuring that insights and findings are effectively communicated and shared.",
      techWritingModal: "Technical Writing",
      giraffeGuide: "User Guide: Giraffe Warmer Maintenance Application",
      markdownToPdf: "Developed in Markdown; converted to PDF",
      giraffeGuideContent:
        "This user guide for a GUI Application helps BMETs operate the software that manages maintenance records for GE Giraffe Warmers. It's designed for ease of use, featuring a clickable table of contents that navigates to specific sections for efficient information retrieval. The guide covers installation, operations, error handling, and troubleshooting. Each section includes annotated screenshots and clear, step-by-step directions. Developed using Markdown for straightforward updates, this guide enables users to optimize the application’s features for improved performance and accuracy, ensuring reliable compliance in medical settings.",
      snakeGameGuide: "Course Documentation - ITEC2270: Application Development",
      markdownLaTex: "Markdown, LaTex, Pandoc, Python (matplotlib)",
      snakeGameGuideContent:
        "This course documentation outlines the design, structure, evolution, and key components of Application Development. It includes an in-depth course overview detailing its primary focus on modifying arcade or tabletop games using Python and SQL. It reviews the evolution of the course timeline based on student feedback, describing original, adjusted, and proposed future timelines. The course structure is detailed, specifying objectives, required Python libraries, prerequisite knowledge, resources, and student deliverables. Additionally, the documentation evaluates the course assessment criteria, highlights lessons learned, and proposes improvements for future iterations. It also lists instructional materials, including videos, answer keys, and workshops, and discusses project management, including planning, execution, evaluation, and feedback mechanisms.",
      cad_draftingModal: "CAD Drafting",
      researchInventor: "Research: uses Inventor, CAD, Drafting",
      ankle_joint: "Development of a Mobile Ankle Joint Attachment For the Universal Prosthesis",
      prostheticsmodalcontent:
        "The 'Development of a Mobile Ankle Joint Attachment for the Universal Prosthesis' aimed to address walking complications for below-knee amputees experiencing muscle atrophy. The project involved designing a mobile ankle joint prosthetic attachment to promote muscle rehabilitation and improve gait. Key technical skills utilized included extensive use of CAD software, specifically AutoCAD Inventor, for detailed design and 3D modeling, as well as creating 3D-printed prototypes for initial testing. The project involved developing gears and mechanical components using precision milling machines and MasterCAM for gear manufacturing. Testing included stability and functionality checks, a range of motion tests for dorsiflexion and plantarflexion, and materials testing to ensure durability and safety. Electrical system integration involved programming microcontrollers and creating a circuit to control the motor, simulating natural ankle movements based on pressure inputs. The project spanned several months, requiring effective teamwork and coordination with multiple participants and advisors, resulting in a functional prototype, design sketches, and comprehensive technical documentation.",
      container_home: "Container Home",
      techDocComingSoon:"Technical documentation coming soon", 
      containerHomeModalContent:
        "This tiny home project planning is ongoing, with full technical documentation coming soon. It will provide detailed information on every aspect of the design, including CAD designs and engineering drawings. Each section of the document is organized to guide the construction process, from initial site preparation to final touches. Additionally, the document outlines materials needed, such as insulation, flooring, and plumbing fixtures, complete with sources and costs. This detailed documentation ensures that the project is executed efficiently and meets all safety and quality standards.",
      researchModal: "Research",
      matscan: "The Study of Injury Biomechanics in the Wrist/Hand and Ankle/Foot for Tumbling Using the MatScan",
      researchMatScan: "Research: uses MatScan, Tekscan",
      biomechanicsmodalcontent:
        "The study 'The Study of Injury Biomechanics in the Wrist/Hand and Ankle/Foot for Tumbling Using the MatScan' involved utilizing a range of technical skills integral to biomechanical research and data analysis. These skills included setting up and calibrating the MatScan system for accurate pressure measurements during tumbling exercises, and using specialized software (Tekscan Research 6.70) to capture and analyze detailed pressure data, identifying high-risk injury areas. The study also involved conducting thorough biomechanical assessments to correlate pressure trends with potential injuries. Managing and analyzing video recordings, combined with systematic data interpretation, demonstrated competence in applying advanced research tools and methodologies to enhance injury prevention and performance in sports.",
      boneComparison: "Comparing the Mechanical Properties of Cancellous Bone between Pig Femur Bone, Deer Femur Bone, and Human Humerus Bone",
      researchMTS:"Research: uses Material Testing System (MTS)",
      bonemodalcontent:
        "In the research paper 'Comparing the Mechanical Properties of Cancellous Bone between Pig Femur Bone, Deer Femur Bone, and Human Humerus Bone,' a variety of technical skills were utilized. The study involved advanced biomaterials research and mechanical testing techniques, particularly focusing on the axial stress, strain, and Young’s modulus of bone samples. The Material Testing System (MTS) was employed to apply controlled compressive forces to the samples, simulating real-world stress conditions and generating detailed data on bone behavior under load. The process required precise sample preparation, including cutting and measuring bone samples, and conducting displacement and force measurements to calculate stress and strain. Data analysis was performed using graphical methods to interpret the stress-strain relationships and determine the elastic modulus for each bone type. This research demonstrated skills in experimental design, advanced material testing, data collection and analysis, computational modeling, and the application of mechanical principles to biomaterials.",
      searchButton:"Search",
        // Contact
      nameTitle: "Jackie Harmon",
      detailsTitle: "Details",
      detailsText1:
        "With a Master's degree in Informatics, coupled with Bachelor's degrees in Engineering and Spanish, my academic background reflects a diverse intersection of disciplines. My professional journey includes roles as a professor, data visualization consultant and a biomedical engineering technician. Moreover, my experience working in multiple continents and proficiency in multiple languages allow me to collaborate effectively across borders and cultures.",
      detailsText2:
        "Please reach out to me so we can discuss how our skills and experiences can help each other achieve our goals.",
      contactInfoTitle: "Contact Info",
      // Resume
      references:
        "References are available upon request. Unofficial transcripts, as well as certificates, are hyperlinked. If you want my resume, it is available in PDF format.",
      summaryQualifications: "SUMMARY OF QUALIFICATIONS",
      qualifications:
        "Background in programming and engineering. Skilled in code development and review, including creating documentation for software and IT processes. Proficient in translating complex technical information into clear, user-friendly manuals and guides. Excellent organizational and planning abilities, committed to delivering projects on time and within scope. Proven track record of collaborating with project managers, analysts, and subject matter experts to produce high-quality materials that meets regulatory requirements.",
      languagesTitle: "LANGUAGES",
      languages:
        "English (native) | Spanish (fluent) | Portuguese (fluent) | Mandarin (beginner)",
      technicalSkillsTitle: "TECHNICAL SKILLS",
      technicalSkills:
        "Technical Writing | HTML | Markdown | Microsoft Office Suite | Project Management | Python | C++ | CSS | JavaScript | Posit Cloud / R | Tableau | MATLAB | LabVIEW | SPSS | MiniTab | MySQL | SQLite3 | AutoDesk Inventor",
      militaryServiceTitle: "MILITARY SERVICE",
      militaryService: "US Army 2012-2016",
      workExperienceTitle: "WORK EXPERIENCE",
      westcliffUniversity: "Westcliff University",
      westcliffDates: "2/2023 - present",
      westcliffPosition:
        "ADJUNCT PROFESSOR (COLLEGE OF TECHNOLOGY & ENGINEERING)",
      westcliffTask1:
        "Graduate courses: Introduction to Data Analytics, Cloud Data Visualization, and Data in Artificial Intelligence & Machine Learning.",
      westcliffTask2:
        "Undergraduate course in the College of Business: Foundations of Statistics",
      middleGAStateUniversity: "Middle GA State University",
      middleGADates: "5/2023 – 5/2024",
      middleGAPosition: "LECTURER & ADJUNCT PROFESSOR (SCHOOL OF COMPUTING)",
      middleGATask1:
        "Undergraduate courses: Introduction to Computer Programming, Application Development, Web Development, Human-Computer Interaction, and FinTech.",
      claytonCountySchoolDistrict: "Clayton County School District",
      claytonCountyDates: "10/2022 - 8/2023",
      claytonCountyPosition: "SOFTWARE DEVELOPMENT TEACHER",
      claytonCountyTask1:
        "Created state curriculum documents and faculty training materials for the GADOE 9-12 IST (Intro to Software Technology) course, covering Cloud Computing, Computer Science, Game Design, Internet of Things, Programming, Web and Digital Design, and Web Development pathways.",
      iFood: "iFood",
      iFoodDates: "8/2019 - 2/2022",
      iFoodPosition: "DATA VISUALIZATION CONSULTANT (BRASILIA, BRAZIL)",
      iFoodTask1:
        "Collaborated with the cybersecurity team to document the implementation of a temporary Purple Team.",
      iFoodTask2:
        "Presented detailed technical reports and developed documentation solutions for international partners, facilitating clear communication of complex data insights.",
      iFoodTask3:
        "Created and maintained documentation for data visualization tools and processes.",
      nuBank: "NuBank",
      nuBankDates: "8/2019 - 2/2022",
      nuBankPosition: "DATA VISUALIZATION CONSULTANT (BRASILIA, BRAZIL)",
      nuBankTask1:
        "Worked closely with market risk analysts to document data analysis processes and create detailed risk dashboards, ensuring accuracy and clarity in the presentation of risk data.",
      nuBankTask2:
        "Developed standardized documentation and training guides to support the use of data visualization tools and techniques within the team.",
      navicentHealth: "Navicent Health Medical Center",
      navicentHealthDates: "10/2016 - 11/2018",
      navicentHealthPosition1: "ROBOTIC SURGERY RESEARCH ANALYST",
      navicentHealthTask1:
        "Provided prescriptive analytics and developed detailed reports with data collected from reconstructive surgery projects, documenting methodologies and findings until project completion.",
      navicentHealthPosition2: "BIOMEDICAL ENGINEERING TECHNICIAN II",
      navicentHealthTask2:
        "Debugged hospital equipment for ICU, PICU, and NNICU, maintaining detailed service logs and technical documentation.",
      navicentHealthTask3:
        "Mentored two interns, developing training materials that facilitated their successful transition into permanent positions.",
      internshipsTitle: "INTERNSHIPS",
      internship1:
        "Navicent Health Medical Center | Fall 2016 | BIOMEDICAL ENGINEERING TECHNICIAN INTERN",
      internship2:
        "Vein Specialists of the South | Summer 2014 | BIOFLUIDS / BIOMECHANICS RESEARCH ANALYST INTERN",
      internship3:
        "Mercer University | Spring 2014 | NANOPARTICLES RESEARCH ANALYST INTERN",
      projectsTitle: "PROJECTS",
      project1:
        "Development of a Mobile Ankle Joint Attachment for the Universal Prosthesis | 2016",
      project2:
        "Comparing the Mechanical Properties of Cancellous Bone between Pig Femur Bone, Deer Femur Bone, and Human Humerus Bone | 2016",
      project3:
        "The Study of Injury Biomechanics in the Wrist/Hand and Ankle/Foot for Tumbling Using the MatScan | 2015",
      educationTitle: "EDUCATION",
      education1: "MSIT Health Informatics | Middle Georgia State University | 2018 | 4.0",
      education2: "BSE Biomedical Engineering | Mercer University | 2016 | 3.4",
      education3: "BA Spanish | Mercer University | 2016 | 3.4.",
      coursesCertificationsTitle: "COURSES AND CERTIFICATIONS",
      certification1:
        "Professional Certification in Data Science | Entity Academy & Woz U | 2023",
      certification2:
        "Engineering Technology Education I & II | GACE | 2022 | Passed-professional",
      certification3:
        "Leadership Development and Assessment Course | United States Army | 2016 | Top 15%",
      awardsHonorSocietiesTitle: "AWARDS AND HONOR SOCIETIES",
      award1: "Distinguished Military Graduate",
      award2: "Tau Beta Pi (Engineering Honor Society)",
      award3: "Phi Sigma Iota (Foreign Language Honor Society)",
      award4: "Alpha Phi Omega (National Service Fraternity)",
      award5: "HS Valedictorian",
      award6: "HS STAR Student (SAT)",
      volunteeringTitle: "VOLUNTEERING OPPORTUNITIES",
      volunteering1: "Fulbright Scholar Program (Summer 2023)",
      volunteering2: "Head Softball Coach (Spring 2022)",
      volunteering3: "Missionary (Fall 2019)",
      volunteering4: "Honduras Outreach, Inc (Summer 2015)",
      guestSpeakingTitle: "GUEST SPEAKING OPPORTUNITIES",
      speaking1:
        "Rotary Club of Griffin, GA (3/2023, 2/2018, 8/2013, 4/2012)",
      speaking2: "Kiwanis Club of Griffin, GA (4/2018)",
      speaking3:
        "GA Board of Education Annual Teacher Luncheon and Workshop (4/2014)",
      speaking4: "National Bank Outstanding Student Banquet (3/2013)",
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
      footer: "Derechos de autor © 2024 Jackie Harmon. Todos los derechos reservados.",
      scrollTopBtn: "^",
      // Bienvenido
      introTitle: "¡Bienvenido a mi portafolio!",
      introText:
        "Soy una profesional versátil con una pasión por aprovechar la tecnología para mejorar la eficiencia en diversas industrias. Mi portafolio muestra no solo mi destreza en la enseñanza, sino también mi experiencia como consultora de visualización de datos, analista de investigación biomédica y técnica biomédica. Además, encontrarás algunos de mis proyectos personales divertidos en mi sitio web, que ofrecen una visión de mi creatividad e innovación más allá del ámbito profesional. Sumérgete para explorar cómo mi conjunto de habilidades multifacéticas puede marcar la diferencia en tus proyectos y esfuerzos.",
      authorization: "Estoy autorizado para trabajar profesionalmente en los EE. UU. y Brasil.",
      github: "Mira mi GitHub:",
      // Portafolio
      skills: "Tengo habilidades en:",
      skillPrompt:
        "Haz clic en los íconos a continuación para ver ejemplos de mis habilidades, o busca por habilidad. Cada proyecto es un hipervínculo a los materiales fuente. Para ver todos los proyectos, busca 'todo'.",
      frontend: "Desarrollo Front-End",
      appDev: "Desarrollo de Aplicaciones",
      dataViz: "Visualización de Datos",
      techWriting: "Redacción Técnica",
      cadDrafting: "Diseño CAD",
      research: "Investigación",
      frontendModal: "Desarrollo Front-End",
      cppApp: "Sitio Web del Portafolio",
      cpp: "HTML (Bootstrap), CSS, JavaScript (jQuery, popper)",
      frontendContent: "En este proyecto de portafolio, he aprovechado una gama de habilidades técnicas para crear una experiencia web dinámica y receptiva. El proyecto emplea HTML con Bootstrap para el diseño y la disposición, asegurando contenido receptivo y amigable para móviles. Se utiliza ampliamente la manipulación de CSS para ajustar dinámicamente los estilos basados en las interacciones del usuario. Las características de JavaScript ES6 mejoran la legibilidad y eficiencia del código. El portafolio demuestra programación asíncrona con el API Fetch para recuperar datos JSON. La manipulación del DOM se utiliza para actualizar el contenido y los estilos dinámicamente, mientras que el manejo de eventos establece interacciones. El proyecto también incluye lógica condicional para controlar el flujo de la aplicación y operaciones de arrays usando métodos como forEach, filter y map para la manipulación de datos. El uso de almacenamiento local garantiza que las preferencias de idioma se guarden, proporcionando una experiencia de usuario personalizada a través de las sesiones. Además, se implementan técnicas de manejo de errores y depuración para gestionar excepciones y rastrear cálculos, asegurando una funcionalidad confiable en toda la aplicación.",
      appDevModal: "Desarrollo de Aplicaciones",
      giraffeApp: "Aplicación de Mantenimiento de Calentadores Giraffe",
      pythonSqlite: "Python (tkinter, datetime, SQLite), SQL",
      giraffeAppContent:
        "Este programa de Python es una aplicación de seguimiento de mantenimiento para calentadores Giraffe, típicamente utilizados en el cuidado neonatal. La aplicación cuenta con una interfaz gráfica fácil de usar que permite a los usuarios agregar, actualizar y monitorear los registros de mantenimiento de las máquinas de calentadores Giraffe. Utiliza SQLite para su base de datos de backend para almacenar números de serie, fechas de mantenimiento y registros, lo que permite un manejo robusto de datos a través de operaciones CRUD. Las habilidades técnicas clave incluyen desarrollo de interfaces gráficas, manejo de eventos y manipulación de fechas; también enfatiza el manejo de errores y la validación de datos para asegurar una operación fluida. Este proyecto ejemplifica una aplicación práctica de la combinación de habilidades de desarrollo de software con conocimientos específicos del dominio, mostrando la capacidad de desarrollar una herramienta funcional y especializada para necesidades específicas de la industria.",
      snakeGame: "Aplicación del Juego de la Serpiente",
      pygameSqlite: "Python (Pygame, SQLite), SQL",
      snakeGameContent:
        "Este programa de Python muestra un juego de serpiente completamente funcional, que incorpora mecánicas de juego avanzadas, elementos de interfaz gráfica y operaciones de base de datos. La jugabilidad se mejora con mecanismos de control receptivos a través de entradas de teclado y ajusta dinámicamente la interfaz con un sistema de menú interactivo. Además, el código integra SQLite para gestionar nombres de usuario de jugadores, puntuaciones y tiempos. Las habilidades técnicas clave mostradas incluyen principios de diseño de juegos, programación orientada a objetos, manejo de eventos y operaciones CRUD con SQLite, destacando una comprensión integral tanto del desarrollo de juegos como de la gestión de bases de datos.",
      dataVizModal: "Visualización de Datos",
      TravelMap: "Mapa Interactivo de Viajes",
      TravelMapContent:
        "Este mapa interactivo muestra mis viajes, demostrando habilidades técnicas avanzadas en manipulación de datos, visualización y aplicaciones web. El mapa se crea usando D3.js y se representa utilizando datos GeoJSON obtenidos de una fuente externa y filtrados en un conjunto de datos personalizado para resaltar los países visitados. Las funciones de proyección y ruta de D3.js se utilizan para convertir los datos GeoJSON en rutas precisas de Gráficos Vectoriales Escalables (SVG). Las características interactivas incluyen controles de zoom y consejos personalizados, que proporcionan imágenes de mis viajes al pasar el cursor sobre un país. Este proyecto no solo resalta mi competencia en HTML, CSS y JavaScript, sino también mi capacidad para crear aplicaciones web ricas e interactivas que combinan precisión técnica con narraciones atractivas.",
      clickToInteract:"Haz clic aquí para interactuar con la visualización:",
      Graphs: "Gráficos Interactivos",
      GraphsContent:
        "Estos gráficos interactivos se desarrollaron utilizando una combinación de técnicas avanzadas de programación en R y herramientas de visualización de datos. Para agregar interactividad, se utilizó el paquete ggiraph, lo que permite la inclusión de consejos interactivos y elementos dinámicos que mejoran el compromiso del usuario. Además, se utilizó el paquete patchwork para combinar múltiples gráficos en visualizaciones cohesivas, mientras que htmlwidgets facilitó la exportación de estos gráficos interactivos como archivos HTML independientes. Esta integración fluida de la manipulación de datos, visualización y capacidades de interactividad de R demuestra una sólida comprensión de la ciencia de datos y tecnologías web, culminando en una experiencia de usuario atractiva e interactiva. La integración de estos gráficos en aplicaciones web permite actualizaciones e interacciones en tiempo real, haciendo que las visualizaciones sean una parte dinámica de la experiencia web. Este enfoque no solo involucra a los usuarios, sino que también hace que los datos complejos sean más accesibles y comprensibles para un público más amplio, asegurando que las ideas y hallazgos se comuniquen y compartan de manera efectiva.",
      techWritingModal: "Redacción Técnica",
      giraffeGuide: "Guía de Usuario: Aplicación de Mantenimiento de Calentadores Giraffe",
      markdownToPdf: "Desarrollado en Markdown; convertido a PDF",
      giraffeGuideContent:
        "Esta guía de usuario para una aplicación de interfaz gráfica ayuda a los BMETs a operar el software que gestiona los registros de mantenimiento para los calentadores GE Giraffe. Está diseñada para facilitar el uso, con una tabla de contenido con enlaces que navega a secciones específicas para una recuperación eficiente de información. La guía cubre la instalación, operaciones, manejo de errores y resolución de problemas. Cada sección incluye capturas de pantalla anotadas e instrucciones claras, paso a paso. Desarrollado utilizando Markdown para actualizaciones sencillas, esta guía permite a los usuarios optimizar las funciones de la aplicación para mejorar el rendimiento y la precisión, asegurando el cumplimiento confiable en entornos médicos.",
      snakeGameGuide: "Documentación del Curso - ITEC2270: Desarrollo de Aplicaciones",
      markdownLaTex: "Markdown, LaTex, Pandoc, Python (matplotlib)",
      snakeGameGuideContent:
        "Esta documentación del curso describe el diseño, estructura, evolución y componentes clave del Desarrollo de Aplicaciones. Incluye una visión general del curso en profundidad que detalla su enfoque principal en modificar juegos de arcade o de mesa utilizando Python y SQL. Revisa la evolución del cronograma del curso basado en comentarios de los estudiantes, describiendo los cronogramas originales, ajustados y propuestos para el futuro. La estructura del curso se detalla, especificando objetivos, bibliotecas de Python requeridas, conocimientos previos, recursos y entregables de los estudiantes. Además, la documentación evalúa los criterios de evaluación del curso, destaca las lecciones aprendidas y propone mejoras para futuras iteraciones. También enumera materiales de instrucción, incluidos videos, claves de respuestas y talleres, y discute la gestión de proyectos, incluyendo planificación, ejecución, evaluación y mecanismos de retroalimentación.",
      cad_draftingModal: "Diseño CAD",
      researchInventor: "Investigación: utiliza Inventor, CAD, Borrador",
      ankle_joint: "Desarrollo de un Anexo de Articulación de Tobillo Móvil para la Prótesis Universal",
      prostheticsmodalcontent:
        "El 'Desarrollo de un Anexo de Articulación de Tobillo Móvil para la Prótesis Universal' tenía como objetivo abordar las complicaciones para caminar en amputados por debajo de la rodilla que experimentan atrofia muscular. El proyecto involucró el diseño de un anexo protésico de articulación de tobillo móvil para promover la rehabilitación muscular y mejorar la marcha. Las habilidades técnicas clave utilizadas incluyeron el uso extensivo de software CAD, específicamente AutoCAD Inventor, para el diseño detallado y modelado 3D, así como la creación de prototipos impresos en 3D para pruebas iniciales. El proyecto implicó el desarrollo de engranajes y componentes mecánicos utilizando máquinas de fresado de precisión y MasterCAM para la fabricación de engranajes. Las pruebas incluyeron controles de estabilidad y funcionalidad, pruebas de rango de movimiento para dorsiflexión y flexión plantar, y pruebas de materiales para garantizar durabilidad y seguridad. La integración del sistema eléctrico involucró la programación de microcontroladores y la creación de un circuito para controlar el motor, simulando movimientos naturales del tobillo basados en entradas de presión. El proyecto se extendió durante varios meses, requiriendo un trabajo en equipo efectivo y coordinación con múltiples participantes y asesores, resultando en un prototipo funcional, bocetos de diseño y documentación técnica integral.",
      container_home: "Casa Contenedor",
      techDocComingSoon:"Documentación técnica próximamente", 
      containerHomeModalContent:
        "La planificación de este proyecto de casa pequeña está en curso, y la documentación técnica completa estará disponible pronto. Proporcionará información detallada sobre todos los aspectos del diseño, incluidas las vistas CAD y los dibujos de ingeniería. Cada sección del documento está organizada para guiar el proceso de construcción, desde la preparación inicial del sitio hasta los toques finales. Además, el documento describe los materiales necesarios, como aislamiento, pisos y accesorios de plomería, completos con fuentes y costos. Esta documentación detallada asegura que el proyecto se ejecute de manera eficiente y cumpla con todos los estándares de seguridad y calidad.",
      researchModal: "Investigación",
      matscan: "El Estudio de la Biomecánica de Lesiones en la Muñeca/Mano y Tobillo/Pie para Acrobacias Usando el MatScan",
      researchMatScan: "Investigación: utiliza MatScan, Tekscan",
      biomechanicsmodalcontent:
        "El estudio 'El Estudio de la Biomecánica de Lesiones en la Muñeca/Mano y Tobillo/Pie para Acrobacias Usando el MatScan' involucró el uso de una gama de habilidades técnicas integrales para la investigación biomecánica y el análisis de datos. Estas habilidades incluyeron la configuración y calibración del sistema MatScan para obtener mediciones de presión precisas durante ejercicios de acrobacias, y el uso de software especializado (Tekscan Research 6.70) para capturar y analizar datos de presión detallados, identificando áreas de alto riesgo de lesiones. El estudio también involucró realizar evaluaciones biomecánicas exhaustivas para correlacionar las tendencias de presión con posibles lesiones. La gestión y el análisis de grabaciones de video, combinados con la interpretación sistemática de datos, demostraron competencia en la aplicación de herramientas de investigación avanzadas y metodologías para mejorar la prevención de lesiones y el rendimiento en deportes.",
      boneComparison: "Comparación de las Propiedades Mecánicas del Hueso Esponjoso entre el Hueso del Fémur de Cerdo, el Hueso del Fémur de Ciervo y el Hueso del Húmero Humano",
      researchMTS:"Investigación: utiliza Material Testing System (MTS)",
      bonemodalcontent:
        "En el documento de investigación 'Comparación de las Propiedades Mecánicas del Hueso Esponjoso entre Hueso de Fémur de Cerdo, Hueso de Fémur de Ciervo y Hueso de Húmero Humano,' se utilizaron una variedad de habilidades técnicas. El estudio involucró investigación avanzada de biomateriales y técnicas de pruebas mecánicas, particularmente centrándose en el estrés axial, la deformación y el módulo de Young de las muestras de hueso. Se utilizó el Sistema de Pruebas de Materiales (MTS) para aplicar fuerzas de compresión controladas a las muestras, simulando condiciones de estrés del mundo real y generando datos detallados sobre el comportamiento del hueso bajo carga. El proceso requirió una preparación precisa de muestras, incluyendo el corte y medición de muestras de hueso, y la realización de mediciones de desplazamiento y fuerza para calcular el estrés y la deformación. El análisis de datos se realizó utilizando métodos gráficos para interpretar las relaciones de estrés-deformación y determinar el módulo elástico para cada tipo de hueso. Esta investigación demostró habilidades en diseño experimental, pruebas avanzadas de materiales, recopilación y análisis de datos, modelado computacional y la aplicación de principios mecánicos a biomateriales.",
        searchButton:"Search",
        // Contáctame
      nameTitle: "Jackie Harmon",
      detailsTitle: "Detalles",
      detailsText1:
        "Con una maestría en informática, junto con licenciaturas en ingeniería y español, mi formación académica refleja una intersección diversa de disciplinas. Mi trayectoria profesional incluye roles como profesora, consultora de visualización de datos y técnica en ingeniería biomédica. Además, mi experiencia trabajando en múltiples continentes y mi dominio de varios idiomas me permiten colaborar eficazmente a través de fronteras y culturas.",
      detailsText2:
        "Póngase en contacto conmigo para que podamos discutir cómo nuestras habilidades y experiencias pueden ayudarnos a alcanzar nuestros objetivos.",
      contactInfoTitle: "Información de Contacto",
      // Currículum
      references:
        "Las referencias están disponibles a pedido. Las transcripciones no oficiales, así como los certificados, están vinculados. Si desea mi currículum, está disponible en formato PDF.",
      summaryQualifications: "RESUMEN DE CALIFICACIONES",
      qualifications:
        "Experiencia en programación e ingeniería. Hábil en el desarrollo y revisión de código, incluyendo la creación de documentación para software y procesos de TI. Proficiente en traducir información técnica compleja en manuales y guías fáciles de usar. Excelentes habilidades organizativas y de planificación, comprometida a entregar proyectos a tiempo y dentro del alcance. Historial comprobado de colaboración con gerentes de proyecto, analistas y expertos en la materia para producir materiales de alta calidad que cumplen con los requisitos regulatorios.",
      languagesTitle: "IDIOMAS",
      languages:
        "Inglés (nativo) | Español (fluido) | Portugués (fluido) | Mandarín (principiante)",
      technicalSkillsTitle: "HABILIDADES TÉCNICAS",
      technicalSkills:
        "Redacción técnica | HTML | Markdown | Microsoft Office Suite | Gestión de proyectos | Python | C++ | CSS | JavaScript | Posit Cloud / R | Tableau | MATLAB | LabVIEW | SPSS | MiniTab | MySQL | SQLite3 | AutoDesk Inventor",
      militaryServiceTitle: "SERVICIO MILITAR",
      militaryService: "Ejército de los EE. UU. 2012-2016",
      workExperienceTitle: "EXPERIENCIA LABORAL",
      westcliffUniversity: "Westcliff University",
      westcliffDates: "2/2023 - presente",
      westcliffPosition:
        "PROFESOR ADJUNTO (FACULTAD DE TECNOLOGÍA E INGENIERÍA)",
      westcliffTask1:
        "Cursos de posgrado: Introducción a la Analítica de Datos, Visualización de Datos en la Nube y Datos en Inteligencia Artificial y Aprendizaje Automático.",
      westcliffTask2:
        "Curso de pregrado en la Facultad de Negocios: Fundamentos de Estadística",
      middleGAStateUniversity: "Middle GA State University",
      middleGADates: "5/2023 – 5/2024",
      middleGAPosition: "PROFESOR TITULAR Y ADJUNTO (ESCUELA DE COMPUTACIÓN)",
      middleGATask1:
        "Cursos de pregrado: Introducción a la Programación Informática, Desarrollo de Aplicaciones, Desarrollo Web, Interacción Humano-Computadora y FinTech.",
      claytonCountySchoolDistrict: "Clayton County School District",
      claytonCountyDates: "10/2022 - 8/2023",
      claytonCountyPosition: "PROFESOR DE DESARROLLO DE SOFTWARE",
      claytonCountyTask1:
        "Creó documentos curriculares estatales y materiales de capacitación para el curso GADOE 9-12 IST (Introducción a la Tecnología de Software), que cubren la Computación en la Nube, Ciencia de la Computación, Diseño de Juegos, Internet de las Cosas, Programación, Diseño Web y Digital, y Vías de Desarrollo Web.",
      iFood: "iFood",
      iFoodDates: "8/2019 - 2/2022",
      iFoodPosition: "CONSULTOR DE VISUALIZACIÓN DE DATOS (BRASILIA, BRASIL)",
      iFoodTask1:
        "Colaboró con el equipo de ciberseguridad para documentar la implementación de un Equipo Púrpura temporal.",
      iFoodTask2:
        "Presentó informes técnicos detallados y desarrolló soluciones de documentación para socios internacionales, facilitando la comunicación clara de ideas complejas.",
      iFoodTask3:
        "Creó y mantuvo documentación para herramientas y procesos de visualización de datos.",
      nuBank: "NuBank",
      nuBankDates: "8/2019 - 2/2022",
      nuBankPosition: "CONSULTOR DE VISUALIZACIÓN DE DATOS (BRASILIA, BRASIL)",
      nuBankTask1:
        "Trabajó en estrecha colaboración con analistas de riesgos de mercado para documentar procesos de análisis de datos y crear paneles de riesgos detallados, asegurando precisión y claridad en la presentación de datos de riesgo.",
      nuBankTask2:
        "Desarrolló documentación estandarizada y guías de capacitación para apoyar el uso de herramientas y técnicas de visualización de datos dentro del equipo.",
      navicentHealth: "Navicent Health Medical Center",
      navicentHealthDates: "10/2016 - 11/2018",
      navicentHealthPosition1: "ANALISTA DE INVESTIGACIÓN DE CIRUGÍA ROBÓTICA",
      navicentHealthTask1:
        "Proporcionó análisis prescriptivos y desarrolló informes detallados con datos recopilados de proyectos de cirugía reconstructiva, documentando metodologías y hallazgos hasta la finalización del proyecto.",
      navicentHealthPosition2: "TÉCNICO BIOMÉDICO II",
      navicentHealthTask2:
        "Depuró equipos hospitalarios para UCI, UCIP y UNIC, manteniendo registros de servicio detallados y documentación técnica.",
      navicentHealthTask3:
        "Mentoró a dos pasantes, desarrollando materiales de capacitación que facilitaron su transición exitosa a puestos permanentes.",
      internshipsTitle: "PASANTÍAS",
      internship1:
        "Navicent Health Medical Center | Otoño 2016 | PASANTE DE TÉCNICO BIOMÉDICO",
      internship2:
        "Vein Specialists of the South | Verano 2014 | PASANTE DE ANÁLISIS DE BIOFLUIDOS / BIOMECÁNICA",
      internship3:
        "Mercer University | Primavera 2014 | PASANTE DE ANÁLISIS DE NANOPARTÍCULAS",
      projectsTitle: "PROYECTOS",
      project1:
        "Desarrollo de un Adaptador de Articulación de Tobillo Móvil para la Prótesis Universal | 2016",
      project2:
        "Comparación de las Propiedades Mecánicas del Hueso Esponjoso entre Hueso de Fémur de Cerdo, Hueso de Fémur de Ciervo y Hueso de Húmero Humano | 2016",
      project3:
        "El Estudio de la Biomecánica de Lesiones en la Muñeca/Mano y Tobillo/Pie para Acrobacias Usando el MatScan | 2015",
      educationTitle: "EDUCACIÓN",
      education1: "MSIT Informática de la Salud | Middle Georgia State University | 2018 | 4.0",
      education2: "BSE Ingeniería Biomédica | Mercer University | 2016 | 3.4",
      education3: "BA Español | Mercer University | 2016 | 3.4.",
      coursesCertificationsTitle: "CURSOS Y CERTIFICACIONES",
      certification1:
        "Certificación Profesional en Ciencia de Datos | Entity Academy & Woz U | 2023",
      certification2:
        "Educación en Tecnología de Ingeniería I & II | GACE | 2022 | Aprobado-profesional",
      certification3:
        "Curso de Desarrollo y Evaluación de Liderazgo | Ejército de los EE. UU. | 2016 | Top 15%",
      awardsHonorSocietiesTitle: "PREMIOS Y SOCIEDADES DE HONOR",
      award1: "Graduado Militar Distinguido",
      award2: "Tau Beta Pi (Sociedad de Honor de Ingeniería)",
      award3: "Phi Sigma Iota (Sociedad de Honor de Lenguas Extranjeras)",
      award4: "Alpha Phi Omega (Fraternidad Nacional de Servicio)",
      award5: "Valedictorian de HS",
      award6: "Estudiante Estrella de HS (SAT)",
      volunteeringTitle: "OPORTUNIDADES DE VOLUNTARIADO",
      volunteering1: "Programa de Becarios Fulbright (Verano 2023)",
      volunteering2: "Entrenador Principal de Softbol (Primavera 2022)",
      volunteering3: "Misionero (Otoño 2019)",
      volunteering4: "Honduras Outreach, Inc (Verano 2015)",
      guestSpeakingTitle: "OPORTUNIDADES PARA HABLAR COMO INVITADO",
      speaking1:
        "Club Rotario de Griffin, GA (3/2023, 2/2018, 8/2013, 4/2012)",
      speaking2: "Club Kiwanis de Griffin, GA (4/2018)",
      speaking3:
        "Almuerzo y Taller Anual de Maestros de la Junta de Educación de GA (4/2014)",
      speaking4: "Banquete de Estudiantes Destacados del Banco Nacional (3/2013)",
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
      footer: "Direitos autorais © 2024 Jackie Harmon. Todos os direitos reservados.",
      scrollTopBtn: "^",
      // Bem-vindo
      introTitle: "Bem-vindo ao meu portfólio!",
      introText:
        "Sou uma profissional versátil com uma paixão por alavancar a tecnologia para aumentar a eficiência em várias indústrias. Meu portfólio mostra não apenas minha destreza no ensino, mas também minha experiência como consultora de visualização de dados, analista de pesquisa biomédica e técnica biomédica. Além disso, você encontrará alguns dos meus projetos pessoais divertidos em meu site, oferecendo um vislumbre de minha criatividade e inovação além do campo profissional. Mergulhe para explorar como meu conjunto de habilidades multifacetadas pode fazer a diferença em seus projetos e empreendimentos.",
      authorization: "Estou autorizado a trabalhar profissionalmente tanto nos EUA quanto no Brasil.",
      github: "Confira meu GitHub:",
      //Portfólio
      skills: "Sou habilidoso em:",
      skillPrompt:
        "Clique nos ícones abaixo para ver exemplos do meu conjunto de habilidades ou pesquise por habilidade. Cada projeto é um hiperlink para os materiais de origem. Para ver todos os projetos, pesquise 'todos'.",
      frontend: "Desenvolvimento Front-End",
      appDev: "Desenvolvimento de Aplicações",
      dataViz: "Visualização de Dados",
      techWriting: "Redação Técnica",
      cadDrafting: "Desenho CAD",
      research: "Pesquisa",
      frontendModal: "Desenvolvimento Front-End",
      cppApp: "Site do Portfólio",
      cpp: "HTML (Bootstrap), CSS, JavaScript (jQuery, popper)",
      frontendContent:"Neste projeto de portfólio, utilizei uma gama de habilidades técnicas para criar uma experiência web dinâmica e responsiva. O projeto emprega HTML com Bootstrap para layout e design, garantindo conteúdo responsivo e amigável para dispositivos móveis. A manipulação de CSS é usada extensivamente para ajustar estilos dinamicamente com base nas interações do usuário. As funcionalidades do JavaScript ES6 melhoram a legibilidade e eficiência do código. O portfólio demonstra programação assíncrona com a API Fetch para recuperar dados JSON. A manipulação do DOM é empregada para atualizar o conteúdo e os estilos dinamicamente, enquanto o manuseio de eventos configura interações. O projeto também inclui lógica condicional para controlar o fluxo da aplicação e operações de arrays usando métodos como forEach, filter e map para manipulação de dados. O uso de armazenamento local garante que as preferências de idioma sejam salvas, proporcionando uma experiência de usuário personalizada entre as sessões. Além disso, técnicas de tratamento de erros e depuração são implementadas para gerenciar exceções e rastrear cálculos, garantindo funcionalidade confiável em toda a aplicação.",
      appDevModal: "Desenvolvimento de Aplicações",
      giraffeApp: "Aplicativo de Manutenção de Aquecedores Giraffe",
      pythonSqlite: "Python (tkinter, datetime, SQLite), SQL",
      giraffeAppContent:
        "Este programa em Python é um aplicativo de rastreamento de manutenção para Aquecedores Giraffe, geralmente usados em cuidados neonatais. O aplicativo possui uma interface gráfica amigável que permite aos usuários adicionar, atualizar e monitorar os registros de manutenção das máquinas Aquecedores Giraffe. Ele utiliza SQLite para seu banco de dados backend para armazenar números de série, datas de manutenção e registros, permitindo um manuseio robusto de dados através de operações CRUD. As principais habilidades técnicas incluem desenvolvimento de GUI, manuseio de eventos e manipulação de datas; também enfatiza o tratamento de erros e validação de dados para garantir uma operação suave. Este projeto exemplifica uma aplicação prática da combinação de habilidades de desenvolvimento de software com conhecimento específico de domínio, mostrando a capacidade de desenvolver uma ferramenta funcional e especializada para necessidades específicas da indústria.",
      snakeGame: "Aplicativo do Jogo da Cobra",
      pygameSqlite: "Python (Pygame, SQLite), SQL",
      snakeGameContent:
        "Este programa em Python mostra um jogo de cobra totalmente funcional, incorporando mecânicas de jogo avançadas, elementos de GUI e operações de banco de dados. A jogabilidade é aprimorada com mecanismos de controle responsivos através de entradas de teclado e ajusta dinamicamente a interface com um sistema de menu interativo. Além disso, o código integra o SQLite para gerenciar nomes de usuário, pontuações e tempos dos jogadores. As habilidades técnicas principais exibidas incluem princípios de design de jogos, programação orientada a objetos, manuseio de eventos e operações CRUD com SQLite, destacando uma compreensão abrangente tanto do desenvolvimento de jogos quanto da gestão de bancos de dados.",
      dataVizModal: "Visualização de Dados",
      TravelMap: "Mapa Interativo de Viagens",
      TravelMapContent:
        "Este mapa interativo mostra minhas viagens, demonstrando habilidades técnicas avançadas em manipulação de dados, visualização e aplicações web. O mapa é criado usando D3.js e renderizado usando dados GeoJSON obtidos de uma fonte externa e filtrados em um conjunto de dados personalizado para destacar os países visitados. As funções de projeção e caminho do D3.js são utilizadas para converter os dados GeoJSON em caminhos precisos de Gráficos Vetoriais Escaláveis (SVG). Os recursos interativos incluem controles de zoom e dicas personalizadas, que fornecem imagens de minhas viagens ao passar o mouse sobre um país. Este projeto não apenas destaca minha proficiência em HTML, CSS e JavaScript, mas também minha capacidade de criar aplicações web ricas e interativas que combinam precisão técnica com narrações envolventes.",
      clickToInteract:"Clique aqui para interagir com a visualização:",
      Graphs: "Gráficos Interativos",
      GraphsContent:
        "Esses gráficos interativos foram desenvolvidos usando uma combinação de técnicas avançadas de programação em R e ferramentas de visualização de dados. Para adicionar interatividade, foi utilizado o pacote ggiraph, permitindo a inclusão de dicas interativas e elementos dinâmicos que melhoram o engajamento do usuário. Além disso, o pacote patchwork foi usado para combinar múltiplos gráficos em visualizações coesas, enquanto o htmlwidgets facilitou a exportação desses gráficos interativos como arquivos HTML autônomos. Esta integração perfeita das capacidades de manipulação de dados, visualização e interatividade do R demonstra uma forte compreensão da ciência de dados e tecnologias web, culminando em uma experiência de usuário envolvente e interativa. A integração desses gráficos em aplicações web permite atualizações e interações em tempo real, tornando as visualizações uma parte dinâmica da experiência web. Essa abordagem não só envolve os usuários, mas também torna os dados complexos mais acessíveis e compreensíveis para um público mais amplo, garantindo que os insights e descobertas sejam comunicados e compartilhados de forma eficaz.",
      techWritingModal: "Redação Técnica",
      giraffeGuide: "Guia do Usuário: Aplicativo de Manutenção de Aquecedores Giraffe",
      markdownToPdf: "Desenvolvido em Markdown; convertido para PDF",
      giraffeGuideContent:
        "Este guia do usuário para um aplicativo de GUI ajuda os BMETs a operarem o software que gerencia os registros de manutenção para os Aquecedores GE Giraffe. Ele foi projetado para facilitar o uso, apresentando um índice clicável que navega para seções específicas para recuperação eficiente de informações. O guia cobre instalação, operações, manuseio de erros e resolução de problemas. Cada seção inclui capturas de tela anotadas e instruções claras, passo a passo. Desenvolvido usando Markdown para atualizações diretas, este guia permite que os usuários otimizem os recursos do aplicativo para melhorar o desempenho e a precisão, garantindo conformidade confiável em ambientes médicos.",
      snakeGameGuide: "Documentação do Curso - ITEC2270: Desenvolvimento de Aplicações",
      markdownLaTex: "Markdown, LaTex, Pandoc, Python (matplotlib)",
      snakeGameGuideContent:
        "Esta documentação do curso descreve o design, estrutura, evolução e componentes principais do Desenvolvimento de Aplicações. Inclui uma visão geral do curso detalhada, destacando seu foco principal na modificação de jogos de arcade ou de mesa usando Python e SQL. Revisa a evolução do cronograma do curso com base no feedback dos alunos, descrevendo os cronogramas originais, ajustados e propostos para o futuro. A estrutura do curso é detalhada, especificando objetivos, bibliotecas Python necessárias, conhecimentos prévios, recursos e entregas dos alunos. Além disso, a documentação avalia os critérios de avaliação do curso, destaca as lições aprendidas e propõe melhorias para futuras iterações. Também lista materiais de instrução, incluindo vídeos, chaves de respostas e workshops, e discute a gestão de projetos, incluindo planejamento, execução, avaliação e mecanismos de feedback.",
      cad_draftingModal: "Desenho CAD",
      researchInventor: "Pesquisa: usa Inventor, CAD, Rascunho",
      ankle_joint: "Desenvolvimento de um Anexo de Articulação de Tornozelo Móvel para a Próteses Universal",
      prostheticsmodalcontent:
        "O 'Desenvolvimento de um Anexo de Articulação de Tornozelo Móvel para a Próteses Universal' visou abordar complicações de caminhada para amputados abaixo do joelho que experimentam atrofia muscular. O projeto envolveu o design de um anexo protético de articulação de tornozelo móvel para promover a reabilitação muscular e melhorar a marcha. As habilidades técnicas principais utilizadas incluíram o uso extensivo de software CAD, especificamente o AutoCAD Inventor, para design detalhado e modelagem 3D, além da criação de protótipos impressos em 3D para testes iniciais. O projeto envolveu o desenvolvimento de engrenagens e componentes mecânicos usando máquinas de fresagem de precisão e MasterCAM para fabricação de engrenagens. Os testes incluíram verificações de estabilidade e funcionalidade, testes de amplitude de movimento para dorsiflexão e flexão plantar, e testes de materiais para garantir durabilidade e segurança. A integração do sistema elétrico envolveu a programação de microcontroladores e a criação de um circuito para controlar o motor, simulando movimentos naturais do tornozelo com base em entradas de pressão. O projeto se estendeu por vários meses, exigindo trabalho em equipe eficaz e coordenação com vários participantes e consultores, resultando em um protótipo funcional, esboços de design e documentação técnica abrangente.",
      container_home: "Casa Container",
      techDocComingSoon:"Documentação técnica em breve", 
      containerHomeModalContent:
        "O planejamento deste projeto de casa pequena está em andamento, e a documentação técnica completa estará disponível em breve. Fornecerá informações detalhadas sobre todos os aspectos do design, incluindo vistas CAD e desenhos de engenharia. Cada seção do documento está organizada para guiar o processo de construção, desde a preparação inicial do local até os toques finais. Além disso, o documento descreve os materiais necessários, como isolamento, pisos e acessórios de encanamento, completos com fontes e custos. Esta documentação detalhada garante que o projeto seja executado de forma eficiente e atenda a todos os padrões de segurança e qualidade.",
      researchModal: "Pesquisa",
      matscan: "O Estudo da Biomecânica de Lesões no Pulso/Mão e Tornozelo/Pé para Acrobacias Usando o MatScan",
      researchMatScan: "Pesquisa: usa MatScan, Tekscan",
      biomechanicsmodalcontent:
        "O estudo 'O Estudo da Biomecânica de Lesões no Pulso/Mão e Tornozelo/Pé para Acrobacias Usando o MatScan' envolveu a utilização de uma gama de habilidades técnicas integrais para a pesquisa biomecânica e análise de dados. Essas habilidades incluíram a configuração e calibração do sistema MatScan para obter medições precisas de pressão durante exercícios de acrobacia, e o uso de software especializado (Tekscan Research 6.70) para capturar e analisar dados detalhados de pressão, identificando áreas de alto risco de lesões. O estudo também envolveu realizar avaliações biomecânicas abrangentes para correlacionar as tendências de pressão com possíveis lesões. A gestão e análise de gravações de vídeo, combinadas com a interpretação sistemática de dados, demonstraram competência na aplicação de ferramentas avançadas de pesquisa e metodologias para melhorar a prevenção de lesões e o desempenho em esportes.",
      boneComparison: "Comparação das Propriedades Mecânicas do Osso Esponjoso entre o Osso do Fêmur de Porco, o Osso do Fêmur de Veado e o Osso do Úmero Humano",
      researchMTS:"Pesquisa: usa Material Testing System (MTS)",
      bonemodalcontent: "No artigo de pesquisa 'Comparando as Propriedades Mecânicas do Osso Esponjoso entre Osso de Fêmur de Porco, Osso de Fêmur de Veado e Osso de Úmero Humano,' foram utilizadas uma variedade de habilidades técnicas. O estudo envolveu pesquisa avançada de biomateriais e técnicas de testes mecânicos, particularmente focando no estresse axial, deformação e módulo de Young das amostras de osso. O Sistema de Testes de Materiais (MTS) foi utilizado para aplicar forças de compressão controladas às amostras, simulando condições de estresse do mundo real e gerando dados detalhados sobre o comportamento do osso sob carga. O processo exigiu uma preparação precisa das amostras, incluindo corte e medição das amostras de osso, e realização de medições de deslocamento e força para calcular o estresse e a deformação. A análise de dados foi realizada usando métodos gráficos para interpretar as relações de estresse-deformação e determinar o módulo elástico para cada tipo de osso. Esta pesquisa demonstrou habilidades em design experimental, testes avançados de materiais, coleta e análise de dados, modelagem computacional e aplicação de princípios mecânicos a biomateriais.",
      // Contate-me
      nameTitle: "Jackie Harmon",
      detailsTitle: "Detalhes",
      detailsText1:
        "Com um mestrado em Informática, junto com bacharelados em Engenharia e Espanhol, minha formação acadêmica reflete uma interseção diversificada de disciplinas. Minha trajetória profissional inclui funções como professora, consultora de visualização de dados e técnica em engenharia biomédica. Além disso, minha experiência de trabalho em vários continentes e minha proficiência em vários idiomas me permitem colaborar efetivamente através de fronteiras e culturas.",
      detailsText2:
        "Entre em contato comigo para que possamos discutir como nossas habilidades e experiências podem nos ajudar a alcançar nossos objetivos.",
      contactInfoTitle: "Informações de Contato",
      // Currículo
      references:
        "Referências estão disponíveis mediante solicitação. Transcrições não oficiais, bem como certificados, estão hiperligados. Se você quiser meu currículo, ele está disponível em formato PDF.",
      summaryQualifications: "RESUMO DAS QUALIFICAÇÕES",
      qualifications:
        "Experiência em programação e engenharia. Hábil no desenvolvimento e revisão de código, incluindo a criação de documentação para software e processos de TI. Proficiência em traduzir informações técnicas complexas em manuais e guias fáceis de usar. Excelentes habilidades organizacionais e de planejamento, comprometida com a entrega de projetos no prazo e dentro do escopo. Histórico comprovado de colaboração com gerentes de projeto, analistas e especialistas no assunto para produzir materiais de alta qualidade que atendem aos requisitos regulamentares.",
      languagesTitle: "IDIOMAS",
      languages:
        "Inglês (nativo) | Espanhol (fluente) | Português (fluente) | Mandarim (iniciante)",
      technicalSkillsTitle: "HABILIDADES TÉCNICAS",
      technicalSkills:
        "Redação técnica | HTML | Markdown | Microsoft Office Suite | Gerenciamento de Projetos | Python | C++ | CSS | JavaScript | Posit Cloud / R | Tableau | MATLAB | LabVIEW | SPSS | MiniTab | MySQL | SQLite3 | AutoDesk Inventor",
      militaryServiceTitle: "SERVIÇO MILITAR",
      militaryService: "Exército dos EUA 2012-2016",
      workExperienceTitle: "EXPERIÊNCIA PROFISSIONAL",
      westcliffUniversity: "Westcliff University",
      westcliffDates: "2/2023 - presente",
      westcliffPosition:
        "PROFESSOR ADJUNTO (FACULDADE DE TECNOLOGIA E ENGENHARIA)",
      westcliffTask1:
        "Cursos de pós-graduação: Introdução à Análise de Dados, Visualização de Dados na Nuvem e Dados em Inteligência Artificial e Aprendizado de Máquina.",
      westcliffTask2:
        "Curso de graduação na Faculdade de Negócios: Fundamentos de Estatística",
      middleGAStateUniversity: "Middle GA State University",
      middleGADates: "5/2023 – 5/2024",
      middleGAPosition: "PROFESSOR TITULAR E ADJUNTO (ESCOLA DE COMPUTAÇÃO)",
      middleGATask1:
        "Cursos de graduação: Introdução à Programação de Computadores, Desenvolvimento de Aplicações, Desenvolvimento Web, Interação Humano-Computador e FinTech.",
      claytonCountySchoolDistrict: "Clayton County School District",
      claytonCountyDates: "10/2022 - 8/2023",
      claytonCountyPosition: "PROFESSOR DE DESENVOLVIMENTO DE SOFTWARE",
      claytonCountyTask1:
        "Criou documentos curriculares estaduais e materiais de treinamento para o curso GADOE 9-12 IST (Introdução à Tecnologia de Software), cobrindo Computação em Nuvem, Ciência da Computação, Design de Jogos, Internet das Coisas, Programação, Design Digital e Web, e Caminhos de Desenvolvimento Web.",
      iFood: "iFood",
      iFoodDates: "8/2019 - 2/2022",
      iFoodPosition: "CONSULTOR DE VISUALIZAÇÃO DE DADOS (BRASÍLIA, BRASIL)",
      iFoodTask1:
        "Colaborou com a equipe de cibersegurança para documentar a implementação de uma Equipe Púrpura temporária.",
      iFoodTask2:
        "Apresentou relatórios técnicos detalhados e desenvolveu soluções de documentação para parceiros internacionais, facilitando a comunicação clara de ideias complexas.",
      iFoodTask3:
        "Criou e manteve documentação para ferramentas e processos de visualização de dados.",
      nuBank: "NuBank",
      nuBankDates: "8/2019 - 2/2022",
      nuBankPosition: "CONSULTOR DE VISUALIZAÇÃO DE DADOS (BRASÍLIA, BRASIL)",
      nuBankTask1:
        "Trabalhou em estreita colaboração com analistas de risco de mercado para documentar processos de análise de dados e criar painéis de risco detalhados, garantindo precisão e clareza na apresentação dos dados de risco.",
      nuBankTask2:
        "Desenvolveu documentação padronizada e guias de treinamento para apoiar o uso de ferramentas e técnicas de visualização de dados dentro da equipe.",
      navicentHealth: "Navicent Health Medical Center",
      navicentHealthDates: "10/2016 - 11/2018",
      navicentHealthPosition1: "ANALISTA DE PESQUISA EM CIRURGIA ROBÓTICA",
      navicentHealthTask1:
        "Forneceu análises prescritivas e desenvolveu relatórios detalhados com dados coletados de projetos de cirurgia reconstrutiva, documentando metodologias e descobertas até a conclusão do projeto.",
      navicentHealthPosition2: "TÉCNICO EM ENGENHARIA BIOMÉDICA II",
      navicentHealthTask2:
        "Depurou equipamentos hospitalares para UTI, UCIP e UCIN, mantendo registros detalhados de serviço e documentação técnica.",
      navicentHealthTask3:
        "Mentorou dois estagiários, desenvolvendo materiais de treinamento que facilitaram sua transição bem-sucedida para posições permanentes.",
      internshipsTitle: "ESTÁGIOS",
      internship1:
        "Navicent Health Medical Center | Outono 2016 | ESTAGIÁRIO DE TÉCNICO EM ENGENHARIA BIOMÉDICA",
      internship2:
        "Vein Specialists of the South | Verão 2014 | ESTAGIÁRIO DE ANÁLISE DE BIOFLUIDOS / BIOMECÂNICA",
      internship3:
        "Mercer University | Primavera 2014 | ESTAGIÁRIO DE ANÁLISE DE NANOPARTÍCULAS",
      projectsTitle: "PROJETOS",
      project1:
        "Desenvolvimento de um Anexo de Articulação de Tornozelo Móvel para a Prótese Universal | 2016",
      project2:
        "Comparação das Propriedades Mecânicas do Osso Esponjoso entre Osso do Fêmur de Porco, Osso do Fêmur de Veado e Osso do Úmero Humano | 2016",
      project3:
        "O Estudo da Biomecânica de Lesões no Punho/Mão e Tornozelo/Pé para Acrobacias Usando o MatScan | 2015",
      educationTitle: "EDUCAÇÃO",
      education1:
        "MSIT Informática em Saúde | Middle Georgia State University | 2018 | 4.0",
      education2: "BSE Engenharia Biomédica | Mercer University | 2016 | 3.4",
      education3: "BA Espanhol | Mercer University | 2016 | 3.4",
      coursesCertificationsTitle: "CURSOS E CERTIFICAÇÕES",
      certification1:
        "Certificação Profissional em Ciência de Dados | Entity Academy & Woz U | 2023",
      certification2:
        "Educação em Tecnologia de Engenharia I & II | GACE | 2022 | Aprovado-profissional",
      certification3:
        "Curso de Desenvolvimento e Avaliação de Liderança | Exército dos EUA | 2016 | Top 15%",
      awardsHonorSocietiesTitle: "PRÊMIOS E SOCIEDADES DE HONRA",
      award1: "Graduado Militar Distinto",
      award2: "Tau Beta Pi (Sociedade de Honra de Engenharia)",
      award3: "Phi Sigma Iota (Sociedade de Honra de Línguas Estrangeiras)",
      award4: "Alpha Phi Omega (Fraternidade Nacional de Serviço)",
      award5: "HS Valedictorian",
      award6: "HS STAR Student (SAT)",
      volunteeringTitle: "OPORTUNIDADES DE VOLUNTARIADO",
      volunteering1: "Programa de Bolsas Fulbright (Verão 2023)",
      volunteering2: "Treinador Principal de Softbol (Primavera 2022)",
      volunteering3: "Missionário (Outono 2019)",
      volunteering4: "Honduras Outreach, Inc (Verão 2015)",
      guestSpeakingTitle: "OPORTUNIDADES PARA FALAR COMO CONVIDADO",
      speaking1:
        "Rotary Club de Griffin, GA (3/2023, 2/2018, 8/2013, 4/2012)",
      speaking2: "Kiwanis Club de Griffin, GA (4/2018)",
      speaking3:
        "Almoço e Oficina Anual para Professores da Junta de Educação de GA (4/2014)",
      speaking4: "Banquete de Estudantes Destacados do Banco Nacional (3/2013)",
    },
  };
