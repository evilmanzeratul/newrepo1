const arrayOfPromise = [
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 600)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 500)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 400)),
    new Promise((resolve, reject) => setTimeout(() => reject("blad"), 100)),
    new Promise((resolve, reject) => setTimeout(() => resolve(5), 3000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(6), 200)),
    new Promise((resolve, reject) => setTimeout(() => resolve(7), 100))
];
// 1. poczytać o błędzie PromiseRejectionHandledWarning: Promise rejection was handled asynchronously
// 2. Jeśli wystąpi błąd w której kolwiek promisie ma on zostać zwrócony wraz z poprzednimi wynikami z promis niewykonując kolejnych
//  3. try catch wewnątrz for'a a nie poza nim
async function recursivePromise(arrayOfPromises) {
    const arrayOfResult = [];
    let i = 0;
    try {
        for (const promise of arrayOfPromises) {
            if (i === arrayOfResult.length) {
                i++;
                const newElement = await promise;
                arrayOfResult.push(newElement);
                //console.log(i, newElement)
            }
        }
    }
    catch (err) {
        console.log("element nie został pobrany");
    }
    return arrayOfResult;
}
//recursivePromise(arrayOfPromise).then((res)=>console.log(res))
// async function fetchMock(){
//   let promise = new Promise(() => {
//     throw 'error fetching result';
//   });
//   promise.catch(()=>null); // unused rejection handler
//   return promise;
// }
// rekurencja
// function recursivePromise2(arrayOfPromise: Promise<unknown>[]) {
//     const arrayORresove: any[] = [];
//     let a = arrayOfPromise.length
//     const result = new Promise((resolve, reject) => {
//       arrayOfPromise.forEach((promise, index) => {
//         promise.then((el) => {
//           arrayORresove[index] = el;
//           if (!arrayORresove.includes(undefined) && arrayORresove.length === arrayOfPromise.length) {
//             resolve(arrayORresove.splice(0,a))
//           }
//         }
//         ).catch(() => {
//           a = index
//           console.log("element nie został pobrany")
//           arrayORresove[index] = "err"
//         })
//       })
//     })
//     return result
//   }
// trzeba wywalić arr poza funkcje rekurencyjną 
// 5 promisów
// arr[0].then() => rozpoczyna synchronicznie 5 funkcji które obcinają tablice itp.
// wewnątrz kodu asynchronicznego w then() rozpoczynasz w jednej chwili kolejne .then()
// function recursive(arr: Promise<unknown>[], arrayORresove: any[]) {
// // function recursive(arr: Promise<unknown>[], arrayORresove: any[], index: number) {
// // index ++
//   const result = new Promise((resolve, reject) => {
//     arr[0].then((el) => {
//       // 1. wykonaj promise
//       // 2. obetnij po otrzymaniu wyniku
//       // 3. jeżeli jest nadal kolejny promise to powtórz
//       // 4. jak nie ma to rzuć resolve
//       console.log(el, "element tablicy wypchany")
//       arrayORresove.push(el)
//       arr.splice(0, 1);
//       console.log(arr.length, "długość tablicy")
//     }).then(()=>{
//       if (arr.length !== 0) {
//         recursive(arr, arrayORresove)
//           .then((res) => {
//             console.log(res, "1.0")
//             console.log(arrayORresove, "1.1")
//             // recursive(index++);
//             resolve(res)
//             resolve(arrayORresove)
//           }
//           ).catch(() => {
//             console.log(arrayORresove, "2")
//             resolve(arrayORresove)
//           })
//       }
//       if (arr.length === 0) {
//         console.log(arrayORresove, "3")
//         resolve(arrayORresove)
//       }
//     }).catch(() => {
//       reject("err")
//     })
//   })
//   console.log('dupa');
//   return result
// }
function recursive(arrayOfPromise, arrayORresove, index) {
    // function recursive(arr: Promise<unknown>[], arrayORresove: any[], index: number) {
    // index ++
    const result = new Promise((resolve, reject) => {
        arrayOfPromise[index].then((el) => {
            arrayORresove.push(el);
            index++;
            console.log(arrayORresove);
            if (arrayORresove.length === index && arrayOfPromise.length > index) {
                recursive(arrayOfPromise, arrayORresove, index).then((res) => {
                    if (arrayOfPromise.length === arrayORresove.length) {
                        console.log(res, "1");
                        resolve(res);
                    }
                });
            }
        }).catch(() => {
            console.log(arrayORresove, "2");
            resolve('test');
            // reject("err")
        });
    });
    return result;
}
function recursivePromise2(arrayOfPromise) {
    let index = 0;
    const arr = [...arrayOfPromise];
    const arrayORresove = [];
    return recursive(arr, arrayORresove, index).then((res) => res).catch((err) => err);
}
recursivePromise2(arrayOfPromise).then((res) => console.log(res, "wynik")).catch((err) => err);
export {};
