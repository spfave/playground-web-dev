export {};
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

// Promise - No error handling, No Types
// const promUsers = new Promise(async (resolve, reject) => {
//   const response = await fetch(urlUsers);
//   const data = await response.json();
//   console.info(`response: `, response);
//   console.info(`data: `, data);
//   resolve(data);
// });
// console.info(`promUsers: `, promUsers);

// Async function - No error handling, No types
// async function getUsers1() {
//   const response = await fetch(urlUsers);
//   const data = await response.json();
//   console.info(`response: `, response);
//   console.info(`data: `, data);
//   return data;
// }
// getUsers1();
