import { KidDevUserDescriptor } from "./../model/kidDevModel";

export function getUserDescriptor(userId: string): KidDevUserDescriptor {
  const descriptors = require('./../assets/userDescriptors.json');
  const users = descriptors.users;
  for (let i=0; i < users.length; i++) {
    const user: KidDevUserDescriptor = users[i];
    if (user.id === userId) {
      return user;
    }
  }
  return getEmptyUser();
}

export function getEmptyUser() {
  return ({id: "", displayLevel: 0});
}