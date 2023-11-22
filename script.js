const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const dayOutput = document.getElementById("age-DD");
const monthOutput = document.getElementById("age-MM");
const yearOutput = document.getElementById("age-YYYY");

const dayLabel = document.getElementById("day-label")
const monthLabel = document.getElementById("month-label")
const yearLabel = document.getElementById("year-label")

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", handleSubmit);

const lightRed = '#FF5757';

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let valid = true;

function Validate() {
    let valid = true;
    for (const input of inputs) {
      const parent = input.parentElement;
      const label = parent.querySelector('label');
  
      if (!input.value) {
        input.style.borderColor = 'red';
        label.style.color = lightRed;
        parent.querySelector('small').innerHTML = 'this field is required';
        valid = false;
      } else {
        input.style.borderColor = 'rgba(0, 0, 0, 0.116)';
        label.style.color = 'rgb(136, 136, 136)';
        parent.querySelector('small').innerHTML = '';
      }
  
      if (input === monthInput) {
        if (parseInt(monthInput.value) >= 13 || parseInt(monthInput.value) <= 0) {
          monthInput.style.borderColor = lightRed;
          label.style.color = lightRed;
          monthInput.parentElement.querySelector('small').innerHTML = 'Must be a valid month';
          valid = false;
        }
      } else if (input === dayInput) {
        if (parseInt(dayInput.value) > months[parseInt(monthInput.value) - 1]) {
          dayInput.style.borderColor = lightRed;
          label.style.color = lightRed;
          dayInput.parentElement.querySelector('small').innerHTML = 'Must be a valid day';
          valid = false;
        }
      } else if (input === yearInput){
		if (parseInt(yearInput.value) < year) {
			valid = true; // Date is in the past, so it's considered valid
		} else if (parseInt(yearInput.value) === year) {
			if (parseInt(monthInput.value) >= month && parseInt(dayInput.value) > day) {
				yearInput.style.borderColor = lightRed;
				label.style.color = lightRed;
				yearInput.parentElement.querySelector('small').innerHTML = 'You have not been born yet';
				
				monthInput.style.borderColor = lightRed;
				label.style.color = lightRed;
				monthInput.parentElement.querySelector('small').innerHTML = 'You have not been born yet';
				valid = false; // Month is in the future of the current year

				dayInput.style.borderColor = lightRed;
				label.style.color = lightRed;
				dayInput.parentElement.querySelector('small').innerHTML = 'You have not been born yet';
				valid = false; // Month is in the future of the current year
			} else if (parseInt(monthInput.value) < month && parseInt(dayInput.value) < day) {
				valid = true
			}
		} else if (parseInt(yearInput.value) > year) {
			yearInput.style.borderColor = lightRed;
			label.style.color = lightRed;
			yearInput.parentElement.querySelector('small').innerHTML = 'you have not been born yet';
			valid = false; // Year is in the future
		}
	  }


    }
  
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Validate()) {
        const currentYear = new Date().getFullYear();
        let currentMonth = new Date().getMonth() + 1;
        let currentDay = new Date().getDate();

		function monthsDays(month, year) {
			const months = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			return months[month - 1];
		}
	
		function isLeapYear(year) {
			return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		}
        
        // Calculate age
        let years = currentYear - parseInt(yearInput.value);
        let months = currentMonth - parseInt(monthInput.value);
        let days = currentDay - parseInt(dayInput.value);

        // Adjust for negative days or months
        if (days < 0) {
            months--; // Subtract one month
            days += monthsDays(currentMonth - 1, currentYear); // Add days of the previous month
        }

        if (months < 0) {
            years--; // Subtract one year
            months += 12; // Add 12 months to adjust
        }

        dayOutput.innerHTML = days;
        monthOutput.innerHTML = months;
        yearOutput.innerHTML = years;
    }
}