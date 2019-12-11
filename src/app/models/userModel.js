export class UserRoles {
  static get ADMIN() {
    return "admin";
  }

  static get USER() {
    return "user";
  }

  static get GUEST() {
    return "guest";
  }
}

export class UserModel {
  constructor() {
    this.userName = "";
    //this.password = "";
    this.role = UserRoles.GUEST;
  }
}
