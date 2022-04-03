const btnDaily = document.querySelector('.sec-dashboard .profile .daily');
const btnWeekly = document.querySelector('.sec-dashboard .profile .weekly');
const btnMonthly = document.querySelector('.sec-dashboard .profile .monthly');
let activeStatu = btnDaily;

btnDaily.addEventListener('click', () => {
    updateDashboard('daily');
    activeStatu.classList.remove('active');
    btnDaily.classList.add('active');
    activeStatu = btnDaily;
});

btnWeekly.addEventListener('click', () => {
    updateDashboard('weekly');
    activeStatu.classList.remove('active');
    btnWeekly.classList.add('active');
    activeStatu = btnWeekly;
});

btnMonthly.addEventListener('click', () => {
    updateDashboard('monthly');
    activeStatu.classList.remove('active');
    btnMonthly.classList.add('active');
    activeStatu = btnMonthly;
});

async function fetchStatus() {
    let response = await fetch('data.json');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return await response.json();
    }
}

function updateDashboard(statusType) {
    fetchStatus()
        .then(data => {

            for (const statusObj of data) {
                switch (statusObj['title']) {
                    case 'Work':
                        updateStatus(statusObj, statusType, '.work');
                        break;
                    case 'Play':
                        updateStatus(statusObj, statusType, '.play');
                        break;
                    case 'Study':
                        updateStatus(statusObj, statusType, '.study');
                        break;
                    case 'Exercise':
                        updateStatus(statusObj, statusType, '.exercise');
                        break;
                    case 'Social':
                        updateStatus(statusObj, statusType, '.social');
                        break;
                    case 'Self Care':
                        updateStatus(statusObj, statusType, '.self-care');
                        break;
                }
            }
        })
        .catch(e => alert(e));
}

function updateStatus(statusObj, statusType, status) {
    let currentStatus = document.querySelector(`.sec-dashboard ${status} .status span`);
    currentStatus.textContent = `${statusObj.timeframes[statusType].current}hrs`;

    let previouStatus = document.querySelector(`.sec-dashboard ${status} .prev-status span`);
    previouStatus.textContent = `${getPreviousLabel(statusType)} - ${statusObj.timeframes[statusType].previous}hrs`;
}

function getPreviousLabel(statusType) {
    switch (statusType) {
        case 'daily':
            return 'Last Day';
        case 'weekly':
            return 'Last Week';
        case 'monthly':
            return 'Last Month';
    }
}

updateDashboard('daily');