import { carregarProjetos } from "./projetos.js";
import { configurarFormulario } from "./formulario.js";


export function configurarNavegacao() {
    const links = document.querySelectorAll(".menu-links a");
    const main = document.querySelector("main");
    const menuHamburguer = document.querySelector(".menu-hamburguer");
    const menuToggle = document.querySelector("#menu-toggle");

    if (menuHamburguer && menuToggle) {
        menuHamburguer.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                menuToggle.checked = !menuToggle.checked;
            }
        });
    }

    async function fetchPage(url) {
        try {
            const response = await fetch(url);
            const text = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            main.innerHTML = doc.querySelector("main").innerHTML;
            document.title = doc.title;

            carregarProjetos();
            configurarFormulario();

        } catch (error) {
            main.innerHTML = "<p>Impossível carregar o conteúdo.</p>";
        }
    }

    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const url = link.getAttribute("href");

            fetchPage(url);
            history.pushState(null, "", url);
        });
    });

    window.addEventListener("popstate", () => {
        fetchPage(window.location.href);
    });
}