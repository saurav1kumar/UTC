document.addEventListener('DOMContentLoaded', () => {
    const timezones = [
        { name: 'UTC', offset: 0 },
        { name: 'IST', offset: 5.5 },
        { name: 'EST', offset: -5 },
        { name: 'PST', offset: -8 },
    ];

    const timeRange = document.getElementById('timeRange');
    const dateInput = document.getElementById('dateInput');
    const addTimezoneBtn = document.getElementById('addTimezoneBtn');
    const reverseOrderBtn = document.getElementById('reverseOrderBtn');
    const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
    const timezoneList = document.getElementById('timezoneList');

    function renderTimezones() {
        timezoneList.innerHTML = '';
        const selectedTime = parseInt(timeRange.value);
        const selectedDate = new Date(dateInput.value);
        const utcTime = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime));

        timezones.forEach((timezone, index) => {
            const localTime = new Date(utcTime);
            localTime.setHours(utcTime.getHours() + timezone.offset);

            const listItem = document.createElement('li');
            listItem.textContent = `${timezone.name}: ${localTime.toLocaleString()}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                timezones.splice(index, 1);
                renderTimezones();
            });

            listItem.appendChild(removeButton);
            timezoneList.appendChild(listItem);
        });
    }

    function addTimezone() {
        const name = prompt('Enter timezone name:');
        const offset = parseFloat(prompt('Enter timezone offset from UTC:'));

        if (name && !isNaN(offset)) {
            timezones.push({ name, offset });
            renderTimezones();
        } else {
            alert('Invalid input.');
        }
    }

    function reverseOrder() {
        timezones.reverse();
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    timeRange.addEventListener('input', renderTimezones);
    dateInput.addEventListener('input', renderTimezones);
    addTimezoneBtn.addEventListener('click', addTimezone);
    reverseOrderBtn.addEventListener('click', reverseOrder);
    toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

    renderTimezones();
});
