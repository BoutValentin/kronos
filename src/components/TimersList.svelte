<script>
  import { make_a_good_bip } from "../helpers/audio";

  import { printable_time } from "../helpers/time";

  import { timers } from "../stores/storage_store";

  export let set_interval;
  export let curr_time;
  export let timer_finish;

  const handle_click = (timer, event) => {
    const html = document.documentElement;
    html.classList.add("hide-overflow");
    if (set_interval) {
      window.clearInterval(set_interval);
      set_interval = null;
    }
    curr_time = timer.time;
    set_interval = window.setInterval(() => {
      const new_timer = curr_time - 1;
      if (new_timer <= 0) {
        timer_finish = true;
        make_a_good_bip();
      }
      curr_time = curr_time - 1;
    }, 1000);
  };

  const handle_remove_timer = (timer) => {
    timers.remove_from_store(timer);
  };
</script>

<div class="timers">
  {#each $timers as timer}
    <div class="one-timer">
      <p>Temps: {printable_time(timer.time)}</p>
      <div class="all-actions">
        <button on:click={(e) => handle_click(timer, e)}>Start</button>
        <div class="remove" on:click={() => handle_remove_timer(timer)}>
          <img src="/images/delete.svg" alt="remove" />
        </div>
      </div>
    </div>
  {/each}
  {#if !$timers || $timers.length <= 0}
    <p>You don't have any timers yet!</p>
  {/if}
</div>

<style>
     .timers {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 15px;
  }

  .one-timer {
    display: flex;
    align-items: center;
    background-color: black;
    padding: 15px 10px;
    color: white;
    max-width: 300px;
    width: 100%;
    justify-content: space-between;
    border-radius: 8px;
    margin: 15px auto;
  }

  .one-timer > p {
    font-size: 1.2em;
  }

  .one-timer .all-actions {
    display: flex;
  }

  .one-timer button {
    height: 55px;
    min-width: 80px;
    margin: auto 5px;
    font-weight: 700;
    font-size: 1.2em;
    border-radius: 35px;
    background-color: white;
    color: black;
    transition: transform 0.3s ease;
  }

  .one-timer button:active,
  .one-timer .remove:active,
  .remove-reset > p:active {
    transform: scale(0.9);
  }

  .one-timer .remove {
    height: 30px;
    width: 30px;
    background-color: white;
    border-radius: 50%;
    padding: 10px;
    margin: auto 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .one-timer .remove img {
    height: 90%;
  }

</style>