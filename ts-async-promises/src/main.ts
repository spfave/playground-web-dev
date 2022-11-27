export {};
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

// Promise: No error handling, No types
// const promUsers = new Promise(async (resolve, reject) => {
//   const response = await fetch(urlUsers);
//   const data = await response.json();
//   console.info(`response: `, response);
//   console.info(`data: `, data);
//   resolve(data);
// });
// console.info(`promUsers: `, promUsers);

// Fetch promise chain: No error handling, No types
// prettier-ignore
// fetch(urlUsers)                   // fetch(): () -> Promise<Response>
//   .then((res) => {                // res: Response
//     res.json();                   // json(): () -> Promise<any>
//   })
//   .then((data) => {               // data: any
//     console.log(data);
//   });

// Async function: No error handling, No types
// async function getUsers1() {
//   const response = await fetch(urlUsers);
//   const data = await response.json();
//   console.info(`response: `, response);
//   console.info(`data: `, data);
//   return data;
// }
// getUsers1();
