import AOS, { init } from 'aos';
import Typed from 'typed.js'
import 'aos/dist/aos.css';
import '../scss/style.scss'
import '../imgs/logoMain.png'
import '../imgs/brainPink.png'
import { questionsGame } from './questionsGame'
import { questionsSports } from './questionsSport';
import { questionsTechnology } from './questionsTechnology';
import { questionsGeography } from './questionsGeography';
AOS.init()
const containerQuestions = document.querySelector('.containerQuestions')

// const apiUrl: string = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&lang=pt'
export interface Question {
    id: number,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
}

interface Values {
    playerName: string,
    theme: string
}

let currentQuestionsTheme: Question[] = []
let tenQuestions: Question[] = []
let numberCurrentQuestion: number = 0
let correctAnswers: number = 0

const getValuesToInitGame = () => {
    const values: Values = JSON.parse(localStorage.getItem('play'))
    const theme = document.querySelector('.theme')
    if (values.theme === 'jogos') {
        currentQuestionsTheme = questionsGame
        theme.textContent = 'Jogos'
    } else if (values.theme === 'esporte') {
        currentQuestionsTheme = questionsSports
        theme.textContent = 'Esporte'
    } else if (values.theme === 'tecnologia') {
        currentQuestionsTheme = questionsTechnology
        theme.textContent = 'Tecnologia'
    } else if (values.theme === 'geografia') {
        currentQuestionsTheme = questionsGeography
        theme.textContent = 'Geografia'
    }
    const playerName = document.querySelector('.playerName')
    playerName.textContent = values.playerName
}

const randomPositionAnswers = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]]
    }
    return array
}

const randomQuestionsRound = (currentQuestionsTheme: Question[]) => {
    // sorteia 10 questões de um tema escolhido e adiciona no array
    for (let i = 0; i < 10; i++) {
        const numberRandom = Math.floor(Math.random() * currentQuestionsTheme.length)
        //antes de adicionar verifica se a questão já foi adicionada
        if (tenQuestions.find(ques => ques.id === currentQuestionsTheme[numberRandom].id)) {
            i-- // se escontrar uma questão igual diminui 1 no loop, para que não retorne menos de 10 questões
        } else {
            tenQuestions.push(currentQuestionsTheme[numberRandom])
        }
    }
    return tenQuestions
}

const removeElements = () => {
    document.querySelector('.questionTitle').remove()
    document.querySelectorAll('#answer').forEach(answer => {
        answer.remove()
    })
    if (numberCurrentQuestion !== 10) {
        document.querySelector('.nextBtn').remove()
        createRoundOfQuestions(tenQuestions[numberCurrentQuestion])
    }
}

const createTitle = (questionTitle: string) => {
    const quesTitle = document.createElement('h3')
    quesTitle.classList.add('questionTitle', 'mb-3', 'text-center')
    new Typed(quesTitle, {
        strings: [questionTitle],
        typeSpeed: 30,
    })
    return quesTitle
}

const createAnswer = (Answer: string) => {
    const answer = document.createElement('div')
    answer.id = 'answer'
    answer.innerText = Answer

    return answer
}

const verifyProgress = () => {
    const progress: HTMLDivElement = document.querySelector('.progressWidth')
    switch (numberCurrentQuestion) {
        case 1:
            progress.style.width = '10%'
            progress.textContent = '10%'
            break
        case 2:
            progress.style.width = '20%'
            progress.textContent = '20%'
            break
        case 3:
            progress.style.width = '30%'
            progress.textContent = '30%'
            break
        case 4:
            progress.style.width = '40%'
            progress.textContent = '40%'
            break
        case 5:
            progress.style.width = '50%'
            progress.textContent = '50%'
            break
        case 6:
            progress.style.width = '60%'
            progress.textContent = '60%'
            break
        case 7:
            progress.style.width = '70%'
            progress.textContent = '70%'
            break
        case 8:
            progress.style.width = '80%'
            progress.textContent = '80%'
            break
        case 9:
            progress.style.width = '90%'
            progress.textContent = '90%'
            break
        default:
            progress.style.width = '100%'
            progress.textContent = '100%'
    }
}

const clickAnswer = (ev) => {
    const Answer = ev.target

    if (Answer.innerText === tenQuestions[numberCurrentQuestion].correct_answer) {
        correctAnswers++
        Answer.style.backgroundColor = 'green'
    } else {
        Answer.style.backgroundColor = 'red'
    }

    if (numberCurrentQuestion === 9) {
        window.onbeforeunload = null
        numberCurrentQuestion++
        setTimeout(() => {
            removeElements()
            const corrAnswer = document.createElement('h2')
            corrAnswer.classList.add('mt-5', 'p-4')
            new Typed(corrAnswer, {
                strings: [`Você acertou ${correctAnswers} de 10!`],
                typeSpeed: 35
            })
            corrAnswer.innerText = `Você acertou ${correctAnswers} de 10!`
            const replay = document.createElement('button')
            replay.textContent = 'Jogar Novamente'
            replay.classList.add('btn', 'btn-outline-light', 'mb-2', 'btn-lg')
            replay.addEventListener('click', () => {
                location.reload()
            })

            const initMenu = document.createElement('button')
            initMenu.textContent = 'Voltar a tela inicial'
            initMenu.classList.add('btn', 'btn-outline-light', 'btn-lg')
            initMenu.addEventListener('click', () => {
                location.href = 'index.html'
            })

            containerQuestions.append(corrAnswer, replay, initMenu)
        }, 1200);
    } else {
        createNextBtn()
        numberCurrentQuestion++
        const Answers = document.querySelectorAll('#answer')
        Answers.forEach(answer => {
            answer.removeEventListener('click', clickAnswer)
        })
        Answer.removeEventListener('click', clickAnswer)
    }
    verifyProgress()
}

const createNextBtn = () => {
    const nextBtn = document.createElement('button')
    nextBtn.classList.add('nextBtn', 'btn', 'btn-outline-light')
    nextBtn.innerText = 'Proxima Pergunta'
    containerQuestions.appendChild(nextBtn)

    nextBtn.addEventListener('click', () => {
        document.querySelector('.questionTitle').remove()
        document.querySelectorAll('#answer').forEach(answer => {
            answer.remove()
        })
        document.querySelector('.nextBtn').remove()
        createRoundOfQuestions(tenQuestions[numberCurrentQuestion])
    })
}

const createRoundOfQuestions = (question: Question) => {
    setTimeout(() => {
        const titleAnswer = createTitle(question.question)
        containerQuestions.appendChild(titleAnswer)
        const allAnswer: string[] = [question.correct_answer, ...question.incorrect_answers]
        randomPositionAnswers(allAnswer)

        let answerIndex = 0
        setTimeout(() => {
            const interval = setInterval(() => {
                if (answerIndex < allAnswer.length) {
                    const answer = createAnswer(allAnswer[answerIndex])
                    switch (answerIndex) {
                        case 0:
                            answer.dataset.aos = 'fade-down'
                            containerQuestions.appendChild(answer)
                            break
                        case 1:
                            answer.dataset.aos = 'fade-up-right'
                            containerQuestions.appendChild(answer)
                            break
                        case 2:
                            answer.dataset.aos = 'fade-up-left'
                            containerQuestions.appendChild(answer)
                            break
                        case 3:
                            answer.dataset.aos = 'fade-up';
                            containerQuestions.appendChild(answer)
                            const containerQuestionsHeight: HTMLDivElement = document.querySelector('.containerQuestions')
                            // containerQuestionsHeight.style.height = 'auto'
                            const responses = document.querySelectorAll('#answer');
                            responses.forEach(res => {
                                res.addEventListener('click', clickAnswer);
                            });
                            break
                    }
                    answerIndex++
                } else {
                    clearInterval(interval)
                }
            }, 700)
        }, 2800)
    }, 1500)
}

function setImages() {
    let test: HTMLDivElement = document.querySelector('.containerQuestions')
    test.style.backgroundImage = "url('../imgs/brainPink.png')"
}

const initGame = () => {
    window.onbeforeunload = () => {
        return ''
    }
    getValuesToInitGame()
    let tenQuestions = randomQuestionsRound(currentQuestionsTheme)
    createRoundOfQuestions(tenQuestions[numberCurrentQuestion])
    setImages()
}

document.addEventListener('DOMContentLoaded', initGame)