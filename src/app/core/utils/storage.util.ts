export default class Storage {

  static saveSessionStorage(name: string, value: string) {
    sessionStorage.setItem(name, value);
  }

  static deleteSessionStorage(name: string) {
    sessionStorage.removeItem(name);
  }

  static getItem(key: string, local = false): string {
    if(!local) {
      return sessionStorage.getItem(key) as string;
    }
    return localStorage.getItem(key) as string;
  }

  static saveLocalStorage(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  static deleteLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

}
