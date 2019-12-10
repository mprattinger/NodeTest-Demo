export class BaseModel {
  toJSON() {
    const originalClass = this || {};
    const keys = Object.getOwnPropertyNames(
      Object.getPrototypeOf(originalClass)
    );
    return keys.reduce((classAsObj, key) => {
      classAsObj[key] = originalClass[key];
      return classAsObj;
    }, {});
  }
}
