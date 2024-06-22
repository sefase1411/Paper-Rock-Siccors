class GameObject {
  constructor() {
      this.totalGames = 0; // Variable para almacenar el número total de juegos
      this.currentGame = 0; // Variable para almacenar el juego actual
      // Nuevos contadores
  }

  // Método para verificar el resultado del juego
  check(player1Type, player2Type) {
      if (player1Type === player2Type) {
          return "It's a tie!";
      } else if (
          (player1Type === "rock" && player2Type === "scissors") ||
          (player1Type === "scissors" && player2Type === "paper") ||
          (player1Type === "paper" && player2Type === "rock")
      ) {
          return "Player 1 wins!";
      } else {
          return "Player 2 wins!";
      }
  }

  // Método para jugar contra otro jugador
  choose(player1Type, player2Type) {
      let result = this.check(player1Type, player2Type);
      this.showResult(result, player2Type, "Player 1", "Player 2");
      return result;
  }

  // Método para jugar contra la computadora
  playAgainstComputer(playerType) {
      let computerType = this.generateComputerChoice();
      let result = this.check(playerType, computerType);
      this.showResult(result, computerType, "Player", "Computer");
      return result;
  }

  // Método para generar la elección aleatoria de la computadora
  generateComputerChoice() {
      let choices = ["rock", "paper", "scissors"];
      let randomIndex = Math.floor(Math.random() * 3);
      return choices[randomIndex];
  }

  // Método para mostrar el resultado en la interfaz de usuario
  showResult(result, opponentChoice, player1, player2) {
      const notification = document.querySelector(".notification");
      const notificationLabel = document.querySelector(".notification-header label");
      const notificationBodyLabel = document.querySelector(".notification-body label");

      notificationLabel.textContent = result;
      notificationBodyLabel.textContent = `${player2} chose ${opponentChoice}`;

      notification.style.display = "block";
      setTimeout(() => {
          notification.style.display = "none";
      }, 3000);

      // Actualizar puntos
      if (result === "Player 1 wins!") {
          player1Points++;
      } else if (result === "Player 2 wins!") {
          player2Points++;
      }
      updatePoints();
  }
}

// Variables globales
const keyToChoiceMap = {
  'a': 'rock',
  's': 'paper',
  'd': 'scissors',
  'k': 'rock',
  'l': 'paper',
  'ñ': 'scissors'
};

let player1Choice = null;
let player2Choice = null;
let totalGames = 0; // Variable global para almacenar el número total de juegos
let intentosRestantes = 0; // Variable global para almacenar los intentos restantes
let player1Points = 0; // Variable para almacenar los puntos del jugador 1
let player2Points = 0; // Variable para almacenar los puntos del jugador 2

// Función para manejar la entrada del número de intentos
function handleIntentosInput() {
  const intentosInput = document.getElementById('intentos');
  const numIntentos = parseInt(intentosInput.value); // Obtener el valor del input como número entero
  const mensajeElement = document.getElementById('mensaje'); // Elemento para mostrar mensajes
  if (!isNaN(numIntentos) && numIntentos > 0) {
      totalGames = numIntentos;
      intentosRestantes = totalGames; // Inicializar los intentos restantes
      updateIntentosRestantes(); // Actualizar el texto de los intentos restantes
      mensajeElement.textContent = `Número de intentos ingresado: ${totalGames}`;
      mensajeElement.style.color = 'green'; // Cambiar color del mensaje a verde
  } else {
      mensajeElement.textContent = 'Por favor ingresa un número válido de intentos.';
      mensajeElement.style.color = 'red'; // Cambiar color del mensaje a rojo
  }
}

// Función para actualizar el texto de los intentos restantes
function updateIntentosRestantes() {
  const intentosRestantesElement = document.getElementById('intentos-restantes');
  intentosRestantesElement.textContent = `Intentos restantes: ${intentosRestantes}`;
}

// Función para actualizar los puntos de los jugadores
function updatePoints() {
  const player1PointsElement = document.getElementById('player1-points');
  const player2PointsElement = document.getElementById('player2-points');
  player1PointsElement.textContent = `Player 1 Points: ${player1Points}`;
  player2PointsElement.textContent = `Player 2 Points: ${player2Points}`;
}

// Escuchar cambios en el input de intentos
document.getElementById('intentos').addEventListener('change', handleIntentosInput);

// Función para jugar contra la computadora
function playAgainstComputer(playerType) {
  const mensajeElement = document.getElementById('mensaje'); // Elemento para mostrar mensajes
  if (intentosRestantes > 0) {
      let game = new GameObject();
      game.playAgainstComputer(playerType);
      intentosRestantes--;
      updateIntentosRestantes(); // Actualizar el contador de intentos restantes en la UI
  } else {
      mensajeElement.textContent = 'Se han agotado los intentos. Reinicia el juego.';
      mensajeElement.style.color = 'red'; // Cambiar color del mensaje a rojo
  }
}

// Función para manejar las opciones de los jugadores
function handlePlayerOptions(playerType) {
  const mensajeElement = document.getElementById('mensaje'); // Elemento para mostrar mensajes
  if (intentosRestantes > 0) {
      if (!player1Choice) {
          player1Choice = playerType;
          mensajeElement.textContent = `Player 1 chose ${player1Choice}`;
          mensajeElement.style.color = 'black'; // Cambiar color del mensaje a negro
      } else {
          player2Choice = playerType;
          mensajeElement.textContent = `Player 2 chose ${player2Choice}`;
          mensajeElement.style.color = 'black'; // Cambiar color del mensaje a negro
          let game = new GameObject();
          game.choose(player1Choice, player2Choice);
          intentosRestantes--;
          updateIntentosRestantes(); // Actualizar el contador de intentos restantes en la UI
          resetChoices();
      }
  } else {
      mensajeElement.textContent = 'Se han agotado los intentos. Reinicia el juego.';
      mensajeElement.style.color = 'red'; // Cambiar color del mensaje a rojo
  }
}

// Función para reiniciar las elecciones de los jugadores
function resetChoices() {
  player1Choice = null;
  player2Choice = null;
}

// Event listeners para las opciones de los jugadores
const opciones = document.querySelectorAll(".option");
opciones.forEach(opcion => {
  opcion.addEventListener("click", function() {
      const playerType = this.id;
      if (contraComputadora) {
          playAgainstComputer(playerType);
      } else {
          handlePlayerOptions(playerType);
      }
  });
});

// Event listener para el botón de cambio de modo
const changeModeBtn = document.querySelector(".button-mode");
let contraComputadora = true;

changeModeBtn.addEventListener("click", function() {
  contraComputadora = !contraComputadora;
  changeModeBtn.textContent = contraComputadora ? "Change to player" : "Change to computer";
  resetChoices();
});

// Mostrar instrucciones en consola
console.log("Player 1: Use 'a', 's', 'd'");
console.log("Player 2: Use 'k', 'l', 'ñ'");
console.log("Let the game begin!");
