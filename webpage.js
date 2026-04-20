const audio = document.getElementById('myAudio');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const volumeSlider = document.getElementById('volumeSlider');
const speedSlider = document.getElementById('speedSlider');
const speedValText = document.getElementById('speedVal');
const statusText = document.getElementById('status');
const progressSlider = document.getElementById('progressSlider');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');

// time format into minutes
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// file upload
const audioUpload = document.getElementById('audioUpload');
const fileNameDisplay = document.getElementById('fileName');
audioUpload.addEventListener('change', (e) => {
    const file = e.target.files[0]; 
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL; 
        fileNameDisplay.innerText = file.name;
        statusText.innerText = "Status: Ready to play";
        play.disabled = false;
        pause.disabled = false;
        progressSlider.disabled = false; 
    }
});

// duration on play
audio.addEventListener('loadedmetadata', () => {
    progressSlider.max = audio.duration;
    durationDisplay.innerText = formatTime(audio.duration);
});

// time display
audio.addEventListener('timeupdate', () => {
    progressSlider.value = audio.currentTime;
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
});

// Seek audio when sliding the progress bar
progressSlider.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
});

// playback
play.addEventListener('click', () => {
    audio.play();
    statusText.innerText = "Status: Playing";
});
//pause
pause.addEventListener('click', () => {
    audio.pause();
    statusText.innerText = "Status: Paused";
});

// Volume Control 
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Playback Speed
speedSlider.addEventListener('input', (e) => {
    const speed = e.target.value;
    audio.playbackRate = speed;
    speedValText.innerText = speed;
});

// space shortcut to play and pause
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !play.disabled) {
        e.preventDefault(); 
        if (audio.paused) {
            audio.play();
            statusText.innerText = "Status: Playing";
        } else {
            audio.pause();
            statusText.innerText = "Status: Paused";
        }
    }
});