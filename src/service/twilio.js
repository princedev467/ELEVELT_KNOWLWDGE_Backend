const accountSid = process.env.TWILIO_ACCSID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS=async(mobile_no,OTP)=>{
    try {
        client.messages
    .create({
        body: `Your OTP is: ${OTP}`,
        messagingServiceSid: 'MG68d7777f3d7389b145b0a251f4ed75b1',
        to: mobile_no
    })
    .then(message => console.log(message.sid));
    } catch (error) {
        throw new error(error)
    }
    
}

module.exports=sendSMS