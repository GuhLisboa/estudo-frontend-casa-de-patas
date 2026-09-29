const projetos = [
    {
        titulo: "Lar Temporário",
        descricao: "O projeto conecta cães e gatos resgatados a voluntários dispostos a oferecer um ambiente seguro e acolhedor enquanto os animais aguardam uma adoção definitiva."
    },
    {
        titulo: "Adoção Responsável",
        descricao: "A Casa de Patas busca famílias responsáveis que possam oferecer um lar definitivo, seguro e cheio de carinho para os animais acolhidos."
    },
    {
        titulo: "Voluntariado",
        descricao: "Existem diferentes maneiras de participar e ajudar a Casa de Patas."
    },
    {
        titulo: "Campanhas de Doação",
        descricao: "As doações ajudam a manter os animais acolhidos com alimentação, medicamentos, produtos de higiene e outros itens necessários."
    }
];

export function carregarProjetos() {
    const lista = document.querySelector("#lista-projetos");

    if (lista) {
        lista.innerHTML = projetos.map(projeto => `
            <section>
                <h2>${projeto.titulo}</h2>
                <p>${projeto.descricao}</p>
            </section>
        `).join("");
    }
}