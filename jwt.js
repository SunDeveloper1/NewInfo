const crypto = require('crypto');
const signer=crypto.createSign("RSA-SHA256")

const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDgCZcgyFURnCaZ\nqD8XlRdEvnk9WynvyxMACBKi5r0INNuYbL8aaTJ7V4g07W3hKttN7HeZk5DKJ0aM\neaaSj8EOUv+VNdVpZXWChQ2v3HXq/rrtpvIO7LA7BQchWzXfUMbzckCMhW3Ma6Eq\nbiqgu8Q525J5dZ4Vpn73hvibteZa396UEgd2pGIAvhEZgZMqBmFhMxkymtJgOitS\n+9y21oR5V33ZTcs8Itz3sFXzcmljz9dcYFhcBdyd8XdbM2Vkuzmexzf0Djd335/L\nIvQXt8e3PkNOjCt6bhIU7NSGRtwo1OGhPWRPj79hASuVnwqGrYOM2PFgQswgI/4/\nCURVGAHTAgMBAAECgf8RcFvprMBCppN82gfkSvjVsYRJ8Ny+4125vj164JUj9JY4\nReTNWD8qqWBdawnwuhC3mR4fbbjaVT6Ja8A7Favxo1EvUwxpkuKqgsVN1/ILuxkM\nnNfR7/yx0Ad0u2U3BUHnK+vrN12Uu7YLZB4kAjMggvQf527W5qiYz4XnhxP+vlhO\nIoOFfylEfw2S4sTBaNnEhuNG5EmtY4MaZIFsgH8nTIwXeNakUv4NTOPJ/GkpaHLK\nCvi03KbDuAy9nr5YJuMNKERr9g1Vnp0nffphyOvSX/m08VCcXKlBrXh/M8L/yQzJ\nGR24evFhJiTAI0iXox/tsukawLm9yItATQ5/6lECgYEA/03WV4iPSqx3vf39gQ0g\nvdTDvjPepiOp4IQF6aoQk4GOgX4CnamvF3moHRGBlMhSnDetgH8UFWXTXbNVyO0m\nDTCfDgJrbcIiMd5LU+rUvS2HZDeWes1Pk5BGrusI34XmWNoZ/qDw68/FtyVNrHA6\nYA7k+6i9BKHbh41pnttKYYMCgYEA4KXvD2oLMVU2hqviwSpJ5T/JPAAx/QBEceCI\nH///KEgKrfL20J3qNMtJyAllvn2Vs7FRaXMAg7GsbcfnNize9nuQXspagV7gXTOF\n1QAzHMWOCe1BAUapqVtb6pEfj46iQjW3XErQTihKSam+lrk+tOlXBOxMR7Cen6L8\nh7bifXECgYEApU3+1NqE/TLCrXABbkfTxVY4D7WCGkzJN6gENBF7fibK4Kl4hCFU\nT3zkDz5AitdSNfgPDT47AMfXnbn6d4iltLCgq++BI6YpgeSPHZzVdlA+c/NSKd06\nAy/NtIBWVHRce3dskWQf2m/DcxxiOJ7KDVxXg2L0UEWE4TX9B3CxroUCgYBVDBzs\nHf5sx9DjvTEUZhkhtDtP/tbt7Gr9Hb8LNlR4AIYigqgUJKSlJg0hsQUWz96b79Zd\ncI9STDJ2QUb0SJqEgBUQ/dSzw6J3Rmk1UWUIUHZMpciFXiYfGpo6vIRRSfN9024+\nf4hK/o/ZQW0JDMqDnQ83qunZ/jCfSQoHqyIl0QKBgDx+6ETrYP9zXtp6Lb80P5jn\nIoVg2hKjuRjHBQ8E34IFZY4c6ZUrKYxN7+pluJz/8R2jG6HtQeBLh9S+aAFkUauB\noWyte4h20uBSvFL5Wpq9G/y+T8gJ1AAM8JsoqlU1Srz+QgHVoLqZ1NB14UbNrQPn\n6JMDTdEHlbKa8oAyKOV0\n-----END PRIVATE KEY-----\n"

const now = new Date().getTime() / 1000;
const oneHour = 60 * 60;
const expireTime = now + oneHour;


const header={
    alg :"R256",
    typ :"JWT"
}

const claimSet = {
    iss: "e2tmails@gmail-nodejs-api-project.iam.gserviceaccount.com",
    iat: now,
    exp: expireTime,
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    aud: "https://oauth2.googleapis.com/token"
}


function toBase64URL(json) {
    const jsonString = JSON.stringify(json);
    const btyeArray = Buffer.from(jsonString);
    return btyeArray.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

const encodedHeader = toBase64URL(header);
const encodedClaimSet = toBase64URL(claimSet);

signer.write(encodedHeader + "."+ encodedClaimSet)
signer.end;


const signature=signer.sign(privateKey,"base64")


const encodedSignature = signature.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

const jwt = `${encodedHeader}.${encodedClaimSet}.${encodedSignature}`;

console.log(jwt)
