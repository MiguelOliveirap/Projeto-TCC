document.addEventListener('DOMContentLoaded', () => {
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const commentsTextarea = document.getElementById('comments');
    const submitButton = document.getElementById('submit-rating');
    const formMessage = document.getElementById('form-message');
    const satisfactionForm = document.getElementById('satisfaction-form');
    const dashboardSection = document.getElementById('dashboard');
    const averageRatingDisplay = document.getElementById('average-rating');
    const totalRatingsDisplay = document.getElementById('total-ratings');
    const recentCommentsList = document.getElementById('recent-comments');

    let selectedRating = 0;
    let allRatings = [];
    let allComments = [];

    // --- Star Rating Logic ---
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            resetStars();
            const rating = parseInt(star.dataset.rating);
            highlightStars(rating);
        });

        star.addEventListener('mouseout', () => {
            resetStars();
            highlightStars(selectedRating);
        });

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            highlightStars(selectedRating);
        });
    });

    function highlightStars(rating) {
        ratingStars.forEach(star => {
            if (parseInt(star.dataset.rating) <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    function resetStars() {
        ratingStars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    }

    // --- Form Submission Logic ---
    submitButton.addEventListener('click', () => {
        if (selectedRating === 0) {
            displayMessage('Por favor, selecione uma avaliação com estrelas.', 'error');
            return;
        }

        const comment = commentsTextarea.value.trim();

        // Simulate sending data to a backend
        console.log('Avaliação enviada:', { rating: selectedRating, comment: comment });

        allRatings.push(selectedRating);
        if (comment) {
            allComments.push(comment);
        }

        displayMessage('Sua avaliação foi enviada com sucesso! Obrigado.', 'success');
        updateDashboard();
        resetForm();

        // Hides form and shows dashboard after submission
        satisfactionForm.style.display = 'none';
        dashboardSection.style.display = 'block';
        dashboardSection.classList.remove('hidden');
    });

    function displayMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = ''; // Limpa classes anteriores
        formMessage.classList.add(type); // Adiciona 'success' ou 'error'
        formMessage.classList.remove('hidden');
        
        // Remove a mensagem após 5 segundos para dar tempo de ler
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }

    function resetForm() {
        selectedRating = 0;
        resetStars();
        commentsTextarea.value = '';
    }

    // --- Dashboard Logic ---
    function updateDashboard() {
        if (allRatings.length === 0) {
            averageRatingDisplay.textContent = '--';
            totalRatingsDisplay.textContent = '0';
            recentCommentsList.innerHTML = '<li>Nenhum comentário ainda.</li>';
            return;
        }

        const sumRatings = allRatings.reduce((sum, rating) => sum + rating, 0);
        const average = (sumRatings / allRatings.length).toFixed(1);

        averageRatingDisplay.textContent = average;
        totalRatingsDisplay.textContent = allRatings.length;

        recentCommentsList.innerHTML = '';
        if (allComments.length > 0) {
            // Display up to 5 most recent comments
            allComments.slice(-5).reverse().forEach(comment => {
                const li = document.createElement('li');
                li.textContent = comment;
                recentCommentsList.appendChild(li);
            });
        } else {
            recentCommentsList.innerHTML = '<li>Nenhum comentário recente.</li>';
        }
    }

    // Initial dashboard update
    updateDashboard();
});
