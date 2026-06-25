/*
 scriptlogin.js
 ----------------
 Scripts para a página de login:
 - Alterna a visualização da senha (mostrar/esconder)
 - Captura submissão do formulário e realiza ação de mock

 Observação: o envio do formulário está simulado (apenas um console.log
 e redirecionamento para `menu.html`). Em produção, substituir pela
 autenticação real via API/servidor.
*/

document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const loginForm = document.querySelector('#loginForm');

    // Funcionalidade de mostrar/esconder senha
    // - Alterna o atributo `type` entre 'password' e 'text'
    // - Alterna classes do ícone para refletir o estado
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Alternar ícone
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Simulação de envio do formulário
    // - impede comportamento padrão
    // - captura valores e faz console.log para testes
    // - redireciona para `menu.html` (comportamento de exemplo)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const pass = password.value;
        
        console.log('Login concluido:', { email, pass });
     
        // redirecionamento para o menu principal após login (exemplo)
        window.location.href = 'menu.html';
    });
});