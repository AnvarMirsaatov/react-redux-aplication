export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.log("error saving data", error);
  }
};
export const getItem = (key) => {
  try {
    localStorage.getItem(key);
  } catch (error) {
    console.log("error getting data", error);
  }
};
