const baseURL = 'http://numbersapi.com';
let favNum = 101;

//  PART 1
async function part1(){
    let res = await axios.get(`${baseURL}/${favNum}?json`)
    console.log("FAV NUMBER- " + res.data.text)
}
part1()


//  PART 2
let min = 17;
let max = 22;

async function part2(){
    let res = await axios.get(`${baseURL}/${min}..${max}?json`)
    for (let num in res.data){
        console.log(res.data[num]);
    }
}
part2()


//  PART 3
async function part3(){
    let facts = await Promise.all(
        Array.from({length: 4}, () => axios.get(`${baseURL}/${favNum}?json`))
    );
    facts.forEach(res => {
        $('body').append(`<h1>${res.data.text}</h1>`)
    });
}

part3()