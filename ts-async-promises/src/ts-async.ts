import type { Users } from './types';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

// FETCH promise chain:
// prettier-ignore
const fetchUsersTyped = fetch(urlUsers)       // fetch(): () -> Promise<Response>
  .then((res) => {                            // res: Response
    console.info(`res: `, res);
    // return res.json();                     // json(): () -> Promise<any>
    return res.json() as Promise<Users>;      // typecast as Promise<T>
  })
  .then((data) => {                           // data: any, data: Users
    console.info(`data: `, data);
  });
console.info(`fetchUserTyped: `, fetchUsersTyped);

// PROMISE (immediate execution):
// prettier-ignore
const promUsersTyped = new Promise(async (resolve, _reject) => {
  const res = await fetch(urlUsers);          // res: Response
  // const data = await res.json();           // data: any
  // const data = await res.json() as Users;  // data: Users
  const data:Users = await res.json();        // data: Users
  console.info(`res: `, res);
  console.info(`data: `, data);
  resolve(data);
});
console.info(`promUsersTyped: `, promUsersTyped);

// ASYNC FUNCTION (call to execute):
// prettier-ignore
async function getUsersTyped() {
  const res = await fetch(urlUsers);          // res: Response
  // const data = await res.json();           // data: any
  // const data = await res.json() as Users;  // data: Users
  const data:Users = await res.json();        // data: Users
  console.info(`res: `, res);
  console.info(`data: `, data);
  return data;
}
console.log(`getUsersTyped`, getUsersTyped());
