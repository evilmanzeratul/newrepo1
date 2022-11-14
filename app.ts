//npm i node-fetch --save

import axios from "axios";
import fetch from "node-fetch";
import fs from 'fs';

const apiUrl: string = "https://www.googleapis.com/books/v1/volumes";
const phrase: string = "clarcson"
// 1. zapisać w pliku 1, 2, 3 => zrobić to za pomocą 3krotnego zapisania(3xwriteFileSync)
// 2. zadanie pomocnicze
// a) zrobić metode saveToFile => w której bedziesz zapisywał dane do pliku z imieniem i stanem konta => { adam: 20, Beata: 12312 }
// b) Jeżeli jakieś imie występuje w pliku to nie dodawaj kolejnego tylko edytuj stan konta(najlepiej nie zmieniaj kolejności)

let path = "plik123.txt"
let path2 = "saldo.txt"

let data1 = "1"
let data2 = "2"
let data3 = "3"
// bez flagi zrób czyli odczytaj i zapisz z dodatkiem
// fs.writeFileSync(path, data1)
// const fileData: Buffer = fs.readFileSync(path);
// let sum = fileData.toString()+data2
// fs.writeFileSync(path, sum)
// const fileData1: Buffer = fs.readFileSync(path);
// let sum1 = fileData1.toString()+data3
// fs.writeFileSync(path, sum1)
// console.log(sum1)

// 1.
function checkFileExists (adress : string): boolean{
  try{
    const fileData = fs.readFileSync(adress, 'utf8')
    console.log(fileData);
    console.log("istnieje")
    return true
  }
  catch(error){
    console.log("nieistnieje");
    // throw error;
    throw new Error('wyjebało się na checkFileExists');
    return false;  
  }
}
// 2. try/catch => jak poprawnie pisać try/catch znajdz 1 błąd
// czy try catch powiniuen zprawdzić czy funkcja działa, poza nią ?
// fa 

// fb 
// t a  c
function checkJsonInsideFile(adress : string): boolean{
  try{
    const fileData = fs.readFileSync(adress, 'utf8')
    JSON.parse(fileData.toString())
    console.log("to jest JSON")
    return true
  }
  catch(error){
    console.log("to nie jest JSON")
    return false
  }
}

// checkFileExists (path2)
// console.log(checkFileExists (path2))
// checkJsonInsideFile(path2)
// console.log(checkJsonInsideFile(path2))


// nie potrzebne
// function cerateFileAndWriteIfNotExist(adress: string): void{
//   if (!checkFileExists(adress)){ 
//     const newObject = {}
//     fs.writeFileSync(adress, JSON.stringify(newObject) ) // JSON.stringify(newObject) przekształca Json (Json jest jak obiekt) na stringa
//     console.log("plik został utworzony")
//   }
//   else{
//     console.log("plik istnieje")
//   }
// }

function readJsonFile (adress: string): object | void{ 
  // cerateFileAndWriteIfNotExist(adress) // tu stworzyłem plik
  const newObject: object = {}
  if(!checkFileExists(adress)){
    fs.writeFileSync(adress, JSON.stringify(newObject) )
    const fileData = fs.readFileSync(adress, "utf-8") 
    return JSON.parse(fileData)
  }


  // zwalidować plik/json
  // jeśli nie istnieje to dodać
  // jeżeli istnieje to dodać kolejne wartości
  // else if (checkJsonInsideFile(adress)){ 
  //   const fileData = fs.readFileSync(adress, 'utf8') 
  //   return JSON.parse(fileData)
  // }
  // else {
  // console.log("nie ma Jsona")
  // }
  try{
    checkJsonInsideFile(adress)
    const fileData = fs.readFileSync(adress, 'utf8')
    return JSON.parse(fileData)

  }
  catch(error){
    throw new Error('wyjebało się na checkJsonInsideFile');
  }
}

console.log(readJsonFile (path2), "gdzie to jest 1") // tu działa 

function saveToFile (name: string, saldo: number, adress: string ):object | void {
    const object = readJsonFile(adress) // tu zaraguj na błąd funkcji 
    const newObject:any = {...object} 
    newObject[name]=saldo
    console.log(newObject)
    console.log(JSON.stringify(newObject), "toto") 
    return fs.writeFileSync(adress, JSON.stringify(newObject))
}

// const a: any = {
//   name: 'Wirpool',
//   price: 123,
//   kolor: 'biały'
// }
// a.name = 'Frania'
// a.surname ="cos"


// {tomek:20, name: adam, saldo: 20}
// {{name : costam: jakaswartość }}

//jak dodać atrybut do biektu lub jsona
// synch vs async - fs
saveToFile('adam', 20,path2);
saveToFile('beata', 40,path2);
saveToFile('adam', 120,path2);
// dupa
// const book = {author: "janek ", price : 1}
// const { author: personName = "mirek.K.", price = 0 } = book
// console.log( personName)
// console.log( book)


// const obiekt: any = {}
// obiekt['foo'] = 1;
// console.log(obiekt)

// <- to też nie jest json

// {test: 123}

// 1. sprawdzić czy plik istnieje
// 2. jeśli nie istnieje to stworzyc plik z jsonem w środku
// 3. jeżeli istnieje to odczytać i dodać/zmodyfikować json'a tylko jeśli json istneje dodaj wartość inaczej zróc błąd 
// 4. reaguj na błąd w pliku

// ad 2/3 -> {adam: 10}{beata: 120} <- to nie jest prawidłowy json
// {adam: 10}
// {...sum ,name, saldo}
// {adam: 10, name: beata, saldo: 110}


// const fileData2: Buffer = fs.readFileSync(path2);
// console.log(fileData2.toString());

// fs.readFile(path2, (err, val) => modifyData(val));

// function modifyData(data: Buffer) :void{
//  console.log(JSON.parse(data.toString()))
// }

// const dzejson = { a: 12 };
// const strig = "{ a: 12 }";
// dzejson.a

// programowanie synchronicze vs asynchronicze
// 5kb => 0.3s
// 5gb => 30min
// po kliknięciu przycisku chcesz zapisać plik


// {
//   adam: 120,
//   beata: 40,
// }




// 1. how to get data from aciox/fetch response
// 2. cashowanie danych działa jak pliki cookie 
// 


// 1. poczytać import/export/export default itd...
// module => plik(app.ts)

// module.exports = storeData;
// module.exports = storeDataWithLog;
// // w innym pliku importujesz:
// import { storeData, storeDataWithLog } from 'app.ts';
// export default storeData;
// import storeData from 'app.ts';


// 2. callback HELL 

// 3. fs jak działa jakie ma opcje(akcje synchroniczne vs akcje asynchroniczne)


// function functionWithFetch (url: string, data: string){
//   fetch(`${url}?q=${data}`).then((response) => console.log(response));
// };

// function functionWithFetch (url: string, data: string){
//   return fetch(`${url}?q=${data}`, {
//     method: 'GET'
//   })
// }
// function getDataFromUrl(url: string, data: string) {
//   return axios.get(`${url}?q=${data}`);
// };
// // fs.writeFileSync( "plik.txt","raz")
// // fs.writeFileSync( "plik.txt", "dwa" )



// async function fetchAsync(url: string, data: string) {
//   // try{
//   //   const resolve = await functionWithFetch(url, data);
//   //   const jsonResolve = await resolve.json() // przekształcenie odpowiedzi na JSON'a
    
//   //   console.log(JSON.stringify(jsonResolve)); //  przekształcenie JSON'a do stringa 
//   //   fs.writeFileSync( "plik.txt", JSON.stringify(jsonResolve)) //1

//   //   // how to get data from aciox/fetch response
    
//   //   // propozycja do rozwiązania:
//   //   // zrobić console.log'a wyniku


//   //   // fetch('strona.pl/jakis_adres',{method: "POST", body: resolve.body})
//   //   return resolve;
//   // }
//   // catch(reject){
//   //      console.log(reject)
//   // }
//   try{
//     const resolve = await getDataFromUrl(url, data);
//     const jsonResolve = resolve.data; // zwratca Jsona
//     console.log(JSON.stringify(jsonResolve)); //  => co to kurwa pokazuje :D ps. typ Response + fetch

//     fs.writeFileSync( "plik.txt", JSON.stringify(jsonResolve) ) //2
//     return resolve;
//   }
//   catch(reject){
//        console.log(reject, 'błąd')
//   }


// }

// const result = fetchAsync(apiUrl,phrase)

// // const a  = {};
// // console.log(a.toString());
// // const b: any[]  = [];
// // console.log(b.toString());


// // const resultToSave = result.toString()

// // const writeMe = fs.writeFileSync( "plik.txt", resultToSave )


// // pytanie na rekrutacje -> must have
// console.log(1);
// setTimeout(() => console.log('co jest ponizej'), 0);
// console.log(3);
// // 1 3 2

// superCars.pl/brand?q=bmw
// ilość samochodów wyprodukowanych, modele, średnia cena, 
// {
//   numberOfCars: 12,
//   models: [
//     {
//       name: 'E36',
//       description: 'Konkurent marki mercedes'
//     }
//   ],
//   price: 123,
// }



// api zawierające dane o książkach
// muminki 
// plik musisz sobie uporządkować w taki sposób aby sprawdzanie czy "muminki" były odpytanie było wygodne => dowoloność

// zapisywanie i odczytywanie pliku .txt
// const readMe = fs.readFileSync("plik.txt", utf8 ) utf8 to format zapisu

// const writeMe = fs.writeFileSync("plik.txt", plikKtóry Chcemy zapisać )


// function storeData (data, path) {
//   try {
//       fs.writeFileSync(path, JSON.stringify(data))
//   } catch (err) {
//       console.error(err)
//   }
// }

//const storeData = require('./modules/storeData');


// co ta metoda powinna zwrócić
// function getDataFromUrl(url: string, data: string) {
//   axios.get(`${url}?q=${data}`).then((response) => console.log(response));
// };












//async await .then
// google :) - how to save files in js
// 

// do zrobienia:
// 1. naprawić fetch - fetch is not defined   npm install node-fetch
// 2. dokończyć zadanie:
// a) zrobić request // dostać console loga
// b) złapać odpowiedź od requestu do zmiennej
// c) zapisać w pliku
// d) jeżeli to zapytanie istnieje w pliku to pobrać z pliku - jeśli nie to robisz request


// git
// gitignore

// main.js
// 1. a
// 2. bfdgdf
// 3. c

// main.js - branch1
// 1. a
// 2. B
// 3. c
// 4. d

// main.js  - branch2
// 1. a
// 2. BB
// 3. c
// 4. d

// wynik:
// 1. a
// 2. ==
// 3. c
// 4. d


// const link = 'http://strona.pl/pizza';
// const link2 = 'http://strona.pl/dostawca';

// jak do tych danych sie dostać
// getDataFromUrl(apiUrl, phrase);
// functionWithFetch (apiUrl, phrase);



// rzeczy do ogarnięcia na mus:
// 1. GIT
// 2. REST API
// 3. Promisy w JS

// request - to jest zapytanie do jakiejś strony "żądanie"

// HTTP - protokół zasady komunikacji
// Kody odpowiedzi[ 200, 204, 400, 500 ]
// Metody Odpytania - GET, POST, PUT, PATCH, DELETE
// BODY - ciało requesta które przekazujesz we wszystkich oprócz geta


// REST - sposób komunikacji
// zasób - to jest cokolwiek tzn. user, pizza, restauracja itd...
// GET /user?name=adam - pobieram wszystkich userów(dane do request wysyłamy jako get => ?name=adam)
// POST /user - zapisuje zasób nowego usera(dane usera muszą być w BODY)
// PUT/PATCH /user/3 - edytuje usera który ma id=3(dane usera muszą być w BODY)
// DELETE user/3 - usuwam usera który ma id=3(dane usera muszą być w BODY)




// CALLBACK
// function jakasFunkcja(a: number, operation: Function) {
//   return operation(a);
// }