document.getElementById('loan-form').addEventListener('submit',
    function(e) {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('results').style.display = 'none';

        setTimeout(calculateResults, 1500);

        e.preventDefault()
    }
);

// Calculate Results

function calculateResults() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    document.getElementById('loading').style.display = 'none';
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
    } else {
        showErr('Please Check Your Numbers');
        //console.log('in');
    }

}


// Show Error

function showErr(err) {
    // Get the UI elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Create the err div
    const errDiv = document.createElement('div');
    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(err));

    // Inseret the err div before the heading on the card
    card.insertBefore(errDiv, heading);

    // Clear the error after 3 seconds
    setTimeout(clearErr, 3000);
}


function clearErr() {
    document.querySelector('.alert-danger').remove();
}