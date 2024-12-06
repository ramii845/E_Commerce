// tailwind.config.js
export default {
  corePlugins: {
    preflight: false, // Désactive le style de réinitialisation de base de Tailwind CSS
  },
  content: [
    "./index.html", // Spécifie le fichier HTML à inclure pour la génération des classes CSS
    "./src/**/*.{js,ts,jsx,tsx}", // Ajoute tous les fichiers JS, TS, JSX et TSX dans le dossier src
  ],
  theme: {
    extend: {}, // Vous pouvez ici étendre le thème de Tailwind CSS si nécessaire
  },
  plugins: [], 

}
