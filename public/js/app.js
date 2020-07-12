console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevent the browser to refresh
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    
    response.json().then((data) => {
        if(data.error){
           //console.log(data.error)
           messageOne.textContent = data.error
        }else{
            messageOne.textContent = 'location: ' + data.location
            messageTwo.textContent = 'forecast: ' + data.forecast
            // console.log('location: ' + data.location)
            // console.log('forecast: ' + data.forecast)
        }
    })
})
})

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })