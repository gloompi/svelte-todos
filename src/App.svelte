<script>
  import { Router, Route } from 'svelte-routing';
  import 'normalize.css';

  import Users from './pages/Users.svelte';
  import Todos from './pages/Todos.svelte';
</script>

<Router>
  <Route path='/' component={Users} />
  <Route path="todos/:id" let:params>
    <Todos id="{params.id}" />
  </Route>
</Router>
