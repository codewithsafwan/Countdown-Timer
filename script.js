let countdownInterval; // Variable to store the interval ID for the countdown
let endDate; // Variable to store the end time of the countdown

function startOrResumeCountdown() {
    const hours = parseInt(document.getElementById("hoursInput").value) || 0; // Get hours input value or default to 0
    const minutes = parseInt(document.getElementById("minutesInput").value) || 0; // Get minutes input value or default to 0
    const seconds = parseInt(document.getElementById("secondsInput").value) || 0; // Get seconds input value or default to 0

    endDate = new Date(); // Create a new Date object for the end time
    endDate.setHours(endDate.getHours() + hours); // Add hours to the end time
    endDate.setMinutes(endDate.getMinutes() + minutes); // Add minutes to the end time
    endDate.setSeconds(endDate.getSeconds() + seconds); // Add seconds to the end time

    const startOrResumeBtn = document.getElementById("startOrResumeBtn");

    if (!countdownInterval) { // If countdown is not running, start it
        countdownInterval = setInterval(updateCountdown, 1000);
        startOrResumeBtn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'; // Change button content to "Pause" icon
    } else { // If countdown is running, pause it
        clearInterval(countdownInterval);
        countdownInterval = null;
        startOrResumeBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'; // Change button content to "Play" icon
    }
}

function resetCountdown() {
    clearInterval(countdownInterval); // Clear the countdown interval
    countdownInterval = null;
    document.getElementById("hours").innerText = "00"; // Reset hours display
    document.getElementById("minutes").innerText = "00"; // Reset minutes display
    document.getElementById("seconds").innerText = "00"; // Reset seconds display
    document.getElementById("startOrResumeBtn").innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'; // Change button content to "Play" icon
}

function updateCountdown() {
    const now = new Date().getTime(); // Get the current time
    const timeLeft = endDate - now; // Calculate the time left until the end date

    if (timeLeft <= 0) { // If the time left is zero or negative, clear the interval and show an alert
        clearInterval(countdownInterval);
        countdownInterval = null;
        alert("Countdown finished!");
        return;
    }

    // Calculate the hours, minutes, and seconds remaining
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update the HTML elements with the remaining time
    document.getElementById("hours").innerText = formatTime(hours);
    document.getElementById("minutes").innerText = formatTime(minutes);
    document.getElementById("seconds").innerText = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time; // Add leading zero if time is less than 10
}
