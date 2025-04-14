import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

function About() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto max-w-[1280px] p-8 text-center">
      {/* Logos */}
      <div className="flex justify-center gap-8">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="h-24 p-6 transition filter hover:drop-shadow-[0_0_2em_#646cffaa]"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-24 p-6 transition filter hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
          />
        </a>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mt-6">Vite + React</h1>

      {/* Card Section */}
      <div className="p-8 mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-3 rounded-lg text-lg font-semibold bg-gray-800 text-white dark:bg-gray-100 dark:text-black transition hover:border-indigo-500 border border-transparent"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Edit{" "}
          <code className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            src/pages/About.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>

      {/* Footer Text */}
      <p className="mt-4 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default About;
