const request=require('request')

const forcast=(lat,long,callback)=>{
    const url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?unitGroup=us&key=ESKHGRRW7TDMBQYVY9FVEW89Y&contentType=json'
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect to weather service!',undefined) 
      }else if(!body.days){
        callback('Unable to find location, Try another search',undefined)
      }else{
        callback(undefined,body.days[0].description + ' It\'s currently ' + body.currentConditions.temp + ' degrees out. there is a ' + body.currentConditions.precip + '% chance of rain.')
      }
    })
  }

module.exports = forcast