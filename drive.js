require('dotenv').config()
const {google} = require('googleapis')
const fs = require('fs')
const path = require('path')
const oauth2client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI

)
oauth2client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
const drive = google.drive({
    version:'v3',
    auth:oauth2client
})


async function uploadFile(filepath){
    try{
        const res = await drive.files.create({
            requestBody:{
                name: Date.now()+"img.jpg",
                mimeType:"img/jpg"
            },
            media:{
                mimeType:"img/jpg",
                body: fs.createReadStream(filepath)
            }
        })
        
        
        return res.data.id
        
        
        

    }
    catch(err){
        
        console.log(err.message)

    }
    
    

}
async function generateURL (fileId){
    try{
        await drive.permissions.create({
            fileId:fileId,
            requestBody:{
                role:"reader",
                type:"anyone"
            }
        })
        const res = await drive.files.get({
            fileId:fileId,
            fields : 'webViewLink'
        })
       
        
        return res.data.webViewLink
        
        
        


    }
    catch(err){
        console.log(err.message)

    }

} 




module.exports.uploadFile = uploadFile
module.exports.generateUrl = generateURL
