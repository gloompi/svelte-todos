<script>
  import { onMount, onDestroy } from 'svelte';
  import { Link } from 'svelte-routing';
  
  import usersStore from '../stores/users';
  import Loader from '../components/Loader.svelte';
  import Header from '../components/Header.svelte';
  import Pagination from '../components/Pagination.svelte';

  const {
    users,
    usersLength,
    currentPage,
    loading,
    error,
  } = usersStore;

  onMount(() => usersStore.fetchUsers($currentPage));
</script>

<div>
  <Header title="Users" />
  <main class="main">
    {#if $loading}
      <Loader />
    {:else if $error}
      <span style="color: red; font-size: 25px">{$error}</span>
    {:else}
      <ul class="user__list">
        {#each Array.from($users) as [id, user] (id)}
          <li class="user__item">
            <p>
              Name: 
              <Link to={`/todos/${user.id}`}>
                {user.name}
              </Link>
            </p>
            <p>Email: <a href="mailto:{user.email}" target="_blank">{user.email}</a></p>
            <p>Phone: <a href="tel:{user.phone}" target="_blank">{user.phone}</a></p>
          </li>
        {/each}
      </ul>
      <Pagination
        page={$currentPage}
        total={$usersLength}
        handlePageChange={usersStore.fetchUsers}
      />
    {/if}
  </main>
</div>

<style>
  .main {
    padding: 25px calc((100vw - 1170px) / 2);
  }

  .user__list {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .user__item {
    width: 32%;
    margin-right: 1.5%;
    margin-bottom: 25px;
    border: 1px solid cadetblue;
    padding: 15px;
    box-sizing: border-box;
  }

  .user__item:nth-child(3n + 3) {
    margin-right: 0;
  }
</style>