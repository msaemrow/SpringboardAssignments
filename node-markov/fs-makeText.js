/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./fs-markov");
const axios = require("axios");
const process = require("process");


function generateText(text){
    let nm = new markov.MarkovMachine(text);
    console.log(nm.makeText());
}


function makeText(path){
    fs.readFile(path, "utf8", function cb(err, data){
        if (err){
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1)
        } else{
            generateText(data)
        }
    });
}

async function makeURLText(url){
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err){
        console.error(`Cannot read URL ${url}: ${err}`)
        process.exit(1)
    }
    generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if(method=="file"){
    makeText(path);
} else if(method=="url"){
    makeURLText(path)
}else{
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}