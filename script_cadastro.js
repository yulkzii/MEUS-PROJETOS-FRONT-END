document.addEventListener("DOMContentLoaded", function () {
    const vendedorCheckbox = document.getElementById("souVendedor");
    const bancarioDIV = document.getElementById("bancario");
    const form = document.querySelector("form");

    vendedorCheckbox.addEventListener("change", function () {
        if (this.checked) {
            bancarioDIV.classList.add("expandido");
        } else {
            bancarioDIV.classList.remove("expandido");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const nome = form.querySelector('input[placeholder="Nome completo"]').value.trim();
        const cpf = form.querySelector('input[placeholder="CPF"]').value.trim();
        const endereco = form.querySelector('input[placeholder="Endereço"]').value.trim();
        const telefone = form.querySelector('input[placeholder="Telefone"]').value.trim();
        const email = form.querySelector('input[placeholder="Email"]').value.trim();
        const senha = form.querySelector('input[placeholder="Senha"]').value.trim();

        let banco = "";
        let agencia = "";
        let conta = "";

        if (vendedorCheckbox.checked) {
            banco = form.querySelector('input[name="banco"]').value.trim();
            agencia = form.querySelector('input[name="agencia"]').value.trim();
            conta = form.querySelector('input[name="conta"]').value.trim();
        }

        if (!nome || !cpf || !endereco || !telefone || !email || !senha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (vendedorCheckbox.checked) {
            if (!banco || !agencia || !conta) {
                alert("Por favor, preencha todos os dados bancários.");
                return;
            }
        }

        if (!validateEmail(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        alert("Cadastro realizado com sucesso! (fake)");

        form.reset();
        bancarioDIV.classList.remove("expandido");
    });

    function validateEmail(email) {

        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});
