document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".mood");
    const body = document.body;
    const darkModeToggle = document.getElementById("toggle-dark-mode");
    const dateInput = document.getElementById("mood-date");
    const calendarGrid = document.getElementById("calendar-grid");
    const monthDisplay = document.getElementById("current-month");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    let moodData = JSON.parse(localStorage.getItem("moodData")) || {};

    let currentDate = new Date();
    
    function generateCalendar() {
        calendarGrid.innerHTML = "";
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        monthDisplay.textContent = firstDay.toLocaleString("default", { month: "long", year: "numeric" });

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            
            const dayBox = document.createElement("div");
            dayBox.classList.add("calendar-day");
            dayBox.textContent = i;

            if (moodData[dateStr]) {
                const moodEmoji = document.createElement("span");
                moodEmoji.classList.add("mood-icon");
                moodEmoji.textContent = moodData[dateStr];
                dayBox.appendChild(moodEmoji);
            }

            calendarGrid.appendChild(dayBox);
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const mood = button.getAttribute("data-mood");
            const selectedDate = dateInput.value;
            
            if (!selectedDate) {
                alert("Please select a date before choosing a mood!");
                return;
            }

            changeBackground(mood);
            saveMood(selectedDate, mood);
            generateCalendar();
        });
    });

    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });

    function changeBackground(mood) {
        const moodColors = {
            happy: "#ffcc00",
            sad: "#3a86ff",
            excited: "#ff6f61",
            calm: "#57cc99"
        };
        body.style.background = moodColors[mood] || "white";
    }

    function saveMood(date, mood) {
        const moodEmojis = {
            happy: "😊",
            sad: "😢",
            excited: "🤩",
            calm: "😌"
        };

        moodData[date] = moodEmojis[mood];
        localStorage.setItem("moodData", JSON.stringify(moodData));
    }

    generateCalendar();
});
