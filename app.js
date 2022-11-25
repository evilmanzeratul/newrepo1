//npm i node-fetch --save
import axios from "axios";
import fetch from "node-fetch";
import fs from 'fs';
const apiUrl = "https://www.googleapis.com/books/v1/volumes";
const phrase = "clarkson";
const cookie = "plik.txt";
function functionWithFetch(url, data) {
    return fetch(`${url}?q=${data}`, {
        method: 'GET'
    });
}
function getDataFromUrl(url, data) {
    return axios.get(`${url}?q=${data}`);
}
;
function findPhrase(currentElement, phrase) {
    if (currentElement.hasOwnProperty(phrase)) {
        console.log("true");
        return true;
    }
    else {
        console.log("false");
        return false;
    }
}
//newObject[clarson]=wynik to co sciagneło z api 
// kind
// clarkson
// ala 
// odpowiedzi od api
// w pliku.txt
// wynik = { kind: { wynik zapytania z api }
//   clarkson: { wynik zapytania z api }
//   ala: { wynik zapytania z api }
//}
// wynik.hasOwnProperty('kind')
// DRY - dont repeat yourself
// 1. brakuje zwracania z pliku jeżeli istnieje.
// 2. zrób na osobnym branchu w git i zrób PR(pull request) do głównego branchu
async function fetchAsync(url, phrase, file) {
    try {
        const fileData = fs.readFileSync(file, 'utf8');
        const objectData = JSON.parse(fileData);
        // if(objectData[phrase]){
        if (!findPhrase(objectData, phrase)) {
            const resolve = await functionWithFetch(url, phrase);
            const jsonResolve = await resolve.json();
            console.log("1");
            const newObject = { ...objectData };
            newObject[phrase] = jsonResolve;
            fs.writeFileSync(file, JSON.stringify(newObject));
            return newObject;
        }
        else {
            return objectData;
        }
    }
    catch (reject) {
        console.log(reject);
    }
}
async function axiosAsync(url, phrase, file) {
    try {
        // 1. najpierw sprawdz w pliku a potem sprawdz w api
        // { adam:120, beata: 40 } - api
        // mam zapytać o klucz w jsonie
        // { adam:120 }- plik
        const fileData = fs.readFileSync(file, 'utf8');
        const objectData = JSON.parse(fileData);
        if (!findPhrase(objectData, phrase)) {
            const resolve = await getDataFromUrl(url, phrase); // Asiosresponse sprawdz w googlu jak zrobić json ( chce wiedzieć )
            const jsonResolve = await resolve.data; // zwratca Jsona // zapytaj o to ???
            console.log("2");
            const newObject = { ...objectData };
            newObject[phrase] = jsonResolve;
            fs.writeFileSync(file, JSON.stringify(newObject));
            return newObject;
        }
        else {
            return objectData;
        }
    }
    catch (reject) {
        console.log(reject, 'błąd');
    }
}
// { adam:120, beata: 40 } - api
// mam zapytać o klucz w jsonie
// { adam:120 } - plik
// pytam o beata => strzelic do api
// jeżeli adam to pobierasz z pliku
// function checkPhrase (regex :RegExp, data : string, file: string ,jsonResolve: any ){
//   if (!regex.test(data)){
//     fs.writeFileSync( file, JSON.stringify(jsonResolve))
//     console.log("axios")
//   }
// }
async function showResult() {
    const result1 = await fetchAsync(apiUrl, phrase, cookie);
    const result2 = await axiosAsync(apiUrl, phrase, cookie);
    console.log(result1);
    console.log(result2);
}
showResult();
