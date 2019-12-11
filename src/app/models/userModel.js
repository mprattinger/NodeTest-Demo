import { UserRoles } from "./userRoles";

export class UserModel {
  constructor() {
    this.userName = "";
    this.role = UserRoles.GUEST;
  }
}
