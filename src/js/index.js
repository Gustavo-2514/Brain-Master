import '../scss/index.scss';
import '../imgs/fullHeart.png';
import { questionsGame } from './questionsGame';
const containerQuestions = document.querySelector('.containerQuestions');
let questionsGlobal = [];
let currentQuestionGlobal = 0;
const randomPositionsArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
};
const createTitle = (questionTitle) => {
    const quesTitle = document.createElement('h3');
    quesTitle.classList.add('questionTitle');
    quesTitle.innerText = questionTitle;
    return quesTitle;
};
const createResponse = (response) => {
    const res = document.createElement('div');
    res.classList.add('response');
    res.innerText = response;
    res.addEventListener('click', clickResponse);
    return res;
};
const clickResponse = (ev) => {
    const response = ev.target;
    if (response.innerText === questionsGame[currentQuestionGlobal].correct_answer) {
        response.style.backgroundColor = 'green';
        createNextBtn();
    }
    else {
        response.style.backgroundColor = 'red';
        console.log('erro');
        createNextBtn();
    }
    currentQuestionGlobal++;
    console.log(currentQuestionGlobal);
    const responses = document.querySelectorAll('.response');
    responses.forEach(res => {
        res.removeEventListener('click', clickResponse);
    });
    response.removeEventListener('click', clickResponse);
};
const createNextBtn = () => {
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('nextBtn', 'btn', 'btn-outline-light');
    nextBtn.innerText = 'Proxima Pergunta';
    containerQuestions.appendChild(nextBtn);
    nextBtn.addEventListener('click', () => {
        document.querySelector('.questionTitle').remove();
        document.querySelectorAll('.response').forEach(res => {
            res.remove();
        });
        document.querySelector('.nextBtn').remove();
        createRoundOfQuestions(questionsGame[currentQuestionGlobal]);
    });
};
const createRoundOfQuestions = (question) => {
    console.log(currentQuestionGlobal);
    const titleResponse = createTitle(question.question);
    containerQuestions.appendChild(titleResponse);
    const allResponse = [question.correct_answer, ...question.incorrect_answers];
    randomPositionsArray(allResponse);
    allResponse.forEach(res => {
        const response = createResponse(res);
        containerQuestions.appendChild(response);
    });
};
createRoundOfQuestions(questionsGame[currentQuestionGlobal]);
function setImages() {
    let test = document.querySelector('.containerQuestions');
    test.style.backgroundImage = "url('../imgs/brainRemove.png')";
}
setImages();
