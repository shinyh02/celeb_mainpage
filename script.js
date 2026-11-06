const rankingPanel = document.querySelector(".ranking-panel");
if (rankingPanel) {
    const prev = parseInt(localStorage.getItem("rnkBgIdx") || "0", 10);
    const idx = (prev % 8) + 1;
    localStorage.setItem("rnkBgIdx", idx);
    rankingPanel.style.backgroundImage = `url('design/ranking section_bg/rnk_bg${idx}.jpg')`;
}

const cards = document.querySelectorAll(".news-card");
const modal = document.getElementById("newsModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalLink = document.getElementById("modalLink");
const closeModalButton = document.getElementById("btnCloseModal");
const cursorRing = document.getElementById("cursorRing");

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizPanel = document.getElementById("quizPanel");
const quizResultPanel = document.getElementById("quizResultPanel");
const quizResultText = document.getElementById("quizResultText");
const quizRetryButton = document.getElementById("quizRetryButton");
const quizNextButton = document.getElementById("quizNextButton");

const matcherSteps = document.querySelectorAll(".matcher-step");
const matcherResultPanel = document.getElementById("matcherResultPanel");
const matcherResultText = document.getElementById("matcherResultText");
const matcherNextButtons = document.querySelectorAll(".matcher-next");
const matcherResultButton = document.getElementById("matcherResultButton");
const matcherResetButton = document.getElementById("matcherResetButton");
const generationSelect = document.getElementById("generationSelect");
const powerSlider = document.getElementById("powerSlider");
const characteristicsGrid = document.getElementById("characteristicsGrid");
const puzzleFrame = document.getElementById("puzzleFrame");
const puzzleBoard = document.getElementById("puzzleBoard");
const puzzleGrid = document.getElementById("puzzleGrid");
const puzzleLines = document.getElementById("puzzleLines");
const puzzleAnswers = document.getElementById("puzzleAnswers");
const puzzleCaptureButton = document.getElementById("puzzleCaptureButton");
const puzzleCongratsModal = document.getElementById("puzzleCongratsModal");
const puzzleResetButton = document.getElementById("puzzleResetButton");
const puzzleHelpButton = document.getElementById("puzzleHelpButton");
const puzzleHelpPanel = document.getElementById("puzzleHelpPanel");
const puzzleHelpClose = document.getElementById("puzzleHelpClose");
const emojiPrompt = document.getElementById("emojiPrompt");
const emojiAnswerInput = document.getElementById("emojiAnswerInput");
const emojiSubmitButton = document.getElementById("emojiSubmitButton");
const mvSection = document.querySelector(".mv-section");
const mvThumbs = document.querySelectorAll(".mv-thumb");
const latestNewsSlot = document.getElementById("latestNewsSlot");
const perfectMatchesSlot = document.getElementById("perfectMatchesSlot");
const wordPuzzleSlot = document.getElementById("wordPuzzleSlot");
const weeklyQuizSlot = document.getElementById("weeklyQuizSlot");
const emojiQuizSlot = document.getElementById("emojiQuizSlot");
const mvSlot = document.getElementById("mvSlot");
const vsMetrics = document.getElementById("vsMetrics");
const vsGenerationLeft = document.getElementById("vsGenerationLeft");
const vsGenerationRight = document.getElementById("vsGenerationRight");
const vsSelectLeft = document.getElementById("vsSelectLeft");
const vsSelectRight = document.getElementById("vsSelectRight");
const vsMetaLeft = document.getElementById("vsMetaLeft");
const vsMetaRight = document.getElementById("vsMetaRight");
const vsTotalLeft = document.getElementById("vsTotalLeft");
const vsTotalRight = document.getElementById("vsTotalRight");

const openModal = (card) => {
    const headline = card.querySelector("h3")?.innerText || card.dataset.title || "";
    modalTitle.innerText = headline;
    modalBody.innerText = card.dataset.content || "";
    modalLink.href = card.dataset.link || "#";
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
};

const moveSectionIntoSlot = (element, slot) => {
    if (!element || !slot) {
        return;
    }
    slot.appendChild(element);
};

moveSectionIntoSlot(document.querySelector(".latest-news"), latestNewsSlot);
moveSectionIntoSlot(document.querySelector(".matcher-card"), perfectMatchesSlot);
moveSectionIntoSlot(document.querySelector(".puzzle-section"), wordPuzzleSlot);
moveSectionIntoSlot(document.querySelector(".quiz-card"), weeklyQuizSlot);
moveSectionIntoSlot(document.querySelector(".emoji-section"), emojiQuizSlot);
moveSectionIntoSlot(document.querySelector(".mv-section"), mvSlot);

document.querySelectorAll(".interactive-projects, .feature-row").forEach((wrapper) => {
    wrapper.remove();
});

const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
};

cards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(card);
        }
    });
});

if (modal && closeModalButton) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    closeModalButton.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

if (cursorRing) {
    const glowSections = [
        { selector: ".latest-news",    r: 163, g: 255, b: 51  },
        { selector: ".vs-zone-panel",  r: 143, g: 77,  b: 255 },
        { selector: ".puzzle-section", r: 255, g: 171, b: 64  },
        { selector: ".emoji-section",  r: 0,   g: 209, b: 255 },
        { selector: ".quiz-card",      r: 11,  g: 76,  b: 255 },
        { selector: ".matcher-card",   r: 255, g: 82,  b: 192 },
    ];

    const setGlow = (r, g, b) => {
        cursorRing.style.boxShadow =
            `0 0 14px 8px rgba(${r},${g},${b},0.85),` +
            `0 0 40px 18px rgba(${r},${g},${b},0.38),` +
            `0 0 80px 30px rgba(${r},${g},${b},0.14)`;
    };

    const resetGlow = () => {
        cursorRing.style.boxShadow =
            "0 0 14px 8px rgba(255,255,255,0.78)," +
            "0 0 40px 18px rgba(255,255,255,0.32)," +
            "0 0 80px 30px rgba(255,255,255,0.12)";
    };

    glowSections.forEach(({ selector, r, g, b }) => {
        const el = document.querySelector(selector);
        if (!el) return;
        el.addEventListener("mouseenter", () => setGlow(r, g, b));
        el.addEventListener("mouseleave", resetGlow);
    });

    document.addEventListener("mousemove", (event) => {
        cursorRing.style.opacity = "1";
        cursorRing.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    });

    document.addEventListener("mouseleave", () => {
        cursorRing.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursorRing.style.opacity = "1";
    });
}

const quizData = [
    {
        question: "Q1. 에스파의 이번 분기 종합 인지도 점수는?🔥",
        options: ["95점 이상", "90점 이상", "85점 이상", "80점 이상"],
        answer: 1
    },
    {
        question: "Q2. 전 세대 통합 호감도 1위를 기록한 그룹은?💖",
        options: ["뉴진스", "에스파", "방탄소년단", "아이브"],
        answer: 2
    },
    {
        question: "Q3. 신인 그룹 중 전 분기 대비 매력도 지수 상승이 가장 높은 팀은?✨",
        options: ["베이비몬스터", "라이즈", "투어스", "보이넥스트도어"],
        answer: 1
    }
];

const vsMetricLabels = [
    { key: "awareness", label: "인지도" },
    { key: "appeal", label: "매력도" },
    { key: "trust", label: "신뢰도" },
    { key: "onlineBuzz", label: "온라인 화제성" },
    { key: "onlineEngagement", label: "온라인 몰입성" }
];

const vsZoneData = {
    bts:            { name: "방탄소년단",     generation: "3세대", company: "빅히트 뮤직",       color: "#B6A8CD", total: 738.31, scores: { awareness: 76.48, appeal: 63.78, trust: 66.59, onlineBuzz: 100,   onlineEngagement: 82.48 } },
    blackpink:      { name: "블랙핑크",       generation: "3세대", company: "YG엔터테인먼트",    color: "#FFC0CB", total: 678.13, scores: { awareness: 75.16, appeal: 61.36, trust: 61.75, onlineBuzz: 77.45, onlineEngagement: 70.83 } },
    ive:            { name: "아이브",         generation: "4세대", company: "카카오/스타쉽",     color: "#E1002A", total: 679.88, scores: { awareness: 70.57, appeal: 59.81, trust: 58.13, onlineBuzz: 72.68, onlineEngagement: 100   } },
    straykids:      { name: "스트레이키즈",   generation: "4세대", company: "JYP엔터테인먼트",   color: "#FF0000", total: 579.32, scores: { awareness: 71.14, appeal: 52.26, trust: 54.29, onlineBuzz: 54.99, onlineEngagement: 52.34 } },
    exo:            { name: "엑소",           generation: "3세대", company: "SM엔터테인먼트",    color: "#FFF8E7", total: 519.63, scores: { awareness: 68.85, appeal: 52.96, trust: 53.89, onlineBuzz: 22.6,  onlineEngagement: 35.57 } },
    twice:          { name: "트와이스",       generation: "3세대", company: "JYP엔터테인먼트",   color: "#FF5FA2", total: 568.9,  scores: { awareness: 69.93, appeal: 58.88, trust: 57.53, onlineBuzz: 41.36, onlineEngagement: 36.37 } },
    seventeen:      { name: "세븐틴",         generation: "3세대", company: "하이브/플레디스",   color: "#F7CAC9", total: 601.78, scores: { awareness: 71.81, appeal: 55.26, trust: 56.91, onlineBuzz: 39.38, onlineEngagement: 73.46 } },
    illit:          { name: "아일릿",         generation: "4세대", company: "하이브/빌리프랩",   color: "#F2E6FF", total: 492.22, scores: { awareness: 65.59, appeal: 51.58, trust: 50.17, onlineBuzz: 26.14, onlineEngagement: 26.84 } },
    lesserafim:     { name: "르세라핌",       generation: "4세대", company: "하이브/쏘스뮤직",   color: "#3941A4", total: 491.1,  scores: { awareness: 67.08, appeal: 51.37, trust: 50.48, onlineBuzz: 24.51, onlineEngagement: 23.74 } },
    redvelvet:      { name: "레드벨벳",       generation: "3세대", company: "SM엔터테인먼트",    color: "#FF878F", total: 574.01, scores: { awareness: 74.7,  appeal: 63.7,  trust: 60.77, onlineBuzz: 28.72, onlineEngagement: 23.69 } },
    mamamoo:        { name: "마마무",         generation: "3세대", company: "RBW",              color: "#4C9A2A", total: 466.03, scores: { awareness: 64.45, appeal: 51.19, trust: 53.89, onlineBuzz: 10.34, onlineEngagement: 13.94 } },
    aespa:          { name: "에스파",         generation: "4세대", company: "SM엔터테인먼트",    color: "#8A2BE2", total: 622.44, scores: { awareness: 73.79, appeal: 58.06, trust: 56.71, onlineBuzz: 52.25, onlineEngagement: 68.52 } },
    bigbang:        { name: "빅뱅",           generation: "2세대", company: "YG엔터테인먼트",    color: "#FFD700", total: 521.53, scores: { awareness: 70.47, appeal: 54.21, trust: 51.14, onlineBuzz: 25.36, onlineEngagement: 34.22 } },
    babymonster:    { name: "베이비몬스터",   generation: "4세대", company: "YG엔터테인먼트",    color: "#E60012", total: 456.79, scores: { awareness: 66.75, appeal: 52.96, trust: 53.44, onlineBuzz: 5.91,  onlineEngagement: 1.59  } },
    tws:            { name: "투어스",         generation: "4세대", company: "하이브/플레디스",   color: "#89CFF0", total: 515.93, scores: { awareness: 75.05, appeal: 52.23, trust: 53.21, onlineBuzz: 20.14, onlineEngagement: 23.54 } },
    kiiikiii:       { name: "키키",           generation: "5세대", company: "카카오/스타쉽",     color: "#FFD700", total: 502.67, scores: { awareness: 71.91, appeal: 51.56, trust: 52.27, onlineBuzz: 28.55, onlineEngagement: 14.23 } },
    theboyz:        { name: "더보이즈",       generation: "3세대", company: "카카오/IST",        color: "#E02020", total: 464.79, scores: { awareness: 66.44, appeal: 47.4,  trust: 48.74, onlineBuzz: 14.61, onlineEngagement: 24.77 } },
    shinee:         { name: "샤이니",         generation: "2세대", company: "SM엔터테인먼트",    color: "#79E5CB", total: 550.73, scores: { awareness: 71.94, appeal: 58.37, trust: 58.66, onlineBuzz: 25.52, onlineEngagement: 29.71 } },
    enhypen:        { name: "엔하이픈",       generation: "4세대", company: "하이브/빌리프랩",   color: "#FFFFFF", total: 507.22, scores: { awareness: 70.48, appeal: 50.62, trust: 50.91, onlineBuzz: 20.17, onlineEngagement: 35.42 } },
    cortis:         { name: "코르티스",       generation: "5세대", company: "하이브/빅히트 뮤직", color: "#FF4500", total: 584.5,  scores: { awareness: 72.95, appeal: 55.09, trust: 56.94, onlineBuzz: 43.46, onlineEngagement: 51.49 } },
    idle:           { name: "아이들",   generation: "4세대", company: "큐브엔터테인먼트",  color: "#E11920", total: 495.55, scores: { awareness: 73.52, appeal: 54.34, trust: 55.45, onlineBuzz: 13.58, onlineEngagement: 5.14  } },
    nct:            { name: "NCT",            generation: "3세대", company: "SM엔터테인먼트",    color: "#B5C735", total: 495.55, scores: { awareness: 73.52, appeal: 54.34, trust: 55.45, onlineBuzz: 13.58, onlineEngagement: 5.14  } },
    xlov:           { name: "XLOV",           generation: "5세대", company: "257엔터테인먼트",   color: "#FF1493", total: 451.21, scores: { awareness: 65.77, appeal: 51.87, trust: 53.06, onlineBuzz: 4.35,  onlineEngagement: 3.85  } },
    zerobaseone:    { name: "제로베이스원",   generation: "4세대", company: "CJ ENM/웨이크원",   color: "#4A90E2", total: 512.53, scores: { awareness: 64.11, appeal: 49.93, trust: 51.83, onlineBuzz: 35.82, onlineEngagement: 38.88 } },
    riize:          { name: "라이즈",         generation: "4세대", company: "SM엔터테인먼트",    color: "#FF7F50", total: 593.58, scores: { awareness: 74.64, appeal: 52.6,  trust: 54.24, onlineBuzz: 37.22, onlineEngagement: 74.09 } },
    superjunior:    { name: "슈퍼주니어",     generation: "2세대", company: "SM엔터테인먼트",    color: "#0067A3", total: 507.83, scores: { awareness: 68.65, appeal: 54.31, trust: 52.59, onlineBuzz: 19.81, onlineEngagement: 28.08 } },
    apink:          { name: "에이핑크",       generation: "2세대", company: "카카오/IST",        color: "#FF88A7", total: 495.88, scores: { awareness: 68.17, appeal: 56.48, trust: 56.41, onlineBuzz: 12.88, onlineEngagement: 11.39 } },
    izna:           { name: "이즈나",         generation: "4세대", company: "CJ ENM/웨이크원",   color: "#FFD700", total: 472.56, scores: { awareness: 73.96, appeal: 49.48, trust: 51.08, onlineBuzz: 8.99,  onlineEngagement: 9.53  } },
    boynextdoor:    { name: "보이넥스트도어", generation: "4세대", company: "하이브/KOZ",        color: "#005B9F", total: 469.0,  scores: { awareness: 63.6,  appeal: 49.46, trust: 51.0,  onlineBuzz: 15.95, onlineEngagement: 23.76 } },
    fromis9:        { name: "프로미스나인",   generation: "4세대", company: "하이브/플레디스",   color: "#00A859", total: 491.16, scores: { awareness: 70.02, appeal: 52.87, trust: 52.82, onlineBuzz: 9.52,  onlineEngagement: 23.0  } },
    hearts2hearts:  { name: "하츠투하츠",     generation: "5세대", company: "SM엔터테인먼트",    color: "#FF69B4", total: 505.48, scores: { awareness: 72.67, appeal: 52.41, trust: 52.01, onlineBuzz: 23.65, onlineEngagement: 18.55 } },
    itzy:           { name: "ITZY",           generation: "4세대", company: "JYP엔터테인먼트",   color: "#FF00FF", total: 527.34, scores: { awareness: 71.46, appeal: 54.69, trust: 56.11, onlineBuzz: 21.66, onlineEngagement: 28.15 } },
    monstax:        { name: "몬스타엑스",     generation: "3세대", company: "카카오/스타쉽",     color: "#C40233", total: 600.92, scores: { awareness: 72.34, appeal: 60.76, trust: 60.52, onlineBuzz: 20.94, onlineEngagement: 68.64 } },
    h1key:          { name: "H1-KEY",         generation: "4세대", company: "GLG",              color: "#FF66CC", total: 540.83, scores: { awareness: 65.11, appeal: 54.69, trust: 54.47, onlineBuzz: 18.84, onlineEngagement: 61.77 } },
    ateez:          { name: "에이티즈",       generation: "4세대", company: "KQ엔터테인먼트",    color: "#D47A3A", total: 486.75, scores: { awareness: 58.6,  appeal: 49.22, trust: 49.02, onlineBuzz: 16.96, onlineEngagement: 55.6  } },
    alphadriveone:  { name: "알파드라이브원", generation: "5세대", company: "CJ ENM/웨이크원",   color: "#1E90FF", total: 474.71, scores: { awareness: 67.9,  appeal: 49.38, trust: 50.57, onlineBuzz: 9.71,  onlineEngagement: 26.33 } },
    txt:            { name: "투모로우바이투게더", generation: "4세대", company: "하이브/빅히트 뮤직", color: "#BDE4F4", total: 516.71, scores: { awareness: 67.62, appeal: 51.2,  trust: 53.16, onlineBuzz: 40.55, onlineEngagement: 23.65 } },
    kissoflife:     { name: "키스오브라이프", generation: "4세대", company: "S2엔터테인먼트",    color: "#C21E56", total: 465.04, scores: { awareness: 60.86, appeal: 46.08, trust: 47.85, onlineBuzz: 36.49, onlineEngagement: 21.29 } },
    treasure:       { name: "트레저",         generation: "4세대", company: "YG엔터테인먼트",    color: "#87CEEB", total: 418.53, scores: { awareness: 54.77, appeal: 41.47, trust: 43.06, onlineBuzz: 32.84, onlineEngagement: 19.16 } },
    nmixx:          { name: "엔믹스",         generation: "4세대", company: "JYP엔터테인먼트",   color: "#00BFFF", total: 536.36, scores: { awareness: 73.63, appeal: 58.0,  trust: 58.26, onlineBuzz: 18.05, onlineEngagement: 22.07 } },
    tvxq:           { name: "동방신기",       generation: "2세대", company: "SM엔터테인먼트",    color: "#FF0000", total: 482.72, scores: { awareness: 66.26, appeal: 52.2,  trust: 52.44, onlineBuzz: 16.25, onlineEngagement: 19.86 } },
    fiftyfifty:     { name: "피프티피프티",   generation: "4세대", company: "어트랙트",          color: "#FFB6C1", total: 498.64, scores: { awareness: 70.66, appeal: 54.53, trust: 54.36, onlineBuzz: 12.95, onlineEngagement: 17.33 } },
    triples:        { name: "트리플에스",     generation: "4세대", company: "모더나우스",        color: "#6666FF", total: 506.95, scores: { awareness: 69.29, appeal: 53.0,  trust: 50.38, onlineBuzz: 19.62, onlineEngagement: 34.19 } },
    meovv:          { name: "미야오",         generation: "4세대", company: "더블랙레이블",      color: "#00FF00", total: 532.73, scores: { awareness: 70.87, appeal: 59.98, trust: 59.87, onlineBuzz: 14.54, onlineEngagement: 20.37 } },
    stayc:          { name: "스테이씨",       generation: "4세대", company: "카카오/하이업",     color: "#FF69B4", total: 532.48, scores: { awareness: 72.8,  appeal: 58.12, trust: 55.62, onlineBuzz: 17.01, onlineEngagement: 27.46 } },
    kickflip:       { name: "킥플립",         generation: "5세대", company: "JYP엔터테인먼트",   color: "#00CED1", total: 480.35, scores: { awareness: 63.57, appeal: 49.54, trust: 52.96, onlineBuzz: 18.03, onlineEngagement: 27.22 } },
    katseye:        { name: "캣츠아이",       generation: "4세대", company: "하이브/게펜",       color: "#FFA500", total: 518.52, scores: { awareness: 70.47, appeal: 56.71, trust: 56.72, onlineBuzz: 5.87,  onlineEngagement: 32.16 } },
    cravity:        { name: "크래비티",       generation: "4세대", company: "카카오/스타쉽",     color: "#8D99AE", total: 466.67, scores: { awareness: 63.42, appeal: 51.04, trust: 51.05, onlineBuzz: 5.28,  onlineEngagement: 28.94 } },
    onf:            { name: "온앤오프",       generation: "3세대", company: "RBW/WM",           color: "#18A8E0", total: 474.76, scores: { awareness: 72.93, appeal: 51.4,  trust: 51.73, onlineBuzz: 5.8,   onlineEngagement: 11.12 } },
    kep1er:         { name: "케플러",         generation: "4세대", company: "CJ ENM/웨이크원",   color: "#E1D0E8", total: 427.28, scores: { awareness: 65.63, appeal: 46.26, trust: 46.56, onlineBuzz: 5.22,  onlineEngagement: 10.01 } },
};

let quizIndex = 0;
let quizCorrectCount = 0;

const showQuizResult = () => {
    if (!quizPanel || !quizResultPanel || !quizResultText) {
        return;
    }

    const comment = quizCorrectCount === 3 ? "당신, 아이돌 박사 맞군요?" : "조금 더 공부하세요!";
    quizPanel.classList.remove("active");
    quizResultPanel.classList.add("active");
    quizResultText.innerText = `맞힌 개수: ${quizCorrectCount}/3\n${comment}`;
};

const renderQuiz = () => {
    if (!quizQuestion || !quizOptions || !quizPanel || !quizResultPanel || !quizFeedback) {
        return;
    }

    const item = quizData[quizIndex];
    quizQuestion.innerText = item.question;
    quizFeedback.innerText = "";
    quizOptions.innerHTML = "";
    quizPanel.classList.add("active");
    quizResultPanel.classList.remove("active");

    if (quizNextButton) {
        quizNextButton.style.display = "none";
        quizNextButton.onclick = null;
    }

    item.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.innerHTML = `<span class="quiz-radio"></span><span class="quiz-option-text">${option}</span>`;
        button.addEventListener("click", () => {
            const optionButtons = quizOptions.querySelectorAll(".quiz-option");
            const isCorrect = index === item.answer;

            optionButtons.forEach((candidate, candidateIndex) => {
                candidate.disabled = true;
                if (candidateIndex === item.answer) {
                    candidate.classList.add("correct");
                } else if (candidateIndex === index) {
                    candidate.classList.add("wrong");
                }
            });

            if (isCorrect) {
                quizCorrectCount += 1;
            }

            quizFeedback.innerText = isCorrect ? "정답입니다!" : "오답입니다!";

            if (quizNextButton) {
                quizNextButton.style.display = "inline-flex";
                quizNextButton.onclick = () => {
                    quizIndex += 1;
                    if (quizIndex < quizData.length) {
                        renderQuiz();
                        return;
                    }
                    showQuizResult();
                };
            }
        });
        quizOptions.appendChild(button);
    });
};

const showMatcherStep = (stepNumber) => {
    matcherSteps.forEach((step) => {
        step.classList.toggle("active", step.dataset.step === String(stepNumber));
    });
    if (matcherResultPanel) {
        matcherResultPanel.classList.remove("active");
    }
};

const updateDualSlider = (slider) => {
    if (!slider) return;
    const value = Number(slider.value || 50);
    const center = 50;
    if (value === center) {
        slider.style.backgroundImage = "linear-gradient(to right, #4b4b4b 0%, #4b4b4b 100%)";
        return;
    }
    if (value > center) {
        slider.style.backgroundImage = `linear-gradient(to right, #4b4b4b 0%, #4b4b4b ${center}%, #ffffff ${center}%, #ffffff ${value}%, #4b4b4b ${value}%, #4b4b4b 100%)`;
        return;
    }
    slider.style.backgroundImage = `linear-gradient(to right, #4b4b4b 0%, #4b4b4b ${value}%, #ffffff ${value}%, #ffffff ${center}%, #4b4b4b ${center}%, #4b4b4b 100%)`;
};

const updatePowerSlider = () => updateDualSlider(powerSlider);

const characteristicWeights = {
    "강인한":    { awareness: 0.3, trust: 0.7 },
    "리더십있는": { awareness: 0.5, trust: 0.5 },
    "열정적인":  { appeal: 0.4, onlineEngagement: 0.6 },
    "재미있는":  { appeal: 0.3, onlineEngagement: 0.7 },
    "센스있는":  { appeal: 0.4, onlineBuzz: 0.6 },
    "섹시한":    { appeal: 1.0 },
    "실력있는":  { trust: 0.5, awareness: 0.5 },
    "세련된":    { appeal: 0.5, awareness: 0.5 },
    "트렌디한":  { onlineBuzz: 0.5, onlineEngagement: 0.5 },
    "솔직한":    { trust: 1.0 },
    "성실한":    { trust: 0.8, awareness: 0.2 },
    "지적인":    { awareness: 0.7, trust: 0.3 },
    "순수한":    { appeal: 0.5, trust: 0.5 },
    "따뜻한":    { trust: 0.4, appeal: 0.6 },
    "친근한":    { onlineEngagement: 0.6, appeal: 0.4 },
    "귀여운":    { appeal: 0.6, onlineEngagement: 0.4 },
    "감성적인":  { appeal: 0.5, onlineBuzz: 0.5 },
};

if (characteristicsGrid) {
    const syncCharState = () => {
        const allLabels = characteristicsGrid.querySelectorAll(".char-option");
        const count = characteristicsGrid.querySelectorAll("input:checked").length;
        allLabels.forEach((l) => {
            const cb = l.querySelector("input");
            l.classList.toggle("is-disabled", !cb.checked && count >= 3);
        });
        if (matcherResultButton) {
            matcherResultButton.disabled = count !== 3;
        }
    };

    characteristicsGrid.querySelectorAll(".char-option").forEach((label) => {
        label.addEventListener("click", () => {
            const input = label.querySelector("input");
            const count = characteristicsGrid.querySelectorAll("input:checked").length;
            if (!input.checked && count >= 3) return;
            input.checked = !input.checked;
            label.classList.toggle("is-selected", input.checked);
            syncCharState();
        });
    });
}

const resetMatcher = () => {
    if (generationSelect) {
        generationSelect.value = "4세대";
    }
    if (powerSlider) {
        powerSlider.value = "50";
    }
    if (characteristicsGrid) {
        characteristicsGrid.querySelectorAll("input").forEach((cb) => { cb.checked = false; });
        characteristicsGrid.querySelectorAll(".char-option").forEach((l) => {
            l.classList.remove("is-selected", "is-disabled");
        });
    }
    if (matcherResultButton) {
        matcherResultButton.disabled = true;
    }
    showMatcherStep(1);
    updatePowerSlider();
};

matcherNextButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showMatcherStep(button.dataset.nextStep);
    });
});

if (matcherResultButton) {
    matcherResultButton.addEventListener("click", () => {
        const generation = generationSelect?.value || "4세대";
        const power = Number(powerSlider?.value ?? 50);

        const selected = characteristicsGrid
            ? Array.from(characteristicsGrid.querySelectorAll("input:checked")).map((cb) => cb.value)
            : [];
        if (selected.length === 0) return;

        const candidates = Object.values(vsZoneData).filter(g => g.generation === generation);
        const powerRatio = power / 100;

        const totalWeights = { awareness: 0, appeal: 0, trust: 0, onlineBuzz: 0, onlineEngagement: 0 };
        selected.forEach((char) => {
            const weights = characteristicWeights[char] || {};
            Object.entries(weights).forEach(([key, val]) => { totalWeights[key] += val; });
        });

        let best = candidates[0];
        let bestScore = -Infinity;
        candidates.forEach(g => {
            const s = g.scores;
            const reputation = (s.awareness + s.trust) / 2;
            const rising = (s.onlineBuzz + s.onlineEngagement) / 2;
            const charScore = Object.entries(totalWeights).reduce((sum, [key, w]) => sum + (s[key] || 0) * w, 0);
            const score = (reputation * (1 - powerRatio) + rising * powerRatio) * 0.4 + charScore * 0.6;
            if (score > bestScore) { bestScore = score; best = g; }
        });

        const group = best ? best.name : "방탄소년단";

        matcherSteps.forEach((step) => step.classList.remove("active"));
        if (matcherResultPanel) matcherResultPanel.classList.add("active");
        if (matcherResultText) {
            matcherResultText.innerHTML = `데이터 분석 결과, 당신의 취향에 가장 잘 맞는 그룹은 <br><strong>${group}</strong>입니다.`;
        }
    });
}

if (matcherResetButton) {
    matcherResetButton.addEventListener("click", resetMatcher);
}


if (powerSlider) {
    powerSlider.addEventListener("input", updatePowerSlider);
}

if (quizRetryButton) {
    quizRetryButton.addEventListener("click", () => {
        quizIndex = 0;
        quizCorrectCount = 0;
        renderQuiz();
    });
}

renderQuiz();
resetMatcher();

const puzzleWordPool = [
    "BTS", "BLACKPINK", "IVE", "STRAYKIDS", "EXO", "TWICE", "SEVENTEEN", "ILLIT", "LESSERAFIM", "REDVELVET",
    "MAMAMOO", "AESPA", "BIGBANG", "BABYMONSTER", "TWS", "KIIIKIII", "THEBOYZ", "SHINEE", "ENHYPEN", "CORTIS",
    "IDLE", "NCT", "XLOV", "ZEROBASEONE", "RIIZE", "SUPERJUNIOR", "APINK", "IZNA", "BOYNEXTDOOR", "FROMIS9",
    "HEARTS2HEARTS", "ITZY", "MONSTAX", "H1KEY", "ATEEZ", "ALPHADRIVEONE", "TOMORROWXTOGETHER", "KISSOFLIFE", "TREASURE", "NMIXX",
    "TVXQ", "FIFTYFIFTY", "TRIPLES", "MEOVV", "STAYC", "KICKFLIP", "KATSEYE", "CRAVITY", "ONF", "KEP1ER"
];

const emojiQuizPool = [
    { emojis: "💜🧈🧨🕺", answer: "방탄소년단 · BTS", aliases: ["방탄소년단", "BTS"] },
    { emojis: "🖤🩷🐍🔫", answer: "블랙핑크 · BLACKPINK", aliases: ["블랙핑크", "BLACKPINK"] },
    { emojis: "👑💧🤿🦢", answer: "아이브 · IVE", aliases: ["아이브", "IVE"] },
    { emojis: "🌟👨‍🍳🍲🔥", answer: "스트레이키즈 · STRAYKIDS", aliases: ["스트레이키즈", "STRAYKIDS"] },
    { emojis: "🐺🌕🐾🗣️", answer: "엑소 · EXO", aliases: ["엑소", "EXO"] },
    { emojis: "😭✌️🍭💖", answer: "트와이스 · TWICE", aliases: ["트와이스", "TWICE"] },
    { emojis: "💎🐵☁️🔥", answer: "세븐틴 · SEVENTEEN", aliases: ["세븐틴", "SEVENTEEN"] },
    { emojis: "🧲💖🏃‍♀️✨", answer: "아일릿 · ILLIT", aliases: ["아일릿", "ILLIT"] },
    { emojis: "🚫👼🐍🍎", answer: "르세라핌 · LESSERAFIM", aliases: ["르세라핌", "LESSERAFIM"] },
    { emojis: "🔴🍰🍓🍉", answer: "레드벨벳 · REDVELVET", aliases: ["레드벨벳", "REDVELVET"] },
    { emojis: "🌳🗣️🎤🎵", answer: "마마무 · MAMAMOO", aliases: ["마마무", "MAMAMOO"] },
    { emojis: "👽🛸💥⭐️", answer: "에스파 · AESPA", aliases: ["에스파", "AESPA"] }
];

const puzzleState = {
    columns: 8,
    rows: 7,
    words: [],
    board: [],
    foundWords: new Set(),
    pathMap: new Map(),
    wordColors: new Map(),
    selectedCells: [],
    isDragging: false,
    pointerPosition: null
};

const puzzleColorClasses = ["puzzle-color-1", "puzzle-color-2", "puzzle-color-3", "puzzle-color-love"];

const getKstDateKey = () => {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());
};

const getPuzzleDayIndex = () => {
    const now = new Date();
    const kstString = now.toLocaleString("sv-SE", { timeZone: "Asia/Seoul" }).replace(" ", "T");
    const kstDate = new Date(`${kstString}+09:00`);
    const base = new Date("2026-01-01T00:00:00+09:00");
    return Math.floor((kstDate - base) /86400000);
};

const normalizeGroupName = (value) => {
    return value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
};

const vsGenerations = ["2세대", "3세대", "4세대", "5세대"];

const populateVsSelects = () => {
    if (!vsSelectLeft || !vsSelectRight || !vsGenerationLeft || !vsGenerationRight) {
        return;
    }

    const entries = Object.entries(vsZoneData);
    const createGenerationOptions = (select) => {
        select.innerHTML = "";
        vsGenerations.forEach((generation) => {
            const option = document.createElement("option");
            option.value = generation;
            option.textContent = generation;
            select.appendChild(option);
        });
    };

    const populateGroupOptions = (generationSelect, groupSelect, preferredKey) => {
        const generation = generationSelect.value;
        const filteredEntries = entries
            .filter(([, value]) => value.generation === generation)
            .sort(([, a], [, b]) => a.name.localeCompare(b.name, "ko"));

        groupSelect.innerHTML = "";
        filteredEntries.forEach(([key, value]) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = value.name;
            groupSelect.appendChild(option);
        });

        const preferredExists = filteredEntries.some(([key]) => key === preferredKey);
        if (preferredExists) {
            groupSelect.value = preferredKey;
            return;
        }

        if (filteredEntries.length > 0) {
            groupSelect.value = filteredEntries[0][0];
        }
    };

    createGenerationOptions(vsGenerationLeft);
    createGenerationOptions(vsGenerationRight);

    vsGenerationLeft.value = "4세대";
    vsGenerationRight.value = "4세대";

    populateGroupOptions(vsGenerationLeft, vsSelectLeft, "aespa");
    populateGroupOptions(vsGenerationRight, vsSelectRight, "riize");

    vsGenerationLeft.addEventListener("change", () => {
        populateGroupOptions(vsGenerationLeft, vsSelectLeft);
        renderVsZone();
    });

    vsGenerationRight.addEventListener("change", () => {
        populateGroupOptions(vsGenerationRight, vsSelectRight);
        renderVsZone();
    });
};

const calcVsTotal = (scores) => {
    const offline = (scores.awareness + scores.appeal + scores.trust) /3;
    const online = (scores.onlineBuzz + scores.onlineEngagement) /2;
    return (offline * 0.7 + online * 0.3) * 10;
};

const spotifyImages = {
    bts:           "",
    blackpink:     "",
    ive:           "",
    aespa:         "",
    seventeen:     "",
    riize:         "",
    monstax:       "",
    cortis:        "",
    twice:         "",
    straykids:     "",
    redvelvet:     "",
    nmixx:         "",
    stayc:         "",
    meovv:         "",
    itzy:          "",
    nct:           "",
    exo:           "",
    shinee:        "",
    bigbang:       "",
    superjunior:   "",
    enhypen:       "",
    txt:           "",
    zerobaseone:   "",
    katseye:       "",
    tws:           "",
    kiiikiii:      "",
    hearts2hearts: "",
    h1key:         "",
    ateez:         "",
    idle:          "",
    babymonster:   "",
    illit:         "",
    lesserafim:    "",
    alphadriveone: "",
    izna:          "",
    fromis9:       "",
    boynextdoor:   "",
    kissoflife:    "",
    fiftyfifty:    "",
    triples:       "",
    theboyz:       "",
    mamamoo:       "",
    treasure:      "",
    kep1er:        "",
    cravity:       "",
    onf:           "",
    tvxq:          "",
    apink:         "",
    kickflip:      "",
    xlov:          "",
};

const rnkGradients = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
    ["#a18cd1", "#fbc2eb"],
    ["#fd7043", "#ff8a65"],
    ["#26c6da", "#00bcd4"],
];

const getRnkGradient = (key) => {
    const hash = [...key].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return rnkGradients[hash % rnkGradients.length];
};

const renderRanking = () => {
    const track = document.getElementById("rankingCarouselTrack");
    const navUp = document.getElementById("rankingNavUp");
    const navDown = document.getElementById("rankingNavDown");
    const fullBtn = document.getElementById("rankingFullBtn");
    if (!track) return;

    const ranked = Object.entries(vsZoneData)
        .map(([key, data]) => ({ key, ...data, rnrScore: data.total }))
        .sort((a, b) => b.rnrScore - a.rnrScore)
        .slice(0, 20);

    const getY = (offset) => {
        const abs = Math.abs(offset);
        const sign = Math.sign(offset);
        if (abs === 0) return 0;
        if (abs === 1) return sign * 85;
        return sign * (85 + (abs - 1) * 66);
    };
    let currentIdx = 0;
    let isAnimating = false;
    let autoTimer = null;
    let isHovered = false;
    let isModalOpen = false;
    let activeModalKey = null;

    const buildCard = (idx) => {
        const g = ranked[idx];
        const rank = idx + 1;
        const card = document.createElement("div");
        card.className = "ranking-card";

        const rankEl = document.createElement("div");
        rankEl.className = "ranking-card-rank" + (rank <= 3 ? " is-top3" : "");
        rankEl.innerHTML = `${rank}<span class="ranking-card-rank-wi">위</span>`;

        let mediaEl;
        const imgUrl = spotifyImages[g.key];
        if (imgUrl) {
            mediaEl = document.createElement("img");
            mediaEl.className = "ranking-card-img";
            mediaEl.src = imgUrl;
            mediaEl.alt = g.name;
            mediaEl.addEventListener("error", () => {
                const ph = document.createElement("div");
                const [c1, c2] = getRnkGradient(g.key);
                ph.className = "ranking-card-img-placeholder";
                ph.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
                ph.textContent = g.name.charAt(0);
                mediaEl.replaceWith(ph);
            });
        } else {
            mediaEl = document.createElement("div");
            const [c1, c2] = getRnkGradient(g.key);
            mediaEl.className = "ranking-card-img-placeholder";
            mediaEl.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
            mediaEl.textContent = g.name.charAt(0);
        }

        const infoEl = document.createElement("div");
        infoEl.className = "ranking-card-info";
        infoEl.innerHTML = `<div class="ranking-card-name">${g.name}</div><div class="ranking-card-meta">${g.generation} / ${g.company}</div>`;

        const scoreWrap = document.createElement("div");
        scoreWrap.className = "ranking-card-score-wrap";
        scoreWrap.innerHTML = `<div class="ranking-card-score">${g.rnrScore.toFixed(1)}<span class="ranking-card-rank-wi">점</span></div>`;

        card.append(rankEl, mediaEl, infoEl, scoreWrap);
        return card;
    };

    const cardEls = ranked.map((g, idx) => {
        const card = buildCard(idx);
        card.style.top = "50%";
        card.addEventListener("click", () => {
            if (isModalOpen && activeModalKey === g.key) {
                closeRankModal();
            } else {
                openRankModal(g, idx + 1);
            }
        });
        track.appendChild(card);
        return card;
    });

    const buildGhostCard = (rank) => {
        const card = document.createElement("div");
        card.className = "ranking-card is-ghost";
        card.style.top = "50%";

        const rankEl = document.createElement("div");
        rankEl.className = "ranking-card-rank";
        rankEl.innerHTML = `${rank}<span class="ranking-card-rank-wi">위</span>`;

        const mediaEl = document.createElement("div");
        mediaEl.className = "ranking-card-img-placeholder is-ghost-img";

        const infoEl = document.createElement("div");
        infoEl.className = "ranking-card-info";
        infoEl.innerHTML = `<div class="ranking-card-name">???</div><div class="ranking-card-meta">??? / ???</div>`;

        const scoreWrap = document.createElement("div");
        scoreWrap.className = "ranking-card-score-wrap";
        scoreWrap.innerHTML = `<div class="ranking-card-score">???.?<span class="ranking-card-rank-wi">점</span></div>`;

        card.append(rankEl, mediaEl, infoEl, scoreWrap);
        track.appendChild(card);
        return card;
    };

    const ghostCards = [21, 22, 23].map(buildGhostCard);
    const allCards = [...cardEls, ...ghostCards];

    const applyDrum = (animate) => {
        if (!animate) allCards.forEach(c => { c.style.transition = "none"; });
        allCards.forEach((card, idx) => {
            const offset = idx - currentIdx;
            const abs = Math.abs(offset);
            const isGhost = card.classList.contains("is-ghost");
            if (abs > 3) { card.style.visibility = "hidden"; card.classList.remove("is-center"); card.style.pointerEvents = "none"; return; }
            if (isGhost && offset <= 0) { card.style.visibility = "hidden"; return; }
            card.style.visibility = "visible";
            card.classList.toggle("is-center", abs === 0);
            card.style.pointerEvents = (!isGhost && abs === 0) ? "auto" : "none";
            const scale = 1 - abs * 0.13;
            const blur  = isGhost ? abs * 2 + 3 : abs * 2;
            const opac  = isGhost ? Math.max(0.1, 1 - abs * 0.28) * 0.7 : Math.max(0.15, 1 - abs * 0.28);
            card.style.transform = `translateY(calc(-50% + ${getY(offset)}px)) scale(${scale})`;
            card.style.filter    = blur > 0 ? `blur(${blur}px)` : "none";
            card.style.opacity   = String(opac);
            card.style.zIndex    = String(10 - abs);
        });
        if (!animate) {
            requestAnimationFrame(() => requestAnimationFrame(() => {
                allCards.forEach(c => { c.style.transition = ""; });
            }));
        }
    };

    const updateBtn = () => {
        if (currentIdx >= ranked.length - 1) {
            if (fullBtn) fullBtn.classList.add("is-visible");
            const guide = document.getElementById("rankingArrowGuide");
            if (guide) guide.classList.add("is-visible");
        }
    };

    const startAutoScroll = () => {
        clearInterval(autoTimer);
        clearTimeout(autoTimer);
        if (isHovered || isModalOpen) return;
        autoTimer = setInterval(() => {
            if (currentIdx < ranked.length - 1 && !isAnimating) {
                navigate(currentIdx + 1);
            } else if (currentIdx >= ranked.length - 1) {
                clearInterval(autoTimer);
                // 20위에서 잠시 멈춘 뒤 빠르게 1위로 롤백
                autoTimer = setTimeout(() => {
                    let flashIdx = ranked.length - 1;
                    cardEls.forEach(c => { c.style.transition = "transform 0.03s ease, filter 0.03s ease, opacity 0.03s ease"; });
                    autoTimer = setInterval(() => {
                        flashIdx -= 1;
                        currentIdx = flashIdx;
                        applyDrum(true);
                        if (flashIdx <= 0) {
                            clearInterval(autoTimer);
                            cardEls.forEach(c => { c.style.transition = ""; });
                            autoTimer = setTimeout(startAutoScroll, 600);
                        }
                    }, 35);
                }, 2000);
            }
        }, 1500);
    };

    const pauseAutoScroll = () => {
        clearInterval(autoTimer);
        clearTimeout(autoTimer);
        setTimeout(startAutoScroll, 4000);
    };

    const metricGroups = [
        { group: "Reputation Power", keys: [["awareness", "인지도"], ["appeal", "매력도"], ["trust", "신뢰도"]] },
        { group: "Rising Power",     keys: [["onlineBuzz", "온라인 화제성"], ["onlineEngagement", "온라인 몰입성"]] }
    ];

    const rankModal = document.createElement("div");
    rankModal.className = "ranking-detail-modal";
    rankModal.setAttribute("aria-hidden", "true");
    rankModal.addEventListener("click", () => closeRankModal());
    const panelInner = document.querySelector(".ranking-panel-inner");
    if (panelInner) panelInner.appendChild(rankModal);

    const openRankModal = (g, rank) => {
        isModalOpen = true;
        activeModalKey = g.key;
        clearInterval(autoTimer);
        clearTimeout(autoTimer);
        const metricsHtml = metricGroups.map(({ group, keys }) => {
            const rowsHtml = keys.map(([key, label]) => {
                const val = g.scores[key];
                return `<div class="rnk-modal-metric">
                    <span class="rnk-modal-metric-label">${label}</span>
                    <div class="rnk-modal-metric-bar"><div class="rnk-modal-metric-fill" data-width="${val}" style="width:0%"></div></div>
                    <span class="rnk-modal-metric-val" data-target="${val}">0.00</span>
                </div>`;
            }).join("");
            return `<div class="rnk-modal-group">
                <div class="rnk-modal-group-label">${group}</div>
                ${rowsHtml}
            </div>`;
        }).join("");
        rankModal.innerHTML = `<div class="rnk-modal-card">
            <div class="rnk-modal-rank">${rank}<span class="ranking-card-rank-wi">위</span></div>
            <div class="rnk-modal-name">${g.name}</div>
            <div class="rnk-modal-meta">${g.generation} / ${g.company}</div>
            <div class="rnk-modal-total">0.00</div>
            <div class="rnk-modal-metrics">${metricsHtml}</div>
            <a class="rnk-modal-artist-btn" href="/artist/${g.key.toLowerCase()}" onclick="event.stopPropagation()">아티스트 페이지로 이동 →</a>
        </div>`;
        rankModal.setAttribute("aria-hidden", "false");
        requestAnimationFrame(() => {
            rankModal.classList.add("is-active");
            const totalEl = rankModal.querySelector(".rnk-modal-total");
            if (totalEl) animateCount(totalEl, g.rnrScore);
            rankModal.querySelectorAll(".rnk-modal-metric-val").forEach(el => {
                animateCount(el, parseFloat(el.dataset.target));
            });
            rankModal.querySelectorAll(".rnk-modal-metric-fill").forEach(el => {
                el.style.width = el.dataset.width + "%";
            });
        });
    };

    const closeRankModal = () => {
        isModalOpen = false;
        activeModalKey = null;
        rankModal.classList.remove("is-active");
        rankModal.setAttribute("aria-hidden", "true");
        if (!isHovered) startAutoScroll();
    };

    const navigate = (newIdx) => {
        const clamped = Math.max(0, Math.min(newIdx, ranked.length - 1));
        if (clamped === currentIdx || isAnimating) return;
        isAnimating = true;
        currentIdx = clamped;
        applyDrum(true);
        updateBtn();
        setTimeout(() => { isAnimating = false; }, 160);
    };

    applyDrum(false);
    startAutoScroll();

    if (navUp)   navUp.addEventListener("click",   () => { pauseAutoScroll(); navigate(currentIdx - 1); });
    if (navDown) navDown.addEventListener("click", () => { pauseAutoScroll(); navigate(currentIdx + 1); });

    const panel = document.querySelector(".ranking-panel");
    if (panel) {
        let wheelLock = false;
        panel.addEventListener("wheel", (e) => {
            e.preventDefault();
            if (wheelLock || isAnimating) return;
            wheelLock = true;
            pauseAutoScroll();
            setTimeout(() => { wheelLock = false; }, 130);
            navigate(e.deltaY > 0 ? currentIdx + 1 : currentIdx - 1);
        }, { passive: false });

        panel.addEventListener("mouseover", (e) => {
            if (e.target.closest(".ranking-card.is-center")) {
                isHovered = true;
                clearInterval(autoTimer);
                clearTimeout(autoTimer);
            }
        });
        panel.addEventListener("mouseout", (e) => {
            const card = e.target.closest(".ranking-card.is-center");
            if (card && !card.contains(e.relatedTarget)) {
                isHovered = false;
                if (!isModalOpen) startAutoScroll();
            }
        });
    }
};

const animateCount = (el, target, duration = 700) => {
    const start = performance.now();
    const tick = (now) => {
        const progress = Math.min((now - start) /duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        el.textContent = (ease * target).toFixed(2);
        if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const renderVsZone = () => {
    if (
        !vsMetrics ||
        !vsSelectLeft ||
        !vsSelectRight ||
        !vsMetaLeft ||
        !vsMetaRight ||
        !vsTotalLeft ||
        !vsTotalRight
    ) {
        return;
    }

    const left = vsZoneData[vsSelectLeft.value];
    const right = vsZoneData[vsSelectRight.value];
    if (!left || !right) {
        return;
    }

    vsMetaLeft.textContent = `${left.generation} · ${left.company}`;
    vsMetaRight.textContent = `${right.generation} · ${right.company}`;
    vsTotalLeft.style.color = left.color;
    vsTotalRight.style.color = right.color;
    animateCount(vsTotalLeft, left.total);
    animateCount(vsTotalRight, right.total);

    const isFirstRender = !vsMetrics.children.length;

    if (isFirstRender) {
        vsMetricLabels.forEach(({ key, label }) => {
            const row = document.createElement("div");
            row.className = "vs-row-block";
            row.dataset.key = key;
            row.innerHTML = `
                <div class="vs-row">
                    <div class="vs-row-label">${label}</div>
                    <span class="vs-score vs-score-left"></span>
                    <div class="vs-track">
                        <span class="vs-fill-left" style="width:0%"></span>
                        <span class="vs-fill-right" style="width:0%"></span>
                    </div>
                    <span class="vs-score vs-score-right"></span>
                </div>
            `;
            vsMetrics.appendChild(row);
        });
    }

    vsMetricLabels.forEach(({ key }) => {
        const leftValue = left.scores[key];
        const rightValue = right.scores[key];
        const total = Math.max(leftValue + rightValue, 1);
        const leftWidth = (leftValue /total) * 100;
        const rightWidth = (rightValue /total) * 100;
        const leftWinner = leftValue > rightValue;
        const rightWinner = rightValue > leftValue;

        const row = vsMetrics.querySelector(`[data-key="${key}"]`);
        if (!row) return;

        const scoreLeft = row.querySelector(".vs-score-left");
        const scoreRight = row.querySelector(".vs-score-right");
        const fillLeft = row.querySelector(".vs-fill-left");
        const fillRight = row.querySelector(".vs-fill-right");

        scoreLeft.textContent = leftValue.toFixed(1);
        scoreLeft.className = `vs-score vs-score-left${leftWinner ? " is-winner" : ""}`;
        scoreLeft.style.color = leftWinner ? left.color : "";
        scoreRight.textContent = rightValue.toFixed(1);
        scoreRight.className = `vs-score vs-score-right${rightWinner ? " is-winner" : ""}`;
        scoreRight.style.color = rightWinner ? right.color : "";

        fillLeft.style.background = left.color;
        fillRight.style.background = right.color;
        if (isFirstRender) {
            requestAnimationFrame(() => {
                fillLeft.style.width = `${leftWidth}%`;
                fillRight.style.width = `${rightWidth}%`;
            });
        } else {
            fillLeft.style.width = `${leftWidth}%`;
            fillRight.style.width = `${rightWidth}%`;
        }
    });
};

const createSeededRandom = (seed) => {
    let value = seed % 2147483647;
    if (value <= 0) {
        value += 2147483646;
    }
    return () => {
        value = (value * 16807) % 2147483647;
        return (value - 1) /2147483646;
    };
};

const shuffleWithRandom = (items, random) => {
    const list = [...items];
    for (let index = list.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(random() * (index + 1));
        [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
    }
    return list;
};

const selectPuzzleWords = (dayIndex) => {
    const offset = (dayIndex * 3) % puzzleWordPool.length;
    const ordered = [];
    for (let index = 0; index < puzzleWordPool.length; index += 1) {
        ordered.push(puzzleWordPool[(offset + index) % puzzleWordPool.length]);
    }

    const selected = [];
    let totalLength = 0;
    ordered.forEach((word) => {
        if (selected.length === 3) {
            return;
        }
        if (totalLength + word.length <= 32) {
            selected.push(word);
            totalLength += word.length;
        }
    });

    return selected;
};

const getNeighbors = (index) => {
    const neighbors = [];
    const row = Math.floor(index /puzzleState.columns);
    const column = index % puzzleState.columns;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
            if (rowOffset === 0 && columnOffset === 0) {
                continue;
            }
            const nextRow = row + rowOffset;
            const nextColumn = column + columnOffset;
            if (nextRow < 0 || nextRow >= puzzleState.rows || nextColumn < 0 || nextColumn >= puzzleState.columns) {
                continue;
            }
            neighbors.push(nextRow * puzzleState.columns + nextColumn);
        }
    }

    return neighbors;
};

const placeWordPath = (word, occupied, random) => {
    const allCells = shuffleWithRandom(
        Array.from({ length: puzzleState.columns * puzzleState.rows }, (_, index) => index),
        random
    );

    const tryPath = (path, depth) => {
        if (depth === word.length) {
            return path;
        }

        const currentIndex = path[path.length - 1];
        const candidates = shuffleWithRandom(getNeighbors(currentIndex), random).filter((neighbor) => {
            return !occupied.has(neighbor) && !path.includes(neighbor);
        });

        for (const candidate of candidates) {
            const result = tryPath([...path, candidate], depth + 1);
            if (result) {
                return result;
            }
        }
        return null;
    };

    for (const startIndex of allCells) {
        if (occupied.has(startIndex)) {
            continue;
        }
        const result = tryPath([startIndex], 1);
        if (result) {
            return result;
        }
    }
    return null;
};

const countWordOccurrences = (board, word, limit = 2) => {
    const matches = [];
    const boardSize = puzzleState.columns * puzzleState.rows;

    const search = (cellIndex, depth, path) => {
        if (matches.length >= limit) {
            return;
        }

        if (board[cellIndex] !== word[depth]) {
            return;
        }

        const nextPath = [...path, cellIndex];
        if (depth === word.length - 1) {
            matches.push(nextPath);
            return;
        }

        const neighbors = getNeighbors(cellIndex);
        neighbors.forEach((neighbor) => {
            if (nextPath.includes(neighbor)) {
                return;
            }
            search(neighbor, depth + 1, nextPath);
        });
    };

    for (let index = 0; index < boardSize; index += 1) {
        if (board[index] !== word[0]) {
            continue;
        }
        search(index, 0, []);
        if (matches.length >= limit) {
            break;
        }
    }

    return matches.length;
};

const createPuzzleAttempt = (selectedWords, seedNumber) => {
    const random = createSeededRandom(seedNumber);
    const placedWords = [];
    const occupied = new Set();
    const board = Array.from({ length: puzzleState.columns * puzzleState.rows }, () => "");
    const pathMap = new Map();
    const wordColors = new Map();

    // Always fix LOVE at top-left: OL / EV → O=0,L=1,E=8,V=9  path L→O→V→E = [1,0,9,8]
    const lovePath = [1, 0, 9, 8];
    board[0] = "O"; board[1] = "L"; board[8] = "E"; board[9] = "V";
    lovePath.forEach((idx) => occupied.add(idx));
    pathMap.set("LOVE", lovePath);
    wordColors.set("LOVE", "puzzle-color-love");
    placedWords.push("LOVE");

    for (let wordIndex = 0; wordIndex < selectedWords.length; wordIndex += 1) {
        const word = selectedWords[wordIndex];
        const path = placeWordPath(word, occupied, random);
        if (!path) {
            return null;
        }

        path.forEach((cellIndex, letterIndex) => {
            occupied.add(cellIndex);
            board[cellIndex] = word[letterIndex];
        });
        pathMap.set(word, path);
        wordColors.set(word, puzzleColorClasses[wordIndex % puzzleColorClasses.length]);
        placedWords.push(word);
    }

    const filler = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    board.forEach((value, index) => {
        if (!value) {
            board[index] = filler[Math.floor(random() * filler.length)];
        }
    });

    const hasUniqueAnswers = selectedWords.every((word) => countWordOccurrences(board, word, 2) === 1);
    if (!hasUniqueAnswers) {
        return null;
    }

    return { board, pathMap, wordColors, placedWords };
};

const buildPuzzleBoard = () => {
    if (!puzzleGrid || !puzzleAnswers) {
        return;
    }

    const seedKey = getKstDateKey().replaceAll("-", "");
    const dayIndex = getPuzzleDayIndex();
    const selectedWords = selectPuzzleWords(dayIndex);
    const baseSeed = Number(seedKey);
    let generatedBoard = null;

    for (let attempt = 0; attempt < 120; attempt += 1) {
        generatedBoard = createPuzzleAttempt(selectedWords, baseSeed + attempt * 9973);
        if (generatedBoard) {
            break;
        }
    }

    if (!generatedBoard) {
        generatedBoard = createPuzzleAttempt(selectedWords, baseSeed + 999999);
    }

    if (!generatedBoard) {
        return;
    }

    puzzleState.words = generatedBoard.placedWords;
    puzzleState.board = generatedBoard.board;
    puzzleState.pathMap = generatedBoard.pathMap;
    puzzleState.wordColors = generatedBoard.wordColors;
    puzzleState.foundWords = new Set();
    puzzleState.selectedCells = [];
    puzzleState.isDragging = false;
    puzzleState.pointerPosition = null;
};

const renderPuzzle = () => {
    if (!puzzleGrid || !puzzleAnswers) {
        return;
    }

    puzzleGrid.innerHTML = "";
    puzzleAnswers.innerHTML = "";

    const loveHintIndices = new Set([0, 1, 8, 9]);
    puzzleState.board.forEach((character, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `puzzle-cell${loveHintIndices.has(index) ? " puzzle-cell-love" : ""}`;
        button.innerText = character;
        button.dataset.index = String(index);
        button.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            startPuzzleSelection(index);
        });
        button.addEventListener("pointerenter", () => {
            extendPuzzleSelection(index);
        });
        puzzleGrid.appendChild(button);
    });

    puzzleState.words.forEach((word) => {
        const chip = document.createElement("div");
        chip.className = `puzzle-answer${word === "LOVE" ? " puzzle-answer-love" : ""}`;
        chip.dataset.word = word;
        chip.innerText = word;
        puzzleAnswers.appendChild(chip);
    });

    updatePuzzleUI();
};

const getPuzzleCellCenter = (index) => {
    if (!puzzleGrid) {
        return null;
    }
    const cell = puzzleGrid.querySelector(`[data-index="${index}"]`);
    if (!cell) {
        return null;
    }
    const gridRect = puzzleGrid.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    return {
        x: cellRect.left - gridRect.left + (cellRect.width /2),
        y: cellRect.top - gridRect.top + (cellRect.height /2)
    };
};

const buildPuzzlePath = (path) => {
    return path
        .map((index, pathIndex) => {
            const point = getPuzzleCellCenter(index);
            if (!point) {
                return "";
            }
            return `${pathIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`;
        })
        .join(" ");
};

const buildPuzzlePathWithPointer = (path, pointerPosition) => {
    const basePath = buildPuzzlePath(path);
    if (!basePath || !pointerPosition) {
        return basePath;
    }
    return `${basePath} L ${pointerPosition.x} ${pointerPosition.y}`;
};

const renderPuzzleLines = () => {
    if (!puzzleLines || !puzzleGrid || !puzzleBoard) {
        return;
    }

    const boardRect = puzzleBoard.getBoundingClientRect();
    puzzleLines.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
    puzzleLines.innerHTML = "";

    puzzleState.words.forEach((word) => {
        if (!puzzleState.foundWords.has(word)) {
            return;
        }
        const path = buildPuzzlePath(puzzleState.pathMap.get(word) || []);
        if (!path) {
            return;
        }
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", path);
        pathElement.setAttribute(
            "class",
            `puzzle-line-found ${puzzleState.wordColors.get(word) || ""}`.trim()
        );
        puzzleLines.appendChild(pathElement);
    });

    if (puzzleState.selectedCells.length > 0) {
        const activePath = buildPuzzlePathWithPointer(
            puzzleState.selectedCells,
            puzzleState.pointerPosition
        );
        if (activePath) {
            const activeElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            activeElement.setAttribute("d", activePath);
            activeElement.setAttribute("class", "puzzle-line-active");
            puzzleLines.appendChild(activeElement);
        }
    }
};

const updatePuzzleUI = () => {
    if (!puzzleGrid || !puzzleAnswers) {
        return;
    }

    const selectedSet = new Set(puzzleState.selectedCells);
    const loveFound = puzzleState.foundWords.has("LOVE");
    puzzleGrid.querySelectorAll(".puzzle-cell").forEach((cell) => {
        const index = Number(cell.dataset.index);
        cell.classList.toggle("is-active", selectedSet.has(index));
        cell.classList.toggle("puzzle-cell-love", [0, 1, 8, 9].includes(index) && !loveFound);
        cell.classList.remove(...puzzleColorClasses);

        const foundEntry = Array.from(puzzleState.pathMap.entries()).find(([word, path]) => {
            return puzzleState.foundWords.has(word) && path.includes(index);
        });

        if (foundEntry) {
            cell.classList.add(puzzleState.wordColors.get(foundEntry[0]) || "");
        }
    });

    puzzleAnswers.querySelectorAll(".puzzle-answer").forEach((chip) => {
        const word = chip.dataset.word;
        chip.classList.toggle("is-found", puzzleState.foundWords.has(word));
        chip.classList.remove(...puzzleColorClasses);
        if (puzzleState.foundWords.has(word)) {
            chip.classList.add(puzzleState.wordColors.get(word) || "");
        }
    });

    renderPuzzleLines();
};

const startPuzzleSelection = (index) => {
    puzzleState.isDragging = true;
    puzzleState.selectedCells = [index];
    puzzleState.pointerPosition = getPuzzleCellCenter(index);
    updatePuzzleUI();
};

const extendPuzzleSelection = (index) => {
    if (!puzzleState.isDragging) {
        return;
    }
    const currentPath = puzzleState.selectedCells;
    const lastIndex = currentPath[currentPath.length - 1];

    if (index === lastIndex) {
        return;
    }

    if (currentPath.length > 1 && index === currentPath[currentPath.length - 2]) {
        currentPath.pop();
        updatePuzzleUI();
        return;
    }

    if (currentPath.includes(index)) {
        return;
    }

    if (!getNeighbors(lastIndex).includes(index)) {
        return;
    }

    currentPath.push(index);
    puzzleState.pointerPosition = getPuzzleCellCenter(index);
    updatePuzzleUI();
};

const updatePuzzlePointer = (event) => {
    if (!puzzleState.isDragging || !puzzleGrid) {
        return;
    }

    const gridRect = puzzleGrid.getBoundingClientRect();
    puzzleState.pointerPosition = {
        x: event.clientX - gridRect.left,
        y: event.clientY - gridRect.top
    };
    renderPuzzleLines();
};

const finishPuzzleSelection = () => {
    if (!puzzleState.isDragging) {
        return;
    }

    puzzleState.isDragging = false;
    const selectedWord = puzzleState.selectedCells.map((index) => puzzleState.board[index]).join("");
    const matchedWord = puzzleState.words.find((word) => !puzzleState.foundWords.has(word) && word === selectedWord);

    if (matchedWord) {
        puzzleState.foundWords.add(matchedWord);
        if (puzzleState.foundWords.size === puzzleState.words.length && puzzleCongratsModal) {
            puzzleCongratsModal.classList.add("active");
            puzzleCongratsModal.setAttribute("aria-hidden", "false");
        }
    }

    puzzleState.selectedCells = [];
    puzzleState.pointerPosition = null;
    updatePuzzleUI();
};

const closePuzzleCongratsModal = () => {
    if (!puzzleCongratsModal) {
        return;
    }
    puzzleCongratsModal.classList.remove("active");
    puzzleCongratsModal.setAttribute("aria-hidden", "true");
};

const openPuzzleHelpPanel = () => {
    if (!puzzleHelpPanel) {
        return;
    }
    puzzleHelpPanel.classList.add("active");
    puzzleHelpPanel.setAttribute("aria-hidden", "false");
};

const closePuzzleHelpPanel = () => {
    if (!puzzleHelpPanel) {
        return;
    }
    puzzleHelpPanel.classList.remove("active");
    puzzleHelpPanel.setAttribute("aria-hidden", "true");
};

const getTodayEmojiQuiz = () => {
    const dayIndex = getPuzzleDayIndex();
    return emojiQuizPool[dayIndex % emojiQuizPool.length];
};

const renderEmojiQuiz = () => {
    if (!emojiPrompt || !emojiAnswerInput) {
        return;
    }

    const todayQuiz = getTodayEmojiQuiz();
    emojiPrompt.innerText = todayQuiz.emojis;
    emojiAnswerInput.value = "";
    emojiAnswerInput.placeholder = "그룹 이름을 입력하세요";
    emojiAnswerInput.readOnly = false;
    emojiAnswerInput.classList.remove("is-revealed");
    if (emojiSubmitButton) {
        emojiSubmitButton.style.display = "inline-flex";
    }
};

const revealEmojiAnswer = () => {
    if (!emojiAnswerInput) {
        return;
    }

    const todayQuiz = getTodayEmojiQuiz();
    emojiAnswerInput.value = todayQuiz.answer;
    emojiAnswerInput.readOnly = true;
    emojiAnswerInput.classList.add("is-revealed");
    if (emojiSubmitButton) {
        emojiSubmitButton.style.display = "none";
    }
};

const resetEmojiQuizInput = () => {
    if (!emojiAnswerInput) {
        return;
    }
    emojiAnswerInput.value = "";
    emojiAnswerInput.placeholder = "그룹 이름을 입력하세요";
    emojiAnswerInput.readOnly = false;
    emojiAnswerInput.classList.remove("is-revealed");
    if (emojiSubmitButton) {
        emojiSubmitButton.style.display = "inline-flex";
    }
};

const getPuzzleWordColor = (word) => {
    const colorClass = puzzleState.wordColors.get(word);
    if (colorClass === "puzzle-color-1") {
        return { fill: "#ff8a2b", text: "#ffffff", stroke: "#ff8a2b" };
    }
    if (colorClass === "puzzle-color-2") {
        return { fill: "#0b4cff", text: "#dce7ff", stroke: "#0b4cff" };
    }
    if (colorClass === "puzzle-color-3") {
        return { fill: "#ff52c0", text: "#ffffff", stroke: "#ff52c0" };
    }
    return { fill: "#111111", text: "#ffffff", stroke: "#111111" };
};

const capturePuzzleAsImage = () => {
    if (!puzzleFrame) {
        return;
    }

    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffab40";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#ffffff";
    context.beginPath();
    context.roundRect(36, 36, width - 72, height - 72, 28);
    context.fill();

    context.fillStyle = "#1f0d00";
    context.font = "700 42px Pretendard, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    context.fillText("Word Puzzle", 72, 98);

    context.font = "500 20px Pretendard, sans-serif";
    context.fillStyle = "rgba(31, 13, 0, 0.72)";
    context.fillText("숨어있는 아이돌의 이름을 찾아보세요!", 72, 132);

    const boardX = 72;
    const boardY = 170;
    const boardWidth = width - 144;
    const boardHeight = height - 254;
    const gap = 6;
    const answerGap = 10;
    const answerHeight = 42;
    const answersY = boardY + boardHeight - answerHeight - 4;
    const gridAreaHeight = answersY - boardY - 24;
    const cellSize = Math.min(
        (boardWidth - gap * (puzzleState.columns - 1)) /puzzleState.columns,
        (gridAreaHeight - gap * (puzzleState.rows - 1)) /puzzleState.rows
    );
    const gridWidth = cellSize * puzzleState.columns + gap * (puzzleState.columns - 1);
    const gridX = boardX + (boardWidth - gridWidth) /2;
    const gridY = boardY + 4;

    const getCanvasCellCenter = (cellIndex) => {
        const row = Math.floor(cellIndex /puzzleState.columns);
        const column = cellIndex % puzzleState.columns;
        return {
            x: gridX + column * (cellSize + gap) + cellSize /2,
            y: gridY + row * (cellSize + gap) + cellSize /2
        };
    };

    puzzleState.words.forEach((word) => {
        if (!puzzleState.foundWords.has(word)) {
            return;
        }

        const wordColor = getPuzzleWordColor(word);
        const path = puzzleState.pathMap.get(word) || [];
        if (!path.length) {
            return;
        }

        context.beginPath();
        path.forEach((cellIndex, pathIndex) => {
            const point = getCanvasCellCenter(cellIndex);
            if (pathIndex === 0) {
                context.moveTo(point.x, point.y);
            } else {
                context.lineTo(point.x, point.y);
            }
        });
        context.strokeStyle = wordColor.fill;
        context.lineWidth = 16;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    });

    puzzleState.board.forEach((character, index) => {
        const center = getCanvasCellCenter(index);
        const foundEntry = Array.from(puzzleState.pathMap.entries()).find(([word, path]) => {
            return puzzleState.foundWords.has(word) && path.includes(index);
        });
        const cellColor = foundEntry ? getPuzzleWordColor(foundEntry[0]) : null;

        if (cellColor) {
            context.fillStyle = cellColor.fill;
            context.beginPath();
            context.arc(center.x, center.y, cellSize * 0.46, 0, Math.PI * 2);
            context.fill();
        }

        context.fillStyle = cellColor ? cellColor.text : "#111111";
        context.font = `800 ${Math.floor(cellSize * 0.42)}px Pretendard, sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(character, center.x, center.y);
    });

    context.font = "700 18px Pretendard, sans-serif";
    const answerMetrics = puzzleState.words.map((word) => ({
        word,
        width: Math.max(110, Math.ceil(context.measureText(word).width + 34))
    }));
    const totalAnswerWidth = answerMetrics.reduce((sum, item) => sum + item.width, 0) + answerGap * (answerMetrics.length - 1);
    let chipX = boardX + (boardWidth - totalAnswerWidth) /2;

    answerMetrics.forEach(({ word, width: chipWidth }) => {
        const isFound = puzzleState.foundWords.has(word);
        const chipColor = getPuzzleWordColor(word);
        context.beginPath();
        context.roundRect(chipX, answersY, chipWidth, answerHeight, 999);
        context.fillStyle = isFound ? chipColor.fill : "rgba(255, 255, 255, 0.1)";
        context.fill();
        context.strokeStyle = isFound ? chipColor.stroke : "rgba(0, 0, 0, 0.72)";
        context.lineWidth = 2;
        context.stroke();
        context.fillStyle = isFound ? chipColor.text : "#111111";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(word, chipX + chipWidth /2, answersY + answerHeight /2);
        chipX += chipWidth + answerGap;
    });

    const link = document.createElement("a");
    link.download = `word-puzzle-${getKstDateKey()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
};

if (puzzleGrid) {
    buildPuzzleBoard();
    renderPuzzle();
    window.addEventListener("pointerup", finishPuzzleSelection);
    window.addEventListener("resize", updatePuzzleUI);
    puzzleBoard?.addEventListener("pointermove", updatePuzzlePointer);
}

if (puzzleCaptureButton) {
    puzzleCaptureButton.addEventListener("click", capturePuzzleAsImage);
}

if (puzzleResetButton) {
    puzzleResetButton.addEventListener("click", () => {
        closePuzzleCongratsModal();
        buildPuzzleBoard();
        renderPuzzle();
    });
}

if (puzzleHelpButton) {
    puzzleHelpButton.addEventListener("click", () => {
        if (puzzleHelpPanel?.classList.contains("active")) {
            closePuzzleHelpPanel();
            return;
        }
        openPuzzleHelpPanel();
    });
}

if (puzzleHelpClose) {
    puzzleHelpClose.addEventListener("click", closePuzzleHelpPanel);
}

if (emojiSubmitButton) {
    emojiSubmitButton.addEventListener("click", revealEmojiAnswer);
}

if (emojiAnswerInput) {
    emojiAnswerInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            revealEmojiAnswer();
        }
    });

    emojiAnswerInput.addEventListener("click", () => {
        if (emojiAnswerInput.classList.contains("is-revealed")) {
            resetEmojiQuizInput();
        }
    });
}

populateVsSelects();
renderVsZone();

if (vsSelectLeft) {
    vsSelectLeft.addEventListener("change", renderVsZone);
}

if (vsSelectRight) {
    vsSelectRight.addEventListener("change", renderVsZone);
}

renderEmojiQuiz();

const getYoutubeVideoId = (url) => {
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes("youtu.be")) {
            return parsed.pathname.replace("/", "");
        }
        if (parsed.searchParams.get("v")) {
            return parsed.searchParams.get("v");
        }
        const parts = parsed.pathname.split("/");
        return parts[parts.length - 1] || "";
    } catch {
        return "";
    }
};

let mvPreviewOverlay = null;
let mvPreviewTitle = null;
let mvPreviewFrame = null;

const ensureMvPreview = () => {
    if (mvPreviewOverlay) {
        return;
    }

    mvPreviewOverlay = document.createElement("div");
    mvPreviewOverlay.className = "mv-preview-overlay";
    mvPreviewOverlay.setAttribute("aria-hidden", "true");
    mvPreviewOverlay.innerHTML = `
        <div class="mv-preview-card" role="dialog" aria-modal="true" aria-labelledby="mvPreviewTitle">
            <div class="mv-preview-head">
                <h3 id="mvPreviewTitle">M/V Preview</h3>
                <button class="mv-preview-close" type="button" aria-label="미리보기 닫기">×</button>
            </div>
            <div class="mv-preview-frame" id="mvPreviewFrame"></div>
        </div>
    `;
    document.body.appendChild(mvPreviewOverlay);
    mvPreviewTitle = mvPreviewOverlay.querySelector("#mvPreviewTitle");
    mvPreviewFrame = mvPreviewOverlay.querySelector("#mvPreviewFrame");

    mvPreviewOverlay.addEventListener("click", (event) => {
        if (event.target === mvPreviewOverlay || event.target.closest(".mv-preview-close")) {
            closeMvPreview();
        }
    });
};

const openMvPreview = (videoId, title) => {
    ensureMvPreview();
    if (!mvPreviewOverlay || !mvPreviewFrame || !videoId) {
        return;
    }

    const rawOrigin = window.location.origin;
    const originParam = (rawOrigin && rawOrigin !== "null") ? `&origin=${encodeURIComponent(rawOrigin)}` : "";
    mvPreviewTitle.textContent = title || "M/V Preview";
    mvPreviewFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${originParam}" title="${title || "M/V Preview"}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    mvPreviewOverlay.classList.add("active");
    mvPreviewOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
};

const closeMvPreview = () => {
    if (!mvPreviewOverlay || !mvPreviewFrame) {
        return;
    }
    mvPreviewOverlay.classList.remove("active");
    mvPreviewOverlay.setAttribute("aria-hidden", "true");
    mvPreviewFrame.innerHTML = "";
    document.body.classList.remove("modal-open");
};

if (mvSection) {
    const mvHeading = mvSection.querySelector(".section-head h2");
    const mvDescription = mvSection.querySelector(".section-head p");
    if (mvHeading) {
        mvHeading.textContent = "M/V";
    }
    if (mvDescription) {
        mvDescription.textContent = "썸네일을 클릭하면 영상 미리보기가 열립니다.";
    }
}

renderRanking();

mvThumbs.forEach((thumb) => {
    let href = thumb.getAttribute("href") || "";
    let videoId = getYoutubeVideoId(href);
    const card = thumb.closest(".mv-card");
    const artist = card?.querySelector(".mv-meta strong")?.textContent?.trim() || "";
    const titleNode = card?.querySelector(".mv-meta span");

    if (videoId) {
        thumb.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg')`;
    }

    thumb.addEventListener("click", (event) => {
        event.preventDefault();
        const currentArtist = card?.querySelector(".mv-meta strong")?.textContent?.trim() || "";
        const title = card?.querySelector(".mv-meta span")?.textContent?.trim() || "";
        openMvPreview(videoId, currentArtist && title ? `${currentArtist} - ${title}` : "M/V Preview");
    });
});



