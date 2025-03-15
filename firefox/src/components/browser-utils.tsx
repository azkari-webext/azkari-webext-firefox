

export const readData = (varName: string) => {
  return browser.storage.local.get([varName]).then((result: any) => {
    return result[varName];
  });

};

export const storeData = (varName: string, value: any) => {
  const temp = {};
  temp[varName] = value;
  return browser.storage.local.set(temp).then(() => {
    console.log("Storing " + varName, value);
    return true;
  });
};

export const getTopVisitiedSites = () => {
  return browser.topSites.get( {includeFavicon: true}).then(async (data) => {
    return data;
  });
};
