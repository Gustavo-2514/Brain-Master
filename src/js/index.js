import '../scss/index.scss';
import '../imgs/fullHeart.png';
const apiUrl = 'https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple';
let questionsGlobal = [];
const randomPositionOfQuestions = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
};
const getQuestions = async () => {
    const result = await fetch(apiUrl).then(res => res.json());
    const questions = result.results;
    return questions;
};
const pushInQuestions = async () => {
    const questions = await getQuestions();
    questionsGlobal.push(...questions);
};
const createTitleOfQuestion = (question) => {
    const titleQuestion = document.createElement('h3');
    titleQuestion.innerHTML = question.question;
    return titleQuestion;
};
const createTrueResponse = (question) => {
    const trueResponse = document.createElement('div');
    trueResponse.classList.add('response', `response1`); //alterar depois
    trueResponse.innerHTML = question.correct_answer;
    return trueResponse;
};
const createResponse = (res) => {
    const falseResponse = document.createElement('div');
    falseResponse.classList.add('response');
    falseResponse.innerHTML = res;
    return falseResponse;
};
const createRoundOfQuestions = async () => {
    await pushInQuestions();
    const divQuestions = document.querySelector('.containerQuestions');
    let currentQuestion = questionsGlobal[0];
    let allResponse = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    randomPositionOfQuestions(allResponse);
    const titleQuestion = createTitleOfQuestion(currentQuestion);
    divQuestions.appendChild(titleQuestion);
    allResponse.forEach(res => {
        const response = createResponse(res);
        divQuestions.appendChild(response);
    });
    console.log(questionsGlobal[0].correct_answer);
};
await createRoundOfQuestions();
const currentResponse = (ev) => {
    console.log(ev.target.textContent);
};
const responses = document.querySelectorAll('.response');
responses.forEach(res => {
    res.addEventListener('click', currentResponse);
});
function setImages() {
    let test = document.querySelector('.containerQuestions');
    test.style.backgroundImage = "url('../imgs/brainRemove.png')";
}
setImages();
