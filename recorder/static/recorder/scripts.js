let mediaRecorder;
let recordedChunks = [];
const videoElement = document.getElementById('video');
const startButton = document.getElementById('start-recording');
const stopButton = document.getElementById('stop-recording');
const recordingsList = document.getElementById('recordings-list');

async function fetchRecordings() {
    try {
        const response = await fetch('/recordings/');
        const recordings = await response.json();
        renderRecordings(recordings);
    } catch (error) {
        console.error('Error fetching recordings:', error);
    }
}

function renderRecordings(recordings) {
    recordingsList.innerHTML = '';
    recordings.forEach(recording => {
        const videoItem = document.createElement('a');
        videoItem.href = `/playback/${recording.id}/`;
        videoItem.className = 'list-group-item list-group-item-action';
        videoItem.textContent = `Play Recording ${recording.id}`;
        recordingsList.appendChild(videoItem);
    });
}

startButton.onclick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoElement.srcObject = stream;

    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = async () => {
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', videoBlob, 'recording.webm');

        try {
            const response = await fetch('/upload/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Uploaded recording:', data);
            fetchRecordings();  // Refresh the list of recordings
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
};

stopButton.onclick = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        startButton.disabled = false;
        stopButton.disabled = true;
    }
};

// Fetch recordings on page load
fetchRecordings();
