import { v4 as uuidv4 } from "uuid";

export function generateId(): string {
  return uuidv4();
}

export function applyMixins(targetClass: any, baseClasses: any[]) {
  baseClasses.forEach((baseClass) => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
      targetClass.prototype[name] = baseClass.prototype[name];
    });
  });
}
