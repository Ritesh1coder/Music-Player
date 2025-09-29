const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 2;
let isSeeking = false;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar as song plays
function updateProgress(e) {
  if (!isSeeking) {
    const { duration, currentTime } = e.srcElement;
    progressBar.max = duration;
    progressBar.value = currentTime;
    const percent = (currentTime / duration) * 100;
    progressBar.style.setProperty('--progress', `${percent}%`);
  }
}

// Display time nicely
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  function formatTime(time) {
    const mins = Math.floor(time / 60) || 0;
    const secs = Math.floor(time % 60) || 0;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  currTime.innerHTML = formatTime(currentTime);
  durTime.innerHTML = formatTime(duration);
}

// Drag progress bar
progressBar.addEventListener('input', (e) => {
  isSeeking = true;
  const value = e.target.value;
  const percent = (value / audio.duration) * 100;
  progressBar.style.setProperty('--progress', `${percent}%`);
});

progressBar.addEventListener('change', (e) => {
  audio.currentTime = e.target.value;
  isSeeking = false;
});

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('timeupdate', DurTime);
audio.addEventListener('ended', nextSong);
