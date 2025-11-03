import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "./index.css";

// Load all pages from src/pages/
const modules = import.meta.glob("./pages/**/*.tsx", { eager: true });

// Convert file paths into React Router routes
const routes = Object.keys(modules).map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.tsx$/)[1]; // e.g. "index", "about"
    const Component = modules[path].default;

    return {
        path: name === "index" ? "/" : `/${name.toLowerCase()}`,
        element: <Component />,
    };
});

function App() {
    return useRoutes(routes);
}

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
