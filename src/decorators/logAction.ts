import { Board } from "../board";
import { Log } from "../log";
import { User } from "../user";

export function LogAction(actionMessage: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!(this instanceof Board)) {
        throw new Error(`@LogAction can only be used in Board methods.`);
      }

      // Ensure the logging user is always the LAST User argument
      const adminUser = args.find((arg) => arg instanceof User) as User;

      if (!adminUser) {
        throw new Error(
          `User argument required for action: "${actionMessage}"`
        );
      }

      const result = originalMethod.apply(this, args);

      this.activityLog.push(new Log(actionMessage, adminUser));

      return result;
    };

    return descriptor;
  };
}
