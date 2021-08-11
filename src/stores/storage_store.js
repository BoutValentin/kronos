import { writable } from "svelte/store";

const LOCAL_STORAGE_KEY = 'timer';

const DEFAULT_ELEMENT = [
    {
        id: `timer_${Date.now()}`,
        time: 30,
    },
    {
        id: `timer_${Date.now() + 100}`,
        time: 45,
    }
]

function get_initial_value(default_value = DEFAULT_ELEMENT) {
    let ls_timer = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const obj_timer = ls_timer ? JSON.parse(ls_timer) : default_value;
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj_timer));
    return obj_timer;
}

function create_storage_store() {
    const {subscribe, set, update } = writable(get_initial_value());

    return {
        subscribe, 
        add_to_store: (to_add) => update(curr => {
            const new_arra = [...curr, to_add];
            window.localStorage.setItem('timer', JSON.stringify(new_arra));
            return [...curr, to_add];
        }),
        remove_from_store: (to_remove) => update(curr => {
            const pos = curr.findIndex(el => el.id === to_remove.id);
            if (pos >= 0) curr.splice(pos, 1);
            window.localStorage.setItem('timer', JSON.stringify(curr));
            return [...curr];
        }),
        hard_reset: ()=> {
            const arr = []
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
           return set(arr)
        },
        init_reset: ()=> {
            const def = DEFAULT_ELEMENT;
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(def));
            return set(def)
        }
    }
}

export const timers = create_storage_store();