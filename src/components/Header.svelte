<script>
  import { Link } from 'svelte-routing';

  let pathname = location.pathname;

  $: isHome = pathname === '/';

  export let title;
</script>

<header class="header">
  {#if !isHome}
    <Link to="/">&larr;</Link>
  {/if}
  <span>{title}</span>
</header>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 15px calc((100vw - 1170px) / 2);
    background-color: cadetblue;
  }

  .header > span {
    margin-left: 10px;
  }
</style>