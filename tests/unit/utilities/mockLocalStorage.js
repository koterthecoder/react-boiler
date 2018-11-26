let mockStorage = {};

function clearStorage() {
  mockStorage = {};
}

export default {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key],
  clear: clearStorage,
};
