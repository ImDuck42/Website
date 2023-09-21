const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener('click',()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})


document.getElementById('submitButton').addEventListener('click', function (event) {
    event.preventDefault();
   
    const enteredCode = document.getElementById('codeInput').value;

    fetch('/assets/code.sec')
        .then(response => response.text())
        .then(specialCode => {
            if (enteredCode === specialCode) {
                window.location.href = 'Website/index.html';
            }            
        });
});


