const quizData = [
    {
        question: "¿Qué significa una luz verde en el semáforo para los peatones?",
        questionImage: "img/SemaforoVerde.jpg",
        options: ["Cruza la calle", "Corre", "Camina lentamente", "Detente"],
        answer: "Cruza la calle"
      },      
      {
        question: "¿Qué debes hacer antes de cruzar una calle?",
        questionImage: "img/AntesDeCruzar.jpg",
        options: ["Observar que se han detenido correctamente los vehiculos", "Cruzarte sin mirar", "Hacer una señal con la mano", "Correr rápidamente"],
        answer: "Observar que se han detenido correctamente los vehiculos"
      },
      {
        question: "¿Qué indica una señal de 'No cruces'?",
        questionImage: "img/NoCruzar.jpg",
        options: ["Puedes cruzar", "No debes cruzar en ese lugar", "Cruza solo si estás apurado", "Cruza solo cuando no haya coches"],
        answer: "No debes cruzar en ese lugar"
      },
      {
        question: "¿Qué debes hacer si no hay semáforo en una intersección?",
        //questionImage: "img/intersección.png",
        options: ["Cruza rápidamente", "Observa el tráfico y cruza con cuidado", "Pide ayuda a un conductor", "Ignora el tráfico"],
        answer: "Observa el tráfico y cruza con cuidado"
      },
      {
        question: "¿Comó se llaman las franjas pintadas de blanco en la via?",
        questionImage: "img/PasoCebra.jpg", // Imagen de la pregunta
        options: ["Paso cebra", "Señal de advertencia", "Línea de estacionamiento", "Marca de carril"],
        answer: "Paso cebra"
      },
                  
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionTextElement = document.getElementById("question-text");
  const questionImageElement = document.getElementById("question-image");
  const optionsElement = document.getElementById("options");
  const feedbackImage = document.getElementById("feedback-image");
  const resultContainer = document.getElementById("result-container");
  const correctSound = document.getElementById("correct-sound");
  const incorrectSound = document.getElementById("incorrect-sound");
  
  function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionTextElement.textContent = currentQuiz.question;
    questionImageElement.src = currentQuiz.questionImage;
    questionImageElement.style.display = currentQuiz.questionImage ? "block" : "none"; // Muestra la imagen si existe
    optionsElement.innerHTML = '';
    feedbackImage.style.display = 'none'; // Oculta la imagen de feedback
    currentQuiz.options.forEach(option => {
      const button = document.createElement("button");
      button.classList.add("option-btn");
      button.textContent = option;
      button.addEventListener("click", selectAnswer);
      optionsElement.appendChild(button);
    });
  }
  
  function selectAnswer(e) {
    const selectedAnswer = e.target.textContent;
    const correctAnswer = quizData[currentQuestion].answer;
  
    if (selectedAnswer === correctAnswer) {
      score++;
      e.target.classList.add("correct");
      feedbackImage.src = "img/yes.png"; // Ruta correcta a la imagen en la carpeta img
      positionFeedbackImage(e.target); // Posiciona la imagen sobre el botón
      feedbackImage.style.display = "block"; // Muestra la imagen
      correctSound.play(); // Reproduce el sonido de respuesta correcta desde sounds
    } else {
      e.target.classList.add("incorrect");
      feedbackImage.src = "img/no.png"; // Ruta a la imagen para respuestas incorrectas
      positionFeedbackImage(e.target); // Posiciona la imagen sobre el botón
      feedbackImage.style.display = "block"; // Muestra la imagen
      incorrectSound.play(); // Reproduce el sonido de respuesta incorrecta
    }
  
    Array.from(optionsElement.children).forEach(button => {
      button.disabled = true;
    });
  
    // Avanza automáticamente a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showResults();
      }
    }, 2000);
  }
  
  function positionFeedbackImage(button) {
    const rect = button.getBoundingClientRect();
    feedbackImage.style.top = `${rect.top - feedbackImage.offsetHeight}px`; // Posiciona arriba del botón
    feedbackImage.style.left = `${rect.left + (rect.width - feedbackImage.offsetWidth) / 2}px`; // Centra horizontalmente
  }
  
  function showResults() {
    resultContainer.innerHTML = `<h2>Tu puntuación: ${score}/${quizData.length}</h2>`;
    document.getElementById("quiz-container").style.display = "none";
  }
  
  loadQuestion();
  