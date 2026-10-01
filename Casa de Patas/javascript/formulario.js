import { salvarDados, recuperarDados } from "./storage.js";

export function configurarFormulario() {
    const formulario = document.querySelector("#form-contato");

    if (!formulario) {
        return;
    }

    const nome = formulario.querySelector("#nome");
    const email = formulario.querySelector("#email");
    const cpf = formulario.querySelector("#cpf");
    const telefone = formulario.querySelector("#telefone");
    const cep = formulario.querySelector("#cep");

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    const regexCep = /^\d{5}-\d{3}$/;

    function mostrarErro(campo, mensagem) {
        campo.classList.add("campo-erro");
        campo.classList.remove("campo-sucesso");

        let aviso = campo.nextElementSibling;

        if (!aviso || !aviso.classList.contains("mensagem-erro")) {
            aviso = document.createElement("small");
            aviso.classList.add("mensagem-erro");
            aviso.setAttribute("role", "alert");
            campo.insertAdjacentElement("afterend", aviso);
        }

        aviso.textContent = mensagem;
    }

    function mostrarSucesso(campo) {
        campo.classList.remove("campo-erro");
        campo.classList.add("campo-sucesso");

        const aviso = campo.nextElementSibling;

        if (aviso && aviso.classList.contains("mensagem-erro")) {
            aviso.remove();
        }
    }

    function validarCampo(campo) {
        const valor = campo.value.trim();

        if (campo === nome) {
            if (valor.length < 3) {
                mostrarErro(campo, "Digite pelo menos 3 caracteres.");
                return false;
            }
        }

        if (campo === email && !regexEmail.test(valor)) {
            mostrarErro(campo, "Digite um e-mail válido.");
            return false;
        }

        if (campo === cpf && !regexCpf.test(valor)) {
            mostrarErro(campo, "Use o formato 000.000.000-00.");
            return false;
        }

        if (campo === telefone && !regexTelefone.test(valor)) {
            mostrarErro(campo, "Use o formato (11) 99999-9999.");
            return false;
        }

        if (campo === cep && !regexCep.test(valor)) {
            mostrarErro(campo, "Use o formato 00000-000.");
            return false;
        }

        mostrarSucesso(campo);
        return true;
    }

    const campos = [nome, email, cpf, telefone, cep];

    campos.forEach(campo => {
        campo.addEventListener("input", () => {
            validarCampo(campo);
        });
    });
    const dadosUsuario = recuperarDados();

    if (dadosUsuario) {

        nome.value = dadosUsuario.nome || "";
        email.value = dadosUsuario.email || "";
        formulario.querySelector("#nascimento").value = dadosUsuario.nascimento || "";
        cpf.value = dadosUsuario.cpf || "";
        telefone.value = dadosUsuario.telefone || "";
        formulario.querySelector("#endereco").value = dadosUsuario.endereco || "";
        formulario.querySelector("#cidade").value = dadosUsuario.cidade || "";
        formulario.querySelector("#estado").value = dadosUsuario.estado || "";
        cep.value = dadosUsuario.cep || "";
    }

    formulario.addEventListener("submit", event => {
        event.preventDefault();

        let formularioValido = true;

        campos.forEach(campo => {
            if (!validarCampo(campo)) {
                formularioValido = false;
            }
        });


        if (formularioValido) {
            const dadosUsuario = {
                nome: nome.value,
                email: email.value,
                nascimento: formulario.querySelector("#nascimento").value,
                cpf: cpf.value,
                telefone: telefone.value,
                endereco: formulario.querySelector("#endereco").value,
                cidade: formulario.querySelector("#cidade").value,
                estado: formulario.querySelector("#estado").value,
                cep: cep.value
            }
            salvarDados(dadosUsuario);

            Swal.fire({
                title: "Cadastro realizado!",
                text: "Seus dados foram salvos com sucesso.",
                icon: "success",
                confirmButtonText: "OK"
            });

            campos.forEach(campo => {
                campo.classList.remove("campo-sucesso");
            });
        }
    });
}