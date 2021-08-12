export const SECONDES_IN_ONE_MINUTES = 60;
export const MIN_MINUTES_SECONDES = 0;
export const MAX_MINUTES_SECONDES = 59;

export const DEFAULT_TIME = {
  second: 0,
  minute: 0,
};

export const minutes_to_seconds = (minutes) => {
    if (!minutes || minutes < 0) return 0;
    return minutes * SECONDES_IN_ONE_MINUTES;
}

export const minutes_from_seconds = (seconds) => {
    if (!seconds || seconds < SECONDES_IN_ONE_MINUTES) return 0;
    return Math.trunc(seconds / SECONDES_IN_ONE_MINUTES);
}

export const take_remains_seconds_when_full_minutes_remove = (seconds) => {
    if (!seconds || seconds < 0) return 0;
    if (!seconds || seconds < SECONDES_IN_ONE_MINUTES) return seconds;
    const minutes = minutes_from_seconds(seconds);
    const remain_second = seconds - minutes_to_seconds(minutes);
    return remain_second;
}

export const printable_time = (seconds) => {
    const minutes = minutes_from_seconds(seconds);
    const remain_second = take_remains_seconds_when_full_minutes_remove(seconds);
    return `${ minutes > 0 ? `${minutes}'` :''} ${remain_second}''`
}