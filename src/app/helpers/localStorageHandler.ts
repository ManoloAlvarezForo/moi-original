import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Authentication keyword for the localstorage.
 */
const AUTH_TOKEN = 'AUTH_TOKEN';

export type UserType = {
  name: string;
  email: string;
  id: string;
};

/**
 * Gets the token value from the LocalStorage.
 */
export const getToken = async () => {
  const response = await AsyncStorage.getItem(AUTH_TOKEN);
  return response;
};

/**
 * Storages the new token in the local storage.
 *
 * @param {string} newToken Value that represents the new token.
 */
export const saveToken = async (newToken: string) => {
  return await AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

/**
 * Storages the user information and the token in the localstorage.
 *
 * @param {string} token string that represents a token.
 * @param {object} user object with user information.
 */
export const saveUserInformation = async (token: string, user: UserType) => {
  const name: [string, string] = ['@user_name', user.name];
  const email: [string, string] = ['@user_email', user.email];
  const id: [string, string] = ['@user_id', user.id];
  const newToken: [string, string] = [AUTH_TOKEN, token];

  try {
    await AsyncStorage.multiSet([name, email, id, newToken]);
  } catch (error) {
    console.log(`Error to storage [${error}]`);
  }
};

// /**
//  * Storages the user information and the token in the localstorage.
//  *
//  * @param {string} token string that represents a token.
//  * @param {object} user object with user information.
//  */
// export const saveUserInformationAsObject = async (user: UserType) => {
//   // const name = ['@user_name', user.name];
//   // const email = ['@user_email', user.email];
//   // const id = ['@user_id', user.id];
//   // const newToken = [AUTH_TOKEN, token];

//   try {
//     await AsyncStorage.multiSet(['user'], JSON.stringify(user));
//   } catch (error) {
//     console.log(`Error to save user [${error}]`);
//   }
// };

export const getUserInformation = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_id');
    if (value !== null) {
      // value previously stored
      return value;
    }
    return value;
  } catch (e) {
    console.log('[Error]: Error to get user id.');
  }
};

export const getUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_id');
    if (value !== null) {
      // value previously stored
      return value;
    }
    return value;
  } catch (e) {
    console.log('[Error]: Error to get user id.');
  }
};

export const getUserName = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_name');
    if (value !== null) {
      return value;
    }
    return value;
  } catch (e) {
    console.log('[Error]: Error to get user name.');
  }
};

/**
 * Gets a property from the localstorage.
 *
 * @param {string} property string that represent the a property.
 */
export const getStorageProperty = async (property: string) => {
  try {
    return await AsyncStorage.getItem(property);
  } catch (error) {
    console.log(`Error to get a property [${error}]`);
    return null;
  }
};

/**
 * Removes the authentication token from the localstorage.
 */
export const signOut = async () => {
  const keys = ['@user_name', '@user_email', '@user_id', AUTH_TOKEN];
  try {
    const response = await AsyncStorage.multiRemove(keys);
    return response;
  } catch (e) {
    return null;
  }
};

export const removeUser = async () => {
  const keys = ['@user_name', '@user_email', '@user_id'];
  try {
    const response = await AsyncStorage.multiRemove(keys);
    return response;
  } catch (e) {
    return null;
  }
};
