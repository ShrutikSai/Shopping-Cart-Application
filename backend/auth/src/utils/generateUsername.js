import UserRepository from "../repositories/userRepository.js";
const userRepository = new UserRepository();
const generateRandomUsername = async () => {
  let username;
  let isUnique = false;
  while (!isUnique) {
    const randomString = Math.random().toString(36).substring(2, 8);
    username = `user_${randomString}`;
    const existingUser = await userRepository.getUserByUsername(username);
    if (!existingUser) {
      isUnique = true;
    }
  }
  return username;
};
export default generateRandomUsername;
