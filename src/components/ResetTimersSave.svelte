<script>
  import { timers } from "../stores/storage_store";

  const handle_hard_reset = () => {
    timers.hard_reset();
  };

  const handle_init_reset = () => {
    timers.init_reset();
  };
</script>

<div class="remove-reset">
  <p on:click={handle_hard_reset} class="remove-reset-b">
    Remove all the value
  </p>
  <p on:click={handle_init_reset} class="remove-reset-b">
    Reset to initial value
  </p>
</div>

<style>
  .remove-reset {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: #cc2936;
    text-decoration: underline;
    cursor: pointer;
  }

  .remove-reset > p {
    transition: transform 0.3s ease;
  }
</style>
