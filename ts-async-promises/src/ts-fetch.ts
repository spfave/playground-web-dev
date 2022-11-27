import type { User } from './types';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

// Wrapped fetch
async function getUser(userId: number): Promise<User> {
  const res = await fetch(`${urlUsers}/${userId}`);

  if (!res.ok) {
    // console.info(`res.status: `, res.status);
    // console.info(`res.statusText: `, res.statusText);
    const errInfo = [`status: ${res.status}`, `statusText: ${res.statusText}`];
    throw new Error(errInfo.join('\n'));
  }

  const data: User = await res.json();
  return data;
}

getUser(1).then((data) => console.info(`data:`, data));
getUser(-1).catch((err) => console.warn(`err:`, err));

// Demo of wrapped fetch
async function pocFetch(): Promise<void> {
  const user = await getUser(2);
  console.info(`user: `, user.name);
}
pocFetch();
