document.addEventListener('DOMContentLoaded', function () {

  // Create a counter to track how many popups have been created
  let popupCount = 0;

  // Array of different messages for subsequent popups
  const messages = [
    "Please check again...",
    "Are you sure you are human?",
    "This is getting interesting!",
    "Come on... I'll give you one more chance",
    "Don't make it hard for us!!",
    "Ok, this is FOR REAL your last chance!"
  ];

  // Countdown function
  let count = 3;
  const countdownDiv = document.getElementById('countdown');

  function startCountdown() {
    countdownDiv.textContent = count;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownDiv.textContent = count;
      } else {
        clearInterval(interval);
        // Redirect to page3.html when countdown finishes
        window.location.href = "page3.html";
      }
    }, 1000);
  }
  
  // Function to create a new error popup at a random position
  function createPopup(messageText) {
    const popup = document.createElement('div');
    popup.classList.add('errorwindow');  // Use the class from your existing CSS

    // Add the title bar
    const titlebar = document.createElement('div');
    titlebar.classList.add('titlebar');
    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = 'Error!!';
    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.textContent = 'X';
    titlebar.appendChild(title);
    titlebar.appendChild(closeButton);

    // Add the body
    const body = document.createElement('div');
    body.classList.add('body');
    const icon = document.createElement('img');
    icon.src = 'alert-error.svg';
    icon.alt = 'Error';
    icon.classList.add('icon');
    const message = document.createElement('span');
    message.classList.add('message');
    message.textContent = messageText; // Set dynamic message text
    body.appendChild(icon);
    body.appendChild(message);

    // Add the footer with Yes and No buttons
    const footer = document.createElement('div');
    footer.classList.add('footer');
    const yesButton = document.createElement('button');
    yesButton.classList.add('button-14');
    yesButton.textContent = 'Yes';
    const noButton = document.createElement('button');
    noButton.classList.add('button-14');
    noButton.textContent = 'No';
    footer.appendChild(yesButton);
    footer.appendChild(noButton);

    // Append all elements to the popup
    popup.appendChild(titlebar);
    popup.appendChild(body);
    popup.appendChild(footer);

    // Random position for the popup
    if (popupCount === 0) {
      randomTop = (window.innerHeight - popup.offsetHeight) / 2; 
      randomLeft = (window.innerWidth - popup.offsetWidth) / 2; 
      popup.style.top = randomTop + 'px'; // Set the random top position
      popup.style.left = randomLeft + 'px';
    } else {
      const maxWidth = window.innerWidth - popup.offsetWidth - 200; 
      const maxHeight = window.innerHeight - popup.offsetHeight - 150; 
      const randomTop = Math.floor(Math.random() * maxHeight); 
      const randomLeft = Math.floor(Math.random() * maxWidth); 
      popup.style.position = 'absolute';
      popup.style.top = randomTop + 'px'; 
      popup.style.left = randomLeft + 'px'; 
    }

    // Add the popup to the body of the document
    document.body.appendChild(popup);

    // Add event listener to close the popup
    closeButton.addEventListener('click', function() {
      document.body.removeChild(popup);
    });

    // Add event listeners for Yes and No buttons
    yesButton.addEventListener('click', function() {
      if (popupCount < messages.length) {
        // Create a new popup with a different message when "Yes" is clicked
        createPopup(messages[popupCount]);
        popupCount++; // Increment popup counter for the next message
      }
    });

    noButton.addEventListener('click', function() {
      // Remove all popups when "No" is clicked
      const allPopups = document.querySelectorAll('.errorwindow');
      allPopups.forEach(p => document.body.removeChild(p));

      startCountdown();
    });
  }

  // Initial popup creation when page loads (if on page2.html)
  if (window.location.pathname.includes('page2.html')) {
    // First popup with the initial message
    createPopup("Wait... are you human?");
    popupCount++; // Increment the popup counter after the first one
  }

  const button = document.querySelector('.button');
  if (button) {
    button.addEventListener('click', function () {
      this.classList.toggle('success');
      const before = this.querySelector('.icon-alien');
      const after  = this.querySelector('.icon-space');

      if (this.classList.contains('success')) {
        before.style.display = 'none';
        after.style.display  = 'inline-block';

        setTimeout(() => window.location.href = 'page2.html', 1000);
      } else {
        before.style.display = 'inline-block';
        after.style.display  = 'none';
      }
    });
  }

  const english  = "How to be Human:\nUniversity Student Edition";
  const glyphs   = "⊑⍜⍙ ⏁⍜ ⏚⟒ ⏃ ⊑⎍⋔⏃⋏:\n⎍⋏⟟⎐⟒⍀⌇⟟⏁⊬ ⌇⏁⎍⎅⟒⋏⏁ ⟒⎅⟟⏁⟟⍜⋏";
  const revealMs = 60;

  const titleEl  = document.getElementById("title");
  let revealed   = 0;

  function update() {
    let out = "";
    for (let i = 0; i < english.length; i++) {
      const ch = english[i];
      if (ch === "\n") { 
        out += "\n"; 
        continue; 
      }
      out += (i < revealed)
             ? ch
             : glyphs[Math.floor(Math.random() * glyphs.length)];
    }
    titleEl.textContent = out;
    if (revealed < english.length) {
      revealed++;
      setTimeout(update, revealMs);
    }
  }
  update();
});