import { writable } from 'svelte/store';

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this._todos = writable([]);
  }

  get todos() {
    return this._todos || [];
  }

  set todos(todos) {
    if (!Array.isArray(todos)) return null;

    this._todos.set(todos);
  }
}

export default User;
