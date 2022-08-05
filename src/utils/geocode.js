const request=require('request')

const geocode=(address,callback)=>{
    const url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+encodeURIComponent(address)+'?unitGroup=us&key=ESKHGRRW7TDMBQYVY9FVEW89Y&contentType=json'
    request({url,json:true},(error,{body})=>{
      if(error){
        callback('Unable to connect to weather service!',undefined) 
      }else if(!body.latitude){
        callback('Unable to find location, Try another search',undefined)
      }else{
        callback(undefined,{
          latitude:body.latitude,
          longitude:body.longitude,
          location:body.resolvedAddress
        })
      }
    })
  }

module.exports = geocode