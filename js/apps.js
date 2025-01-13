//Função para Pop-up.
function mostrarPopup(mensagem) {

    document.getElementById('popup-message').textContent = mensagem;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Função para Fechar Pop-up.
function fecharPopup() {

    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

/* PÁGINA PRINCIPAL */

// Variável para contagem do carrinho.
let cartCount = 0;

// Função para ativar os botões de compra e devolução.
function alterarStatus(id) {
    let jogoClicado = document.getElementById(`game-${id}`);
    if (jogoClicado) {
        let imagem = jogoClicado.querySelector('.dashboard__item__img');
        let botao = jogoClicado.querySelector('.dashboard__item__button');
        let nomeJogo = jogoClicado.querySelector('.dashboard__item__name');

        if (imagem.classList.contains('dashboard__item__img--rented')) {
            imagem.classList.remove('dashboard__item__img--rented');
            botao.textContent = 'Comprar';
            botao.classList.remove('dashboard__item__button--return');
            cartCount--;
        } else {
            imagem.classList.add('dashboard__item__img--rented');
            botao.textContent = 'Remover do Carrinho';
            botao.classList.add('dashboard__item__button--return');
            cartCount++;
        }

        updateCartCount();
    } else {
        console.log(`Elemento com id game-${id} não encontrado.`);
    }
}

// Função para atualizar carrinho.
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    } else {
        console.log('Elemento cart-count não encontrado.');
    }
}

/* PÁGINA DO RECOVER - RECUPERAÇÃO DE SENHAS */

const openModalButton = document.getElementById('openModal');
if (openModalButton) {
    openModalButton.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'block';
        }
    });
}

const closeModalButton = document.getElementsByClassName('close')[0];
if (closeModalButton) {
    closeModalButton.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (modal && event.target == modal) {
        modal.style.display = 'none';
    }
});

const resetForm = document.getElementById('resetForm');
if (resetForm) {
    resetForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message');

        // Simulação de envio de email
        setTimeout(() => {
            if (message) {
                message.textContent = `Um email de recuperação foi enviado para ${email}.`;
            }
        }, 1000);
    });
}

/* PÁGINA DO CADASTRO */

// Cadastro.
const cadastroForm = document.getElementById('cadastroForm');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var telefone = document.getElementById('telefone').value;
        var senha = document.getElementById('senha').value;
        var confirmarSenha = document.getElementById('confirmar__senha').value;
        var cpf = document.getElementById('cpf').value;

        // Validação da Senha.
        if (senha !== confirmarSenha) {
            mostrarPopup("As senhas não coincidem. Tente novamente!");
            return;
        } else if (senha.length < 8 || !/\d/.test(senha) || !/[!@#$%^&*]/.test(senha)) {
            mostrarPopup("A senha deve ter pelo menos 8 caracteres, um número e um caractere especial.");
            return;
        }    
        // Validação de CPF.
        if (!validarCPF(cpf)) {

            mostrarPopup("CPF inválido. Verifique e tente novamente!");
        }     
        
        mostrarPopup("Cadastro realizado com sucesso.");
        
    });

// Máscara para o número de telefone.
const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function (event) {
        let input = event.target;
        let value = input.value.replace(/\D/g, '');

    // Aplicação da Máscara - Telefone.
    let formatted = '';
        if (value.length > 0) formatted += '(' + value.substring(0, 2);
        if (value.length > 2) formatted += ') ' + value.substring(2, 3);
        if (value.length > 3) formatted += ' ' + value.substring(3, 7);
        if (value.length > 7) formatted += '-' + value.substring(7, 11);

        input.value = formatted;

    });

// Máscara para número do CPF.
const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function (event) {
        let input = event.target;
        let value = input.value.replace(/\D/g, '');

    // Aplicação da Máscara - CPF.
    let formatted = '';
        if (value.length > 0) formatted += value.substring(0, 3);
        if (value.length > 3) formatted += '.' + value.substring(3, 6);
        if (value.length > 6) formatted += '.' + value.substring(6, 9);
        if (value.length > 9) formatted += '-' + value.substring(9, 11);

        input.value = formatted;
    });

// Máscara para CEP.
const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function (event) {
        let input = event.target;
        let value = input.value.replace(/\D/g, '');

    // Aplicação da Máscara - CEP.
    let formatted = '';
        if (value.length > 0) formatted += value.substring(0, 5);
        if (value.length > 5) formatted += '-' + value.substring(5, 8);

        input.value = formatted;
    });

// Função para validação do CPF.
function validarCPF(cpf) {

    cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    // Validar primeiro dígito.
    for (let i = 1; i < 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;

    // Validação do segundo dígito.
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i )) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }   
}


/* PÁGINA DO PERFIL */

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const errorMessage = document.getElementById('error-message');

        // Verificação de e-mail.
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailPattern.test(email)) {
            if (errorMessage) {
                errorMessage.textContent = 'Por favor, insira um e-mail válido.';
            }
            return;
        }

        if (username === 'admin' && password === 'admin') {
            if (errorMessage) {
                errorMessage.textContent = '';
            }
            mostrarPopup("Login bem-sucedido!");
        } else {
            if (errorMessage) {
                errorMessage.textContent = 'Usuário ou senha incorretos.';
            }
        }
    });
}