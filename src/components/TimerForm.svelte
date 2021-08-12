<script>
import { DEFAULT_TIME, MAX_MINUTES_SECONDES, minutes_to_seconds, MIN_MINUTES_SECONDES } from "../helpers/time";
import { timers } from "../stores/storage_store";


  let time_input = { ...DEFAULT_TIME };

  const handle_submit = (e) => {
    e.preventDefault();
    if (!time_input.second && !time_input.minute) {
      window.alert("You cannot add an empty timer");
      return;
    }
    timers.add_to_store({
      id: `timer_${Date.now()}`,
      time: minutes_to_seconds(time_input.minute) + time_input.second,
    });
    time_input = { ...DEFAULT_TIME };
  };
</script>

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

<style>
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
