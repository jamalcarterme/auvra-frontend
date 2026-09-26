import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1420",
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        line: "#E4E7EC",
        muted: "#5B6472",
        indigo: {
          DEFAULT: "#3B4FE0",
          dark: "#2C3BB8",
          light: "#EEF0FD",
        },
        cyan: {
          DEFAULT: "#17B8C4",
          light: "#E6F8FA",
        },
        amber: {
          DEFAULT: "#C97A2B",
          light: "#FBF0E4",
        },
        risk: {
          low: "#1C8A5A",
          medium: "#C97A2B",
          high: "#C43D3D",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        panel: "0 1px 2px rgba(14,20,32,0.04), 0 1px 0 rgba(14,20,32,0.03)",
        raised: "0 8px 24px rgba(14,20,32,0.08)",
      },
      borderRadius: {
        card: "10px",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
