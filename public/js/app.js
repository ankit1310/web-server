console.log('Client side javascript is used')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const errorMessageView = document.querySelector('#error-message')
const successMessageView = document.querySelector('#success-message')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputLocation = searchText.value
    errorMessageView.textContent = 'Loading..'
    successMessageView.textContent = ''

    const linkToCall = ''
    fetch('/weather?address=' + encodeURIComponent(inputLocation)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessageView.textContent = data.error
            } else {
                errorMessageView.textContent = data.location
                successMessageView.textContent = data.forecast
            }
        })
    })

    //console.log(inputLocation)
})
