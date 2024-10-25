document.addEventListener('DOMContentLoaded', function() {
    const currentDateElement = document.getElementById('currentDate');
    const today = new Date();
    currentDateElement.textContent = today.toLocaleDateString('ja-JP');

    const moodForm = document.getElementById('moodForm');
    const moodTableBody = document.querySelector('#moodTable tbody');

    // ローカルストレージから過去の気分データを読み込む
    let savedMoods = JSON.parse(localStorage.getItem('moods')) || [];

    // 過去の気分データをテーブルに表示
    savedMoods.forEach(function(moodEntry) {
        addMoodToTable(moodEntry.date, moodEntry.mood);
    });

    moodForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const mood = document.querySelector('input[name="mood"]:checked').value;
        const date = today.toLocaleDateString('ja-JP');

        // 新しい気分データを保存
        savedMoods.push({ date: date, mood: mood });
        localStorage.setItem('moods', JSON.stringify(savedMoods));

        // テーブルに表示
        addMoodToTable(date, mood);

        moodForm.reset();
    });

    // テーブルに気分を追加する関数
    function addMoodToTable(date, mood) {
        const newRow = document.createElement('tr');
        const dateCell = document.createElement('td');
        const moodCell = document.createElement('td');

        dateCell.textContent = date;
        moodCell.textContent = mood;

        newRow.appendChild(dateCell);
        newRow.appendChild(moodCell);

        moodTableBody.appendChild(newRow);
    }
});
