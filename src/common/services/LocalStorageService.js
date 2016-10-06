let sharedLocalStorage;

class BackupLocalStorage {
  setItem(key, item) {
    this[key] = item;
  }

  getItem(key) {
    return this[key];
  }

  removeItem(key) {
    if ({}.hasOwnProperty.call(this, key)) {
      delete this[key];
    }
  }
}

export default class LocalStorageService {
  constructor(prefix) {
    this.prefix = prefix ? `${prefix}_` : '';
    try {
      window.localStorage[this.getKey('_storage_available_')] = true;
      this.localStorage = window.localStorage;
    } catch (e) {
      this.localStorage = new BackupLocalStorage();
    }
  }

  getKey(name) {
    return this.prefix + name;
  }

  setItem(key, item) {
    return this.localStorage.setItem(key, item);
  }

  getItem(key) {
    return this.localStorage.getItem(key);
  }

  removeItem(key) {
    return this.localStorage.removeItem(key);
  }

  static shared() {
    if (!sharedLocalStorage) {
      sharedLocalStorage = new LocalStorageService();
    }
    return sharedLocalStorage;
  }
}
