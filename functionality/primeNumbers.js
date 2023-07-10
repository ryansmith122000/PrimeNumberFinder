function isPrime(N) { // algorithm to see if a number is prime or not.
    if (N <= 1) return false;
    for (var i = 2; i <= Math.sqrt(N); i++) {
      if (N % i === 0) return false;
    }
    return true;
  }
  
  function findPrimes() {
    var input = document.getElementById('inputNumber'); 
    var output = document.getElementById('output');
    var outputInfo = document.getElementById('outputInfo'); // creating global variables to simplify furhter code writing.
    var stopButton = document.getElementById('stopButton');
    var number = parseInt(input.value);
  
    if (isNaN(number) || number <= 1) { // if the number isn't valid or less than/equal to 1, we return this message.
      output.value = 'Please enter a valid number.';
      return;
    }

    if (isNaN(number) || number > Number.MAX_SAFE_INTEGER || number < Number.MIN_SAFE_INTEGER) {
      output.value = 'The provided value is not a valid or parseable integer.';
      return; // stopping execution of the function and providing user feedback if the number cannot be parsed.
    }
  
    output.value = ''; // clears content of the output field when this function is called.
    stopExecution = false; // used to control the execution of the prime number search.
    stopButton.disabled = false; // enabling the stop button to stop the execution of finding/printing prime numbers
    outputInfo.textContent = ''; // clears content of the outputInfo <p></p> tag.
  
    function updateOutput(prime) { // outputs the value to the output field.
      output.value += prime + ', ';
    }
  
    function findNextPrime(start) { // if execution is stopped, provide sufficient user feedback.
      if (stopExecution) {
        outputInfo.textContent = 'Prime number search stopped';
        stopButton.disabled = true;
        return;
      }
  
      if (start <= number) { // number is the given input, "start" would be where the function "starts" calculating/outputting the prime numbers.
        setTimeout(function() { // setTimeout used for async execution, allows other functions to run while this one is running.
          if (isPrime(start)) { // if the "start" value (the number the code is executing) is prime, we will update the output to include that number.
            updateOutput(start);
          }
          outputInfo.textContent = 'Listing Prime Numbers.';
          setTimeout(findNextPrime.bind(null, start + 1), 0); // initial value of null (to make sure there is no predetermined value) then provides the appopriate argument to findNextPrime with a delay of 0 (used setTimeout for async execution.)
        }, 0);
      } else {
        outputInfo.textContent = 'Prime number search completed'; // any time the outputInfo field has value, stopButton's properties should change.
        stopButton.disabled = true;
      }
    }

    setTimeout(findNextPrime.bind(null, 2), 0); // recursive function allows findNextPrime to call itself with the value of the next number. (same for line 48)
  }
  
  function toggleColor() {
    var button = document.getElementById('toggleButton');
    var output = document.getElementById('output'); // assigning variables to IDs of html elements for cleaner code and execution.
    var colorInfo = document.getElementById('colorInfo');
    var colors = ['red', 'blue', 'green', 'orange', 'purple', 'teal', 'coral', 'white', 'black']; // array of colors toggleColor chooses from
  
    var currentColor = output.style.backgroundColor || ''; // currentColor setting the value of the background color OR default value.
    var currentIndex = colors.indexOf(currentColor); // finds the current index of the array.
    var newColor = colors[(currentIndex + 1) % colors.length]; // will iterate through the array in a linear fashion to set the next color of the output.
  
    setTimeout(function() { // async execution to be able to calculate/print prime numbers at the same time.
      output.style.backgroundColor = newColor; // 
      output.value += newColor + ', '; // printing the value of the color to the output field.
      colorInfo.textContent = `Current color of the output field is: ${newColor}`; // setting the value of colorInfo to include what the current color is.
    }, 0);
  }
  
  function handleStop() {
    stopExecution = true; // stops the execution of the function, used for stop button.
  }
  
  document.addEventListener('DOMContentLoaded', function() { // once the dom is loaded, we will add the following event listeners
    document.getElementById('findButton').addEventListener('click', findPrimes); // onClick, the findButton will execute findPrimes.
    document.getElementById('toggleButton').addEventListener('click', toggleColor); // onClick, the toggleButton will execute toggleColor.
    document.getElementById('stopButton').addEventListener('click', handleStop); // onClick, the stopButton will execute handleStop.
  });
  