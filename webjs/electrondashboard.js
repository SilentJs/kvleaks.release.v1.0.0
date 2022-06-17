var loginState='deny'
const socket=io('http://localhost:4100')
socket.on('connect',()=>{
    console.log('Connected to Backend')
})
window.onload=function(){
  if(localStorage.ID){
    document.querySelector('.loginHButton').innerHTML=`<a href="#" onclick="logoutAction()">
    <i class='bx bx-log-out icon' ></i>
    <span class="text nav-text">Logout</span>
</a>`
  }
}
function logoutAction() {
  document.querySelector('.loginHButton').innerHTML=`<a href="#" onclick="loginAttempt()">
<i class='bx bx-log-out icon' ></i>
<span class="text nav-text">Login</span>
</a>`
localStorage.clear()
fetch('https://ipapi.co/ip/').then(function(response) { response.text().then(txt => {
  localStorage.setItem('IP',txt)})})
}
socket.on('userAuth',(data)=>{
  if(loginState==='accept'){
    loginState='deny'
    socket.emit('loginSuccess','yes')
    const responsePayload=parseJwt(data.credential)
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    localStorage.clear()
    localStorage.setItem('Name',responsePayload.name)
    localStorage.setItem('ID',responsePayload.sub)
    localStorage.setItem('Email',responsePayload.email)
    localStorage.setItem('Pfp',responsePayload.picture)
    document.querySelector('.loginHButton').innerHTML=`<a href="#" onclick="logoutAction()">
    <i class='bx bx-log-out icon' ></i>
    <span class="text nav-text">Logout</span>
    </a>`
    
    document.querySelector('.loginHolder').innerHTML=``
    fetch('https://ipapi.co/ip/').then(function(response) { response.text().then(txt => {
        localStorage.setItem('IP',txt)})})
  }else if(loginState==='deny'){
    socket.emit('loginFail')
  }
})

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("light");
body.classList.toggle("dark");

if(body.classList.contains("dark")){
  modeText.innerText = "Dark mode";
  document.querySelector(':root').style.setProperty('--card-color','#222')
}else{
  modeText.innerText = "Light mode";
  document.querySelector(':root').style.setProperty('--card-color','#fff')
}
});

function loginAttempt(){
  socket.emit('openLogin','please')
  loginState='accept'
  document.querySelector('.loginHolder').innerHTML=`<div class="bgCover">
  <div class="promt">
  <img class="close" src="images/x.svg" onclick="loginState='deny';document.querySelector('.loginHolder').innerHTML=''">
  <img src="images/login.svg">
  <button>Open Manually</button>
  <p>Donot close this login window untill we log you in </p>
  <p>The login page should automatically open in your default browser</p>
  </div>
  </div>`+document.querySelector('.loginHolder').innerHTML
}