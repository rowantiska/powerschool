const axios = require('axios')
const accountSid = "ACc2d53b75883f149d44947f1c92fcaf6f";
const authToken = "b2cf9b901f6ca14e3cc586f81e20a752";
const client = require('twilio')(accountSid, authToken);
var gpa = "90.999";

async function getAvg(){
      while(1>0){
       await sleep(120000)
      axios({
        method: 'GET',
        url: 'https://westhamptonps.esboces.org/guardian/home.html',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Cookie': 'apt.uid=AP-HZBRHZVVCLAX-2-1662637222256-37315223.0.2.f4375d43-2ee8-497c-99d2-77269eebd707; JSESSIONID=F76453FC29A19CC7A7B55B135ABB71A2; psaid=<-V2->296/6639677/19242787770hLjp2zDGOcGIGzBMU3XOqMx3e4bG0gq<-V2->; currentSchool=100; uiStateNav=null; uiStateCont=null; apt.sid=AP-HZBRHZVVCLAX-2-1665447945272-37823512; lastHref=https%3A%2F%2Fwesthamptonps.esboces.org%2Fguardian%2Fhome.html',
            'Host': 'westhamptonps.esboces.org',
            'Origin': 'https://westhamptonps.esboces.org',
            'Referer': 'https://westhamptonps.esboces.org/public/home.html',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        },
      })
      .then(function (response) {
        var pos = response.data.search('GPA')
        if(gpa != response.data.substring(pos, pos+17)){
            var oldGpa = gpa;
            gpa = response.data.substring(pos, pos+17)

            var devi = gpa.substring(10,18) / oldGpa -1;
            devi = devi*100;

            if(oldGpa > gpa){
                var avg = "Decrease from "+oldGpa;
            }
            else if(oldGpa < gpa){
                var avg = "Increase from "+oldGpa;
            }

            console.log("GPA Update: " +gpa +" ("+avg+")")
            client.messages.create({body: "GPA Update: " +gpa+" \n"+"("+avg+")", from: '+18782176531', to: '+16319051235'})
        }
        else if(gpa == response.data.substring(pos, pos+17)){
            console.log("No update -- ingnoring ("+gpa+")")
        }
      })
      }
       function sleep(ms) {
            return new Promise(resolve => {
              setTimeout(resolve, ms)
            })
          }
}
getAvg()
