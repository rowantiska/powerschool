const axios = require('axios')
const accountSid = "ACc2d53b75883f149d44947f1c92fcaf6f";
const authToken = "b2cf9b901f6ca14e3cc586f81e20a752";
const client = require('twilio')(accountSid, authToken);
var gpa = "90.999";

function getAvg(){
      axios({
        method: 'GET',
        url: 'https://westhamptonps.esboces.org/guardian/home.html',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Cookie': 'apt.uid=AP-HZBRHZVVCLAX-2-1664935630005-27469285.0.2.f4375d43-2ee8-497c-99d2-77269eebd707; JSESSIONID=8F4DF70AD7C9AE83E033741B23C3C801; psaid=<-V2->837/6636423/1924278777tqMbtyH76ARDfKcl71biDtTIlYPNYUPm<-V2->; currentSchool=100; uiStateCont=null; lastHref=https%3A%2F%2Fwesthamptonps.esboces.org%2Fguardian%2Fhome.html; apt.sid=AP-HZBRHZVVCLAX-2-1665102795382-24165743; uiStateNav=expanded',
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
                var avg = devi.toString().substring(0,4) + "% decrease from "+oldGpa;
            }
            else if(oldGpa < gpa){
                var avg = devi.toString().substring(0,4) + "% increase from "+oldGpa;
            }

            console.log("GPA Update: " +gpa +" ("+avg+")")
            client.messages.create({body: "GPA Update: " +gpa +" ("+avg+")", from: '+18782176531', to: '+16319051235'})
        }
        else if(gpa == response.data.substring(pos, pos+17)){
            console.log("No update -- ingnoring ("+gpa+")")
        }
      })
}

(function myLoop(i) {
    setTimeout(function() {
        getAvg()
      if (--i) myLoop(i);
    }, 120000)
  })(10);  
