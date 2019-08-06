const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

const port = process.env.PORT || 3000

//To set path to the static content and to the renamed view folder
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//set path to views folder : here that folder is renamed to templates
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ravi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Ravi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Ravi',
        msg: 'Contact RKJ in case you need any Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address is required'
        })
    }
    //set a default object for the destructured object to avoid script error
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error:error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'search term is required'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        error: 'help article not found',
        name: 'Ravi'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        error: 'Page not found',
        name: 'Ravi'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running on port:'+port)
})



// app.get('',(req,res)=>{
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{name: 'Ravi'},{name: 'Sarah'}])
// })

// app.get('/about',(req,res)=>{
//     res.send("<h1>About</h1>")
// })