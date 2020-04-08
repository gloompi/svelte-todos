import { writable } from 'svelte/store';
import axios from 'axios';
import User from '../models/User';

const createUsersStore = () => {
  const users = writable(new Map([]));
  const currentPage = writable(1);
  const usersLength = writable(0);
  const loading = writable(false);
  const error = writable(null);

  const fetchUsers = async (page = 1, limit = 5) => {
    loading.set(true);

    try {
      const { data, headers } = await axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
      currentPage.set(page);
      usersLength.set(headers['x-total-count']);
      users.set(new Map(data.map(user => [user.id, new User(user)])));
      error.set(null);
    } catch(err) {
      error.set(err.message);
    } finally {
      loading.set(false);
    }
  };

  const fetchTodos = async (id = 1) => {
    loading.set(true);

    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
      users.update(users => {
        const currentUser = users.get(parseInt(id, 10));
        currentUser.todos = data;
        users.set(id, currentUser);

        return users;
      });
      error.set(null);
    } catch(err) {
      error.set(err.message);
    } finally {
      loading.set(false);
    }
  };

  return {
    users,
    error,
    loading,
    currentPage,
    usersLength,
    fetchUsers,
    fetchTodos,
    clear: () => users.set([]),
  }
};

export default createUsersStore();
