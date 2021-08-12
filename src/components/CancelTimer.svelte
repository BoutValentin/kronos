<script>
  export let timer_finish;
  export let handle_reset_interval;
</script>

{#if timer_finish}
  <div class="modal">
    <p>TIMER OVER !!</p>
    <div class="ok-button" on:click={handle_reset_interval}>
      <p>Reset the timer</p>
    </div>
  </div>
{/if}

<style>
  .ok-button {
    background-color: white;
    color: black;
    padding: 5px 20px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .ok-button:active {
    transform: scale(0.9);
  }

  .ok-button p {
    font-size: 1.7em;
    font-weight: 600;
    user-select: none;
  }
</style>
