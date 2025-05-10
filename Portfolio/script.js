
function changeBackground() {
  document.body.style.backgroundImage = "url('about.png')";
  document.querySelector('.proj1').style.visibility = 'hidden';
  document.querySelector('.proj2').style.visibility = 'hidden';
  document.querySelector('.proj3').style.visibility = 'hidden';
  document.querySelector('.proj4').style.visibility = 'hidden';
  document.querySelector('.proja').style.visibility = 'hidden';
  document.querySelector('.projb').style.visibility = 'hidden';
  document.querySelector('.projc').style.visibility = 'hidden';
  document.querySelector('.projd').style.visibility = 'hidden';
  document.querySelector('.expand').style.visibility = 'visible';
}

function expandWindow(){
  document.querySelector('.expand').style.visibility = 'hidden';
  document.body.style.backgroundImage = "url('pic.png')";
  document.querySelector('.proja').style.visibility = 'hidden';
  document.querySelector('.projb').style.visibility = 'hidden';
  document.querySelector('.projc').style.visibility = 'hidden';
  document.querySelector('.projd').style.visibility = 'hidden';
  document.querySelector('.proj1').style.visibility = 'hidden';
  document.querySelector('.proj2').style.visibility = 'hidden';
  document.querySelector('.proj3').style.visibility = 'hidden';
  document.querySelector('.proj4').style.visibility = 'hidden';
}

function openProj(){
  document.querySelector('.proj1').style.visibility = 'hidden';
  document.querySelector('.proj2').style.visibility = 'hidden';
  document.querySelector('.proj3').style.visibility = 'hidden';
  document.querySelector('.proj4').style.visibility = 'hidden';
  document.querySelector('.proja').style.visibility = 'visible';
  document.querySelector('.projb').style.visibility = 'visible';
  document.querySelector('.projc').style.visibility = 'visible';
  document.querySelector('.projd').style.visibility = 'visible';
  document.querySelector('.expand').style.visibility = 'hidden';
  document.body.style.backgroundImage = "url('projects.png')"; 
}