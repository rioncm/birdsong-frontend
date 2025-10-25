/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#FFFFFF",
          surface: "#F5F7ED",
          surfaceAlt: "#EDF1D9",
          border: "#E1E6CA",
          text: "#424242",
          muted: "#6E6E6E",
          navy: "#293F7D",
          lagoon: "#4581B7",
          leaf: "#A3B557",
          sunset: "#DB793D",
          amber: "#E8A751",
        }
      },
      fontFamily: {
        logo: ["'Silkscreen'", "monospace"],
        heading: ["'Share Tech'", "'SeoulNamsan CL'", "system-ui", "sans-serif"],
        body: ["'SeoulNamsan CL'", "'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 40px rgba(41, 63, 125, 0.08)",
      },
      maxWidth: {
        timeline: "420px",
      },
      borderRadius: {
        xl: "24px",
      },
    }
  },
  plugins: []
};
