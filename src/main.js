function fetchMovies() {
    fetch('films.json')
      .then(response => response.json())
      .then(data => {
        displayCarousel(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }

  function displayCarousel(movies) {
    const carousel = document.getElementById('movieCarousel');
    const featuredMovies = movies.filter(movie => movie.featured === true);

    featuredMovies.forEach(movie => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');

      const posterImg = document.createElement('img');
      posterImg.src = movie.poster;
      posterImg.alt = movie.title; 

      const infoContainer = document.createElement('div');
      infoContainer.classList.add('movie-info');

      const title = document.createElement('h2');
      title.textContent = movie.title;
      title.style.fontWeight = 'bold'; 
      title.style.textDecoration = 'underline'; 
      infoContainer.appendChild(title);

      const description = document.createElement('p');
      description.textContent = movie.description;
      description.style.maxWidth = '300px'; 
      infoContainer.appendChild(description);

      const trailerBtn = document.createElement('button');
      const trailerImg = document.createElement('img');
      trailerImg.src = 'img/Play.png';
      trailerImg.alt = 'Ver trailer';
      trailerBtn.appendChild(trailerImg);
      infoContainer.appendChild(trailerBtn);

      const buyTicketBtn = document.createElement('button');
      const ticketImg = document.createElement('img');
      ticketImg.src = 'img/Movie ticket.png';
      ticketImg.alt = 'Comprar ticket';
      buyTicketBtn.appendChild(ticketImg);
      infoContainer.appendChild(buyTicketBtn);

      slide.appendChild(posterImg);
      slide.appendChild(infoContainer);

      carousel.appendChild(slide);
    });
    initCarousel();
  }

  function initCarousel() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, idx) => {
        if (idx === index) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    showSlide(currentSlide);
  }

  fetchMovies();