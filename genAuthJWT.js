const { google } = require('google-auth-library');

const { JWT }=require('google-auth-library')
const fs = require('fs');
const path = require('path');

// Path to your service account key file
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'credentials.json');

// Load the service account key JSON
const keyFile = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));


// The OAuth2 client to get an access token
// const client = new google.auth.JWT({
//   email: keyFile.client_email,
//   key: keyFile.private_key,
//   scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
// });

async function main() {
    const client = new JWT({
      email: keyFile.client_email,
      key: keyFile.private_key,
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    // const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
    // const res = await client.request({url});

    const token=await client.authorize()
    console.log(token);
  }

  main().then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err.message)
  })


// Generate the JWT
async function generateJWT() {
  try {
    const token = await client.authorize();
    console.log('Access Token:', token.access_token);
  } catch (error) {
    console.error('Error generating JWT or access token:', error);
  }
}

// Run the function
// generateJWT();
