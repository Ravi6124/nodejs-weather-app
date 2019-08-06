console.log('client side javascript')

//fetch challenge 
// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error)console.log(data.error)
//         else console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()

   const location = search.value
   messageOne.textContent="Loading..."
   messageTwo.textContent=''
   
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                messageTwo.textContent=''
            }
            else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
   
    //console.log(location)
})