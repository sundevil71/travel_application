// Function to move to the next stage
function nextStage(stage) {
    document.querySelectorAll('.form-stage').forEach(el => el.style.display = 'none');
    document.getElementById(`stage-${stage}`).style.display = 'block';
}

// Function to go back to the previous stage
function previousStage(stage) {
    document.querySelectorAll('.form-stage').forEach(el => el.style.display = 'none');
    document.getElementById(`stage-${stage}`).style.display = 'block';
}

// Function to review and submit the form
function reviewAndSubmit() {
    const reviewContainer = document.getElementById('review');
    const form = document.getElementById('marsForm');
    let reviewHTML = '';

    // Collect data from the form and build review section
    new FormData(form).forEach((value, key) => {
        reviewHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    });

    reviewContainer.innerHTML = reviewHTML;
    nextStage(4);
}

// Event listener for form submission
document.getElementById('marsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Application submitted successfully!');
    document.getElementById('marsForm').reset();
    nextStage(1);
});