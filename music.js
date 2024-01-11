const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeControl = document.getElementById('volumeControl');
const progressControl = document.getElementById('progressControl');
const audioPlayer = document.getElementById('audioPlayer');
const songTitleElement = document.getElementById('songTitle');
const artistNameElement = document.getElementById('artistName');

// Sample playlist data (replace with your own)
const playlist = [
    { title: 'Your Name', artist: 'Makoto Shinkai', file: 'https://pagallworld.co.in/wp-content/uploads/2023/12/Your-Name-Sparkle.mp3' },
    { title: 'Your Name', artist: 'Makoto Shinkai', file: 'https://docs.google.com/uc?authuser=0&id=1uscaYizclnIRkpqn_xF1nmq7JP5m1udO&export=download' },
    // Add more songs as needed
];

let currentTrackIndex = 0;

loadTrack(currentTrackIndex);

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.file;
    songTitleElement.textContent = track.title;
    artistNameElement.textContent = track.artist;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);
volumeControl.addEventListener('input', adjustVolume);
progressControl.addEventListener('input', adjustProgress);

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playBtn.textContent = 'Play';
    }
}

function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (!audioPlayer.paused) audioPlayer.play();
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (!audioPlayer.paused) audioPlayer.play();
}

function adjustVolume() {
    audioPlayer.volume = volumeControl.value / 100;
}

function adjustProgress() {
    const progress = (progressControl.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
}

audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressControl.value = progress;
}

audioPlayer.addEventListener('ended', playNext);
