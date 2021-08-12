
let audio = new Map();

const DEFAULT_AUDIO_SRC = "/sound/good.mp3";

const GOOD_BIP_SRC = "/sound/good.mp3";

const create_audio = (src = DEFAULT_AUDIO_SRC) => {
    audio.set(src, new Audio(src));
}

export const get_one_audio = (src = DEFAULT_AUDIO_SRC) => {
    if (!audio.get(src)) create_audio(src);
    return audio.get(src);
}

export const make_a_good_bip = () => {
    if (!audio.get(GOOD_BIP_SRC)) create_audio(GOOD_BIP_SRC);
    audio.get(GOOD_BIP_SRC).play();
};
