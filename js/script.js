// экраны
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');

// кнопки
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const againBtn = document.getElementById('again-btn');
const answerBtn = document.querySelectorAll('.answers-container');
const shareBtn = document.getElementById('share-btn');

// маркеры
const dots = document.querySelectorAll('.dot');

let currentQuestion = document.getElementById('current-question');
let currentIndex = 1;
let selectedAnswer = null;

// содержание квиза
let question = document.getElementById('question');
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');


const questions = [
    {
        q: "Какой ваш любимый цвет?",
        a: ['Розовый', 'Голубой', 'Зеленый', 'Фиолетовый'],
        pony: ['fluttershy', 'rainbow', 'applejack', 'twilight']
    },
    {
        q: "Какой ваш любимый мультик?",
        a: ['Смешарики', 'Винкс', 'Груз 200', 'Май литл пони!'],
        pony: ['pinkie', 'rarity', 'rainbow', 'fluttershy']
    },
    {
        q: "За кого вы голосовали?",
        a: ['Единая Россия', 'КПРФ', 'Новые люди', 'Другое'],
        pony: ['pinkie', 'rainbow', 'fluttershy', 'twilight']
    },
    {
        q: "Чем вы увлекаетесь?",
        a: ['Сфера рукоделия', 'Видеоигры', 'Спорт', 'Ничем'],
        pony: ['rarity', 'pinkie', 'rainbow', 'applejack']
    },
    {
        q: "Вы движим властью или деньгами?",
        a: ['Властью', 'Деньгами', 'Всем', 'Ничем'],
        pony: ['rainbow', 'rarity', 'applejack', 'twilight']
    },
    {
        q: "Сколько можно получить кумыса из Селестии? (Вопрос на проверку логики)",
        a: ['422 литра', '83 литра', 'Нисколько', 'Бесконечное количество'],
        pony: ['twilight', 'rarity', 'fluttershy', 'twilight']
    },
    {
        q: "Ваш девиз по жизни",
        a: ['Дружба - это чудо!', 'Верь в себя, двигайся вперед', 'Сила - в преодолении трудностей', 'Жажда знаний ведет к успеху'],
        pony: ['pinkie', 'rainbow', 'applejack', 'twilight']
    },
    {
        q: "Если бы вам пришлось переспать с мужиком за 40, вы бы выбрали знакомого мужика или незнакомого?",
        a: ['Знакомого', 'Незнакомого', 'Обоих', 'Без разницы'],
        pony: ['fluttershy', 'rarity', 'applejack', 'twilight']
    },
];

const userAnswers = new Array(questions.length).fill(null);


function renderProgress() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i < currentIndex)
    })
};

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    renderQuestion();
    renderProgress();
});


function renderQuestion() {
    const data = questions[currentIndex - 1];
    question.textContent = data.q;
    answer1.textContent = data.a[0];
    answer2.textContent = data.a[1];
    answer3.textContent = data.a[2];
    answer4.textContent = data.a[3];
    currentQuestion.textContent = currentIndex;

    selectedAnswer = userAnswers[currentIndex - 1];
    answerBtn.forEach((btn, i) => {
        btn.classList.toggle('active', i === selectedAnswer);
    });

    renderProgress();
};

backBtn.addEventListener('click', () => {

    if (currentQuestion.textContent == 1) {
        quizScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
    else {
        currentIndex--;
    }
    renderQuestion();

});

againBtn.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');

    userAnswers.fill(null);
    selectedAnswer = null;

    currentQuestion.textContent = 1;
    currentIndex = 1;
    renderQuestion();
});



answerBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        answerBtn.forEach(b => {
            b.classList.remove('active')
        });
        btn.classList.add('active');

        selectedAnswer = index;
        userAnswers[currentIndex - 1] = selectedAnswer;
    })
}
);


function calculateResult() {
    const scores = {
        pinkie: 0, rainbow: 0, fluttershy: 0,
        twilight: 0, rarity: 0, applejack: 0,
    };

    userAnswers.forEach((answerIndex, questionIndex) => {
        if (answerIndex === null) return;
        const pony = questions[questionIndex].pony[answerIndex];
        scores[pony]++;
    });

    return scores;
};

function getWinner(scores) {
    maxScore = -1;
    let bestPony = null;

    for (const pony in scores) {
        if (scores[pony] > maxScore) {
            maxScore = scores[pony];
            bestPony = pony;
        }
        
    }

    return bestPony;
};

const ponyResults = {
    pinkie: {
        name: 'Пикми',
        img: 'image/Пинки Пай.png',
        description: 'Ты — душа компании...',
        adjective1: 'Весёлая',
        adjective2: 'Энергичная',
        adjective3: 'Дружелюбная'
    },
    rainbow: {
        name: 'Радужная',
        img: 'image/Радуга Дэш.png',
        description: 'Ты — крутая и суперская...',
        adjective1: 'Смелая',
        adjective2: 'Быстрая',
        adjective3: 'Верная',
    },
    fluttershy: {
        name: 'Флаттершай',
        img: 'image/Флаттершай.png',
        description: 'Ты — жертва педофила...',
        adjective1: 'Нежная',
        adjective2: 'Заботливая',
        adjective3: 'Скромная',
    },
    twilight: {
        name: 'Искорка',
        img: 'image/Сумеречная Искорка.png',
        description: 'Ты — нёрди тичерс пэт...',
        adjective1: 'Умная',
        adjective2: 'Любознательная',
        adjective3: 'Ответственная',
    },
    rarity: {
        name: 'Рарити',
        img: 'image/Рарити.png',
        description: 'Ты — стильная и изысканная...',
        adjective1: 'Стильная',
        adjective2: 'Изысканная',
        adjective3: 'Творческая',
    },
    applejack: {
        name: 'Эпплжек',
        img: 'image/Эпплджек.png',
        description: 'Ты — герой завода...',
        adjective1: 'Трудолюбивая',
        adjective2: 'Честная',
        adjective3: 'Надёжная',
    }
};

function showResult() {
    const scores = calculateResult();
    const winner = getWinner(scores);       
    const data = ponyResults[winner];       

    document.getElementById('pony-result').textContent = data.name;
    document.getElementById('result-img').src = data.img;
    document.getElementById('result-description').textContent = data.description;

    document.getElementById('adjectives1').textContent = data.adjective1;
    document.getElementById('adjectives2').textContent = data.adjective2;
    document.getElementById('adjectives3').textContent = data.adjective3;
}

nextBtn.addEventListener('click', () => {
    if (selectedAnswer === null) {
        return;
    }
    if (currentQuestion.textContent < 8) {
        currentIndex++;
        renderQuestion();
    }
    else {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        showResult();

    }

    answerBtn.forEach(btn => {
        btn.classList.remove('active')
    }
    )

});

shareBtn.addEventListener('click', () => {
    // берём имя пони, которое уже показано на экране
    const ponyName = document.getElementById('pony-result').textContent;
    const url = window.location.href;

    // собираем текст
    const text = `Я ${ponyName}, а ты? ${url}`;

    // создаём невидимое поле, кладём туда текст
    const input = document.createElement('textarea');
    input.value = text;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);

    // выделяем и копируем
    input.select();
    document.execCommand('copy');

    // убираем поле
    document.body.removeChild(input);

    // показываем "Скопировано!"
    const oldText = shareBtn.textContent;
    shareBtn.textContent = 'Скопировано!';
    setTimeout(() => {
        shareBtn.textContent = oldText;
    }, 1500);
});
