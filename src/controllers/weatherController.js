let axios = require("axios")

// GOTO  http://api.openweathermap.org => “subscribe” current weather data ==> get api key for Free version ==> create new account and Verify your emailId( Must verify to avoid issues) => go to My APi keys under your account name(top right corner) or https://home.openweathermap.org/api_keys => save the key/appid somewhere. Now proceed further

// Create API's to do each of the following:
// - get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)
                    // - then change the above to get the temperature only( of London)
                    // - Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
                    // result should look something like this
                    // [
                    // {city:"London", temp: 280},
                    // {city:"Moscow", temp: 290},
                    // {city:"Bangalore", temp: 301.2},
                    // .......
                    // ]

                    let getSortedCities = async function (req,res){
                        try{
                            let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] 
                            let cityObjArray = []
                            for(i=0;i<cities.length;i++){
                                let obj = { city: cities[i] }
                                let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=fff5cc5de8309b61edf3fcde8ba4b483`)
                                console.log(resp.data.main.temp)

                                obj.temp = resp.data.main.temp
                                cityObjArray.push(obj)
                            }
                            let sorted = cityObjArray.sort( function(a,b) {return a.temp-b.temp})
                            console.log(sorted)
                            res.status(200).send({status:true,data: sorted})
                        }
                        catch(error){
                            console.log(error)
                                res.status(500).send({status: false,msg:"server errror"})
                            }
                    
                    }
                
module.exports.getSortedCities = getSortedCities

