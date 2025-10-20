export const setItem = (key, data) => {
  try {
    return localStorage.setItem(key, data);
  } catch (error) {
    console.log("error saving data", error);
  }
};
export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log("error getting data");
  }
};

export const removeItem = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    console.log("error removing data");
  }
};
