const fs = require('fs');
const axios = require('axios');
const process = require('process');

function hanldeOutput(text, out){
    if(out){
        fs.writeFile(out, text, 'utf8', (err) => {
            if(err){
                console.error("Counldn't write file:", err)
                process.exit(1)
            }
        });
    } else {
        console.log(text);
    }
}

async function webCat(url, out) {
    try {
        const res = await axios.get(url)
        hanldeOutput(res.data, out)
    } catch(err) {
        console.error("ERROR>>>>", err.message)
        process.exit(1)
    }
}

function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data) {
        if(err){
            console.error('ERROR>>>', err)
            process.exit(1)
        } else {
            hanldeOutput(data, out)
        }
    })
}

let path;
let output;

if(process.argv[2] == '--out') {
    output = process.argv[3];
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.startsWith('http')){
    webCat(path, output)
} else {
    cat(path, output)
}

