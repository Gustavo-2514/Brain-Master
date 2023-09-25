// import AOS from '../../node_modules/aos/dist/aos.js'
import 'aos/dist/aos.css';
import '../scss/index.scss';
import '../imgs/fullHeart.png';
import { questionsGame } from './questionsGame';
// AOS.init()
const containerQuestions = document.querySelector('.containerQuestions');
let currentQuestionsTheme = questionsGame;
let tenQuestions = [];
let numberCurrentQuestion = 0;
let correctAnswers = 0;
const randomPositionAnswers = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
    return array;
};
const randomQuestionsRound = (currentQuestionsTheme) => {
    // sorteia 10 questões de um tema escolhido e adiciona no array
    for (let i = 0; i < 10; i++) {
        const numberRandom = Math.floor(Math.random() * currentQuestionsTheme.length);
        //antes de adicionar verifica se a questão já foi adicionada
        if (tenQuestions.find(ques => ques.id === currentQuestionsTheme[numberRandom].id)) {
            i--; // se escontrar uma questão igual diminui 1 no loop, para que não retorne menos de 10 questões
        }
        else {
            tenQuestions.push(currentQuestionsTheme[numberRandom]);
        }
    }
    return tenQuestions;
};
const createTitle = (questionTitle) => {
    const quesTitle = document.createElement('h3');
    quesTitle.classList.add('questionTitle');
    quesTitle.innerText = questionTitle;
    return quesTitle;
};
const createAnswer = (Answer) => {
    const answer = document.createElement('div');
    answer.classList.add('answer');
    answer.innerText = Answer;
    answer.addEventListener('click', clickAnswer);
    return answer;
};
const verifyProgress = () => {
    const progress = document.querySelector('.progressWidth');
    switch (numberCurrentQuestion) {
        case 0:
            break;
        case 1:
            progress.style.width = '10%';
            progress.textContent = '10%';
            break;
        case 2:
            progress.style.width = '20%';
            progress.textContent = '20%';
            break;
        case 3:
            progress.style.width = '30%';
            progress.textContent = '30%';
            break;
        case 4:
            progress.style.width = '40%';
            progress.textContent = '40%';
            break;
        case 5:
            progress.style.width = '50%';
            progress.textContent = '50%';
            break;
        case 6:
            progress.style.width = '60%';
            progress.textContent = '60%';
            break;
        case 7:
            progress.style.width = '70%';
            progress.textContent = '70%';
            break;
        case 8:
            progress.style.width = '80%';
            progress.textContent = '80%';
            break;
        case 9:
            progress.style.width = '90%';
            progress.textContent = '90%';
            break;
        default:
            progress.style.width = '100%';
            progress.textContent = '100%';
    }
};
const clickAnswer = (ev) => {
    const Answer = ev.target;
    if (Answer.innerText === tenQuestions[numberCurrentQuestion].correct_answer) {
        correctAnswers++;
        Answer.style.backgroundColor = 'green';
        createNextBtn();
    }
    else {
        Answer.style.backgroundColor = 'red';
        createNextBtn();
    }
    numberCurrentQuestion++;
    const Answers = document.querySelectorAll('.answer');
    Answers.forEach(answer => {
        answer.removeEventListener('click', clickAnswer);
    });
    verifyProgress();
    Answer.removeEventListener('click', clickAnswer);
};
const createNextBtn = () => {
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('nextBtn', 'btn', 'btn-outline-light');
    nextBtn.innerText = 'Proxima Pergunta';
    containerQuestions.appendChild(nextBtn);
    nextBtn.addEventListener('click', () => {
        document.querySelector('.questionTitle').remove();
        document.querySelectorAll('.answer').forEach(answer => {
            answer.remove();
        });
        document.querySelector('.nextBtn').remove();
        createRoundOfQuestions(tenQuestions[numberCurrentQuestion]);
    });
};
const createRoundOfQuestions = (question) => {
    const titleAnswer = createTitle(question.question);
    containerQuestions.appendChild(titleAnswer);
    const allAnswer = [question.correct_answer, ...question.incorrect_answers];
    randomPositionAnswers(allAnswer);
    let answerIndex = 0;
    const interval = setInterval(() => {
        if (answerIndex < allAnswer.length) {
            const answer = createAnswer(allAnswer[answerIndex]);
            containerQuestions.appendChild(answer);
            answerIndex++;
        }
        else {
            clearInterval(interval);
        }
    }, 700);
};
function setImages() {
    let test = document.querySelector('.containerQuestions');
    test.style.backgroundImage = "url('../imgs/brainRemove.png')";
}
const initGame = () => {
    let tenQuestions = randomQuestionsRound(currentQuestionsTheme);
    console.log(tenQuestions);
    createRoundOfQuestions(tenQuestions[numberCurrentQuestion]);
    setImages();
};
document.addEventListener('DOMContentLoaded', initGame);
