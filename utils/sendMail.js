const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  "fed7516f5dc9b33f3b61271e11d90e6b",
  "affb2e6d8d526381b10e80f66f74f9db",
);

// const mailjet = require ('node-mailjet').connect('', 'affb2e6d8d526381b10e80f66f74f9db')

module.exports=function(subject,email,html ,callback){
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "0808cs191011.ies@ipsacademy.org",
        "Name": "U-Kart_shopping"
      },
      "To": [
        {
          "Email": email,
          "Name": "Bhai Kamal"
        }
      ],
      "Subject":subject,
      "HTMLPart": html,
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    callback(null);
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })

}