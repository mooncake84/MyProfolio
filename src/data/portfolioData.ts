export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  url: string;
}

export const PROFILE_DATA = {
  name: "Aylin Paulina Pedroza Rojas",
  role: "Desarrolladora Full-Stack & TSU en TIC",
  bio: "Estudiante de Tecnologías de la Información y la Comunicación en la UTLD, desarrollo de aplicaciones web y móviles, bases de datos.",
  location: "Lerdo, Durango, México",
  skills: [
    "JavaScript / TypeScript",
    "React & React Native",
    "Node.js & Express",
    "PHP & Laravel",
    "Python",
    "MySQL / SQL Server",
    "Git & GitHub",
  ],
  projects: [
    {
      id: "quimitech",
      name: "Portal de Soporte Técnico QuimiTech",
      description:
        "Sistema web desarrollado bajo estándares ISO 9001:2015 para optimizar la gestión de entregas, aprobación y emisión de certificados de calidad en el departamento de gestión de calidad.",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
      url: "https://github.com/mooncake84/quimitech-proyecto",
    },
    {
      id: "nutrieasy",
      name: "NutriEasy (App de Planificación)",
      description:
        "Aplicación móvil y concepto de salud/nutrición con listas de compras inteligentes que ajustan dinámicamente los precios de los alimentos según diferentes regiones geográficas de México.",
      technologies: ["React Native", "Expo", "TypeScript", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&auto=format&fit=crop&q=60",
      url: "https://github.com/mooncake84/NutriEasy",
    },
  ] as Project[],
  contact: {
    email: "paulinapedroza848@gmail.com",
    github: "https://github.com/Mooncake84",
    linkedin: "https://linkedin.com",
  },
};
