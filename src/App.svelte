<script>
  import { timers } from "./stores/storage_store";
  import { printable_time } from "./helpers/time";
  import { get_one_audio } from "./helpers/audio";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import TimersList from "./components/TimersList.svelte";
  import TimerForm from "./components/TimerForm.svelte";
  import ResetTimersSave from "./components/ResetTimersSave.svelte";
  import CurrentTimer from "./components/CurrentTimer.svelte";
  import CancelTimer from "./components/CancelTimer.svelte";

  let set_interval = null;

  let curr_time = null;

  let should_unlock_audio = true;

  let timer_finish = false;

  const good_audio = get_one_audio("/sound/good.mp3");

  const handle_reset_interval = () => {
    window.clearInterval(set_interval);
    curr_time = null;
    set_interval = null;
    timer_finish = false;
    const html = document.documentElement;
    html.classList.remove("hide-overflow");
  };

  const handle_click_unlock = () => {
    if (should_unlock_audio) {
      const old_src = good_audio.src;
      good_audio.src = "";
      good_audio.src = old_src;
      good_audio.currentTime = 0;
      should_unlock_audio = false;
    }
  };
</script>

<svelte:window on:click={handle_click_unlock} on:touchstart={handle_click_unlock} />

<Header />
<main>
  <TimersList bind:set_interval bind:curr_time bind:timer_finish />

  <ResetTimersSave />

  <CurrentTimer bind:curr_time {handle_reset_interval} />

  <TimerForm />
</main>

<Footer />

<CancelTimer {timer_finish} {handle_reset_interval} />

<style>
  main {
    padding-bottom: 50px;
  }
</style>
