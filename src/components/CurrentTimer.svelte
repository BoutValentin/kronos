<script>
  import { printable_time } from "../helpers/time";
  export let curr_time;
  export let handle_reset_interval;
</script>

<div class="current-timer">
  {#if curr_time !== null && curr_time > 0}
    <div class="modal">
      <p>Timer:</p>
      <p>{printable_time(curr_time)}</p>
      <div class="cancel">
        <p on:click={handle_reset_interval}>Cancel this timer</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .cancel {
    background-color: white;
    color: black;
    padding: 5px 20px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cancel:active {
    transform: scale(0.9);
  }

  .cancel:active {
    font-size: 1.7em;
    font-weight: 600;
    user-select: none;
  }
</style>
