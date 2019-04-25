
const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchEl.value

    message1.textContent = 'Please wait ...'
    message2.textContent = '';

    fetch('/weather?address='+location).then((res) => {
        res.json().then((data) => {
            //console.log(data);
            const { error, forecast, location } = data
            if (error) {
                message1.textContent = error;
            } else {
                message1.textContent = location;
                message2.textContent = forecast;
            }
        })
    })

    searchEl.textContent = ''

})