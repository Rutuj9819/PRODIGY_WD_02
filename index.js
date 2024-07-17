var startTime, elapsedTime = 0, timerInterval;
var lapCounter = 1, running = false;

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    var currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay(elapsedTime);
  }, 10);
  document.querySelector('.start').textContent = 'Stop'; // Change button text to "Stop"
  running = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  document.querySelector('.start').textContent = 'Start'; // Change button text to "Start"
  running = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  document.querySelector('.lap-times').innerHTML = '';
  lapCounter = 1;
  document.querySelector('.start').textContent = 'Start'; // Ensure button text is "Start"
  running = false;
}

function updateDisplay(time) {
  var milliseconds = Math.floor((time % 1000) / 10);
  var seconds = Math.floor((time / 1000) % 60);
  var minutes = Math.floor((time / 1000 / 60) % 60);
  var hours = Math.floor((time / 1000 / 60 / 60) % 24);

  var displayTime = hours.toString().padStart(2, '0') + ':' +
                    minutes.toString().padStart(2, '0') + ':' +
                    seconds.toString().padStart(2, '0') + '.' +
                    milliseconds.toString().padStart(2, '0');

  document.querySelector('.display').textContent = displayTime;
}

document.addEventListener('DOMContentLoaded', function() {
  // Start/Stop button click event listener
  document.querySelector('.start').addEventListener('click', function() {
    if (!running) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  // Reset button click event listener
  document.querySelector('.reset').addEventListener('click', resetTimer);

  // Lap button click event listener
  var lapButton = document.querySelector('.lap');
  if (lapButton) {
    lapButton.addEventListener('click', function() {
      var lapTime = document.createElement('li');
      lapTime.textContent = `Lap ${lapCounter}: ${document.querySelector('.display').textContent}`;
      document.querySelector('.lap-times').appendChild(lapTime);
      lapCounter++;
    });
  }

  // Add keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      if (!running) {
        startTimer();
      } else {
        stopTimer();
      }
    } else if (event.code === 'KeyR') {
      resetTimer();
    } else if (event.code === 'KeyL' && lapButton) {
      var lapTime = document.createElement('li');
      lapTime.textContent = `Lap ${lapCounter}: ${document.querySelector('.display').textContent}`;
      document.querySelector('.lap-times').appendChild(lapTime);
      lapCounter++;
    }
  });
});