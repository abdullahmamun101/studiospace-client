"use client";

import { useSyncExternalStore } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

// <html data-theme="..."> bodlale component nijei update hobe
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme");
}


function getServerSnapshot() {
  return null;
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
     
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark and light theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="btn btn-ghost btn-circle"
    >
      {theme === "dark" ? (
        <FaSun className="text-lg text-primary" />
      ) : theme === "light" ? (
        <FaMoon className="text-lg text-primary" />
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}