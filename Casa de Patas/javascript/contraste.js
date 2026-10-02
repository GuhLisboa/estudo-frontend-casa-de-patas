export function configurarContraste() {
    const botao = document.querySelector("#botao-contraste");

    if (!botao) {
        return;
    }

    const contrasteSalvo = localStorage.getItem("autoContraste") ==="true";

    if (contrasteSalvo) {
        document.body.classList.add("alto-contraste");
        botao.setAttribute("aria-pressed", "true");
    botao.textContent = "contraste normal";
    }
    
    botao.addEventListener("click", () => {
        const ativado = document.body.classList.toggle("alto-contraste");
        botao.setAttribute("aria-pressed", String(ativado));

        botao.textContent = ativado ? "contraste normal" : "alto contraste";
        localStorage.setItem("autoContraste", String(ativado));
    });
}