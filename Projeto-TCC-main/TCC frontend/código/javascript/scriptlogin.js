document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const loginForm = document.querySelector('#loginForm');

    // Funcionalidade de mostrar/esconder senha
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Alternar ícone
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Simulação de envio do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const pass = password.value;
        
        console.log('Login concluido:', { email, pass });
     
        //redirecionamento para o menu principal após login
        window.location.href = 'menu.html' 
    });
});