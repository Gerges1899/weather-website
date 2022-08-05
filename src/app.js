const path=require('path')
const express=require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// define paths for express config
const public = path.join(__dirname,'../public')
const views=path.join(__dirname,'../templates/views')
const partials=path.join(__dirname,'../templates/partials')

// setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

// setup static directory to serve
app.use(express.static(public))


app.get('',(req,res)=>{ 
    res.render('index',{
        title:'Weather',
        name:'Gerges Abdullah'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Gerges Abdullah'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        msg:'help message',
        name:'Gerges Abdullah'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecast)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        404:'Help article not found',
        name:'Gerges Abdullah'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        404:'Page not found',
        name:'Gerges Abdullah'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})