/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          page: "#F6F7FB",
          pageAlt: "#E9EDF7",
          header: "#24385B",
          card: "#FFFFFF",
          cardHeader: "#EDF2FF",
          chip: "#E5F5FF",
          input: "#F9FAFB",
          text: "#111827",
          muted: "#4B5563",
          borderSubtle: "#D1D5DB",
          borderStrong: "#9CA3AF",
          focus: "#38BDF8",
          accentBlue: "#2E4682",
          accentTeal: "#5C97AB",
          accentGreen: "#79AB59",
          accentGold: "#F19743",
          accentLime: "#B9E24A",
          accentRed: "#D44130",
        }
      },
      fontFamily: {
        logo: ["'Montserrat'", "sans-serif"],
        heading: ["'Raleway'", "sans-serif"],
        body: ["'Nunito Sans'", "sans-serif"],
      },
      boxShadow: {
        card: "0 14px 40px rgba(36, 56, 91, 0.12)",
        cardSm: "0 6px 20px rgba(36, 56, 91, 0.08)",
      },
      maxWidth: {
        timeline: "460px",
      },
      borderRadius: {
        xl: "20px",
      },
    }
  },
  plugins: []
};
