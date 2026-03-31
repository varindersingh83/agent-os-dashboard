/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        success: "var(--success)",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(79, 70, 229, 0.1)",
        lift: "0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1)",
        glow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)",
      },
      borderRadius: {
        xl: "12px",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
      },
    },
  },
  plugins: [],
};
