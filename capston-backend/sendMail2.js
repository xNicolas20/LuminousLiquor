import nodemailer from 'nodemailer'
import {google} from "googleapis"
const {OAuth2} = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const{
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env


const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const sendEmail = (to, message, user) => {
oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
})

  const accessToken = oauth2Client.getAccessToken

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken
    }
  })

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "Invoice - Luminous Liquor",
    html: `
    <div>Hello ${user}</div>
    <br>
    <div>${message}</div>
    `
  }

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if(err){
      console.log(err)
      return err} ;
      console.log(infor)
    return infor
  })
}

export default sendEmail;