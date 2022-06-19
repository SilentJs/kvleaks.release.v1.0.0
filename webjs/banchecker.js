
const socketW=io('https://userdetailsdb.the-karambitkar.repl.co')
var banG=-1
var banR=-1

if(localStorage.getItem('Banned')==='true'){
    banText();
}

socketW.on('connect',()=>{
    //  fetch('https://ipapi.co/ip/').then(function(response) {  response.text().then(txt => {
    //     localStorage.setItem('currentIP',txt)
    //     socketW.emit('ipStore',[txt,localStorage.ID,localStorage.Name])
    // })})
    fetch(`https://ipapi.co/json/`).then(results=>results.json()).then(data=>{
         localStorage.setItem('currentIP',data.ip)
        socketW.emit('ipStore',[data.ip,localStorage.ID,localStorage.Name])
                   
               })
    
    setInterval(() => {
        socketW.emit('ipStore',[localStorage.currentIP,localStorage.ID,localStorage.Name,'NoStorage'])
        console.log('BanChecking')
    }, 10000);
})
socketW.on('ban',()=>{
    localStorage.setItem('Banned','true');
    banG+=1
    if(banG===0){
       banText();
    }
})
socketW.on('banRemoved',()=>{
    banR+=1
    if(banR===0&&localStorage.getItem('Banned')==='true'){
        localStorage.setItem('Banned','false');
        banRemoved()
        return;
    }
})
function banText(){
    document.querySelector('body').innerHTML=`<div>You are banned from https://kvleaks.netlify.app for your ban appeal talk to us at kvleakssite@gmail.com</div>`
    document.querySelector("div").style.background='white'
    document.querySelector("*").style.background='white'
    console.warn('You are banned from https://kvleaks.netlify.app for your ban appeal talk to us at kvleakssite@gmail.com')
    return;
}
function banRemoved(){
    document.querySelector('body').innerHTML=`<div>Your ban is removed</div>`
    document.querySelector("div").style.background='white'
    document.querySelector("*").style.background='white'
    console.warn('Your ban is removed')
    return;
}
    


    
