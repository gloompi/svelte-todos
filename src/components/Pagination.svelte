<script>
  export let limit = 5;
  export let total = 0;
  export let page = 1;
  export let handlePageChange;

  $: pages = Math.ceil(total / limit);
  $: prevActive = page > 1 ? 'active' : '';
  $: nextActive = page < pages ? 'active' : '';

  const handleFirstClick = () => {
    if (prevActive) {
      handlePageChange(1);
    }
  };

  const handlePrevClick = () => {
    if (prevActive) {
      handlePageChange(page - 1);
    }
  };

  const handleNextClick = () => {
    if (nextActive) {
      handlePageChange(page + 1);
    }
  };

  const handleLastClick = () => {
    if (nextActive) {
      handlePageChange(pages);
    }
  };
</script>

<div class="pagination__wrapper">
  <ul class="pagination__list">
    <li class="pagination__item pagination__first">
      <button class="pagination__btn {prevActive}" on:click={handleFirstClick}>
        &lArr;
      </button>
    </li>
    <li class="pagination__item pagination__prev">
      <button class="pagination__btn {prevActive}" on:click={handlePrevClick}>
        &larr;
      </button>
    </li>
    <li class="pagination__item pagination__next">
      <button class="pagination__btn {nextActive}" on:click={handleNextClick}>
        &rarr;
      </button>
    </li>
    <li class="pagination__item pagination__last">
      <button class="pagination__btn {nextActive}" on:click={handleLastClick}>
        &rArr;
      </button>
    </li>
  </ul>
</div>

<style>
  .pagination__list {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
  }

  .pagination__item {
    margin-right: 25px;
  }

  .pagination__item:last-child {
    margin-right: 0;
  }

  .pagination__btn {
    font-size: 25px;
    color: #fff;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 15px 20px;
    cursor: not-allowed;
    transition: 0.3s;
  }

  .pagination__btn.active {
    color: #fff;
    border: 1px solid cadetblue;
    background-color: cadetblue;
    cursor: pointer;
  }

  .active:hover {
    background-color: antiquewhite;
    color: cadetblue;
  }
</style>