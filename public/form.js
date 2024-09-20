window.onload = function() {
    document.getElementById('registrationForm').reset();
};

function calculateAge() {
    const dob = document.getElementById('dob').value;
    if (dob) {
        const dobDate = new Date(dob);
        const diff = Date.now() - dobDate.getTime();
        const ageDate = new Date(diff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        document.getElementById('age').value = age;
    }
}

function fetchDetails() {
    const pin = document.getElementById('pin').value;
    if (pin) {
        fetch(`https://api.postalpincode.in/pincode/${pin}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Debugging line
                if (data[0].Status === "Success") {
                    const details = data[0].PostOffice[0];
                    document.getElementById('city').value = details.District;
                    document.getElementById('district').value = details.District;
                    document.getElementById('state').value = details.State;
                    document.getElementById('country').value = details.Country;
                } else {
                    alert('Invalid PIN code');
                }
            })
            .catch(error => console.error('Error fetching details:', error));
    }
}

// Add event listener to PIN input field
document.getElementById('pin').addEventListener('change', fetchDetails);

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message || '!Form submitted successfully!';
        this.reset(); // Reset form after submission
    } catch (error) {
        document.getElementById('responseMessage').innerText = 'Error submitting form.';
    }
});

// modal


