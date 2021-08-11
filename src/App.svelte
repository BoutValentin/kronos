<script>
  import { timers } from "./stores/storage_store";
  import { minutes_to_seconds, printable_time } from "./helpers/time";
  const MIN_MINUTES_SECONDES = 0;
  const MAX_MINUTES_SECONDES = 59;

  const time_input = {
    second: 0,
    minute: 0,
  };

  let set_interval = null;

  let curr_time = null;

  let timer_finish = false;
  const handle_submit = (e) => {
    e.preventDefault();
    timers.add_to_store({
      id: `timer_${Date.now()}`,
      time: minutes_to_seconds(time_input.minute) + time_input.second,
    });
  };

  const good_audio = new Audio('/sound/good.wav');

  const handle_click = (timer, event) => {

	const html = document.documentElement;
	html.classList.add('hide-overflow');
	if (set_interval) {
		window.clearInterval(set_interval);
		set_interval = null;
	}
    console.log("CLICK CLICK BITE", timer);
	curr_time = timer.time;
	set_interval = window.setInterval(() => {
		const new_timer = curr_time - 1;
		if (new_timer <= 0){
			timer_finish = true;
			make_a_good_bip();
		} 
		curr_time = curr_time - 1

	}, 1000);
  };

  const handle_hard_reset = () => {
    timers.hard_reset();
  };

  const handle_init_reset = () => {
    timers.init_reset();
  };

  const handle_remove_timer = (timer) => {
	  timers.remove_from_store(timer);
  }

  const handle_reset_interval = () => {
	  
	  window.clearInterval(set_interval);
	  curr_time = null;
	  set_interval = null;
	  timer_finish = false;
	  const html = document.documentElement;
	html.classList.remove('hide-overflow');
  }

  const make_a_good_bip = () => {
	good_audio.play();
  }
  
</script>

<header>
	<img src="/images/kronos.svg" alt="kronos logo" />
	<h2>Kronos</h2>
</header>

<main>
	<div class="timers">
		{#each $timers as timer}
		<div class="one-timer">
			<p>Temps: {printable_time(timer.time)}</p>
			<div class="all-actions">
				<button on:click={(e) => handle_click(timer, e)}
					>Start</button
				  >
				  <div class="remove" on:click={()=> handle_remove_timer(timer)}>
					  <img src="/images/delete.svg" alt="remove" />
				  </div>
			</div>
			
		</div>
	  {/each}
	  {#if !$timers || $timers.length <= 0}
		  <p>You don't have any timers yet!</p>
	  {/if}
	</div>
 

  <div class="remove-reset">
	<p on:click={handle_hard_reset} class="remove-reset-b">Remove all the value</p>
	<p on:click={handle_init_reset} class="remove-reset-b">Reset to initial value</p>
  </div>
 

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

  <div class="add-timer">
	<h4>Add a Timer</h4>

	<form on:submit={handle_submit}>
	  <div class="form-row">
		  <label for="minutes">Minutes:</label>
		  <input
			name="minutes"
			id="minutes"
			type="number"
			bind:value={time_input.minute}
			min={MIN_MINUTES_SECONDES}
			max={MAX_MINUTES_SECONDES}
		  />
	  </div>
	  
	  <div class="form-row">
		  <label for="secondes">Secondes:</label>
		  <input
			name="secondes"
			id="secondes"
			type="number"
			bind:value={time_input.second}
			min={MIN_MINUTES_SECONDES}
			max={MAX_MINUTES_SECONDES}
		  />
	  </div>
	  
	  <div class="form-row submit">
		  <input type="submit" value="Add This timer" />
	  </div>
	</form>
  </div>
  

  
</main>

{#if timer_finish}
<div class="modal">
	<p>TIMER OVER !!</p>
	<div class="ok-button"  on:click={handle_reset_interval}>
		<p>Reset the timer</p>
	</div>
</div>
{/if}

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5em;
		margin: 0;
		padding: 0;
		height: 80px;
	}

	header img {
		height: 45px;
		margin: auto 20px;
	}

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

	.one-timer button:active, .one-timer .remove:active, .remove-reset > p:active {
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

	.modal {
		position: absolute;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.9);
		color: white;
	}

	.modal > p {
		font-size: 3em;
		font-weight: 800;
		text-align: center;
	}

	.ok-button, .cancel {
		background-color: white;
		color: black;
		padding: 5px 20px;
		border-radius: 15px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.ok-button:active, .cancel:active {
		transform: scale(0.9);
	}

	.ok-button p, .cancel:active {
		font-size: 1.7em;
		font-weight: 600;
		user-select: none;
	}

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

	.add-timer {
		margin-top: 45px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	form {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: center;
	}

	.form-row {
		margin: 0 15px;
		display: flex;
		flex-direction: column;
	}

	.form-row label {
		margin-bottom: 5px;
		font-size: 0.9em;
	}

	.form-row.submit input {
		background: black;
		color: white;
		border: none;
		border-radius: 15px;
		padding: 5px 20px;
		font-size: 1em;
		cursor: pointer;
		font-weight: 600;	
		margin-top: 15px;
	}

</style>
