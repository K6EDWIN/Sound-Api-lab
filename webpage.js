const audio = document.getElementById('myAudio');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const volumeSlider = document.getElementById('volumeSlider');
const speedSlider = document.getElementById('speedSlider');
const speedValText = document.getElementById('speedVal');
const statusText = document.getElementById('status');

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
    }
});

// playback
play.addEventListener('click', () => {
    audio.play();
    statusText.innerText = "Status: Playing";
});

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