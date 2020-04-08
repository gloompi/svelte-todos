<script>
  import { onMount, onDestroy } from 'svelte';
  import get from 'lodash/get';

  import usersStore from '../stores/users';
  import Loader from '../components/Loader.svelte';
  import Header from '../components/Header.svelte';

  const { users, loading, error } = usersStore;

  export let id;

  let currentUser;
  let todos = [];

  const unsubscribe = users.subscribe(users => {
    currentUser = users.get(id);

    const todosHandler = get(
      currentUser,
      'todos.subscribe',
      () => {}
    );

    // trying to get todos from current user
    todosHandler(todosList => todos = todosList);
  });

  onMount(() => {
    usersStore.fetchTodos(id);
  });

  onDestroy(unsubscribe);
</script>

<div>
  <Header title="{get(currentUser, 'name', 'Loading')}"/>
  <main class="main">
    {#if $loading}
      <Loader />
    {:else if $error}
      <span style="color: red; font-size: 25px">{$error}</span>
    {:else}
      <ul class="todo__list">
        {#each todos as todo (todo.id)}
          <li class="todo__item">
            <p>{todo.title}</p>
            <p class="todo__status">
              <input type="checkbox" bind:checked={todo.completed} />
              {todo.completed ? 'Completed' : 'Not Completed'}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
  </main>
</div>

<style>
  .main {
    padding: 25px calc((100vw - 1170px) / 2);
  }

  .todo__list {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .todo__item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 32%;
    margin-right: 1.5%;
    margin-bottom: 25px;
    border: 1px solid cadetblue;
    padding: 15px;
    box-sizing: border-box;
  }

  .todo__item:nth-child(3n + 3) {
    margin-right: 0;
  }

  .todo__status {
    display: flex;
    align-items: center;
  }

  .todo__status > input {
    margin-right: 10px;
    cursor: pointer;
  }
</style>