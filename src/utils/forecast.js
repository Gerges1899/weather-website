const request=require('request')

const forcast=(lat,long,callback)=>{
    const url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?unitGroup=uk&key=ESKHGRRW7TDMBQYVY9FVEW89Y&contentType=json'
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect to weather service!',undefined) 
      }else if(!body.days){
        callback('Unable to find location, Try another search',undefined)
      }else{
        console.log(body.days[0])
        callback(undefined,body.days[0].description + ' It\'s currently ' + body.days[0].temp + ' degrees out. This high today is '+ body.days[0].tempmax+ ' with a low of '+body.days[0].tempmin+'. there is a ' + body.currentConditions.precip + '% chance of rain.')
      }
    })
  }

module.exports = forcast