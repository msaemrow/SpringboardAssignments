const fs = require('fs');
const axios = require('axios');
const process = require('process');

async function webCat(url) {
    try {
        const res = await axios.get(url)
        console.log(res.data)
    } catch(err) {
        console.error("ERROR>>>>", err.message)
        process.exit(1)
    }
}

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.error('ERROR>>>', err)
            process.exit(1)
        }
        console.log(data)
    })
}

const input = process.argv[2];

if (input.startsWith('http://') || input.startsWith('https://')){
    webCat(input)
} else {
    cat(input)
}

