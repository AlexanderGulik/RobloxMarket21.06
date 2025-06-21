export const getItemFromLocalStorage = (name: string) => {
  const local = localStorage.getItem(name);
  if (local) {
    const result = JSON.parse(local);
    return result;
  }
  return null;
};

export const putItemInLocalStorage = (name: string, data: any) => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem(name, dataJSON);
};
