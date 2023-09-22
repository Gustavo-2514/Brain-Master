import '../scss/index.scss'
import '../imgs/fullHeart.png'

const apiUrl: string = 'https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple'

interface Question {
    category: string,
    question:string,
    correct_answer:string,
    difficulty: string,
    incorrect_answers:string[],
}

let questionsGlobal:Question[] = []


const randomPositionOfQuestions = (array:string[])=>{
    for(let i = array.length - 1; i > 0; i--){
        let r = Math.floor(Math.random() * (i+1));
        [array[i], array[r]] = [array[r],array[i]]
    }
}

const getQuestions = async () => {
    const result = await fetch(apiUrl).then(res => res.json())
    const questions:Question[] = result.results
    return questions
}

const pushInQuestions = async ()=>{
    const questions:Question[] = await getQuestions()
    questionsGlobal.push(...questions)
}

const createTitleOfQuestion = (question:Question)=>{
    const titleQuestion = document.createElement('h3')
    titleQuestion.innerHTML = question.question
    return titleQuestion
}

const createTrueResponse = (question:Question)=>{
    const trueResponse = document.createElement('div')
    trueResponse.classList.add('response',`response1`) //alterar depois
    trueResponse.innerHTML = question.correct_answer
    return trueResponse
}

const createResponse = (res:string)=>{
    const falseResponse = document.createElement('div')
    falseResponse.classList.add('response')
    falseResponse.innerHTML = res
    return falseResponse
}

const createNextBtn = ()=>{
    const btn = document.createElement('button')
    btn.classList.add('btn','btn-outline-light','nextBtn')
    btn.textContent = 'Proxima pergunta'
    return btn
}

const createRoundOfQuestions = async (number:number)=>{
    await pushInQuestions()
    const divQuestions = document.querySelector('.containerQuestions')
    let currentQuestion:Question = questionsGlobal[number]

    let allResponse = [currentQuestion.correct_answer,...currentQuestion.incorrect_answers]
    randomPositionOfQuestions(allResponse)

    const titleQuestion = createTitleOfQuestion(currentQuestion)
    divQuestions.appendChild(titleQuestion)
    allResponse.forEach(res=>{
        const response = createResponse(res)
        divQuestions.appendChild(response)
    })

    console.log(questionsGlobal[0].correct_answer)
}

await createRoundOfQuestions(0)


const currentResponse = (ev)=>{
    let correct:number = 0 

    const responseClick:HTMLDivElement = ev.target

    if(responseClick.textContent === questionsGlobal[0].correct_answer){
        correct++
        responseClick.style.backgroundColor = 'green'
        const btn = createNextBtn()
        const divQuestions = document.querySelector('.containerQuestions')
        divQuestions.appendChild(btn)
        createRoundOfQuestions(1)

    }
    else{
        responseClick.style.backgroundColor = 'red'
        const btn = createNextBtn()
        const divQuestions = document.querySelector('.containerQuestions')
        divQuestions.appendChild(btn)
    }
} 

const responses:NodeListOf<HTMLDListElement> = document.querySelectorAll('.response')
responses.forEach(res=>{
    res.addEventListener('click',currentResponse)
})


function setImages() {
    let test: HTMLDivElement = document.querySelector('.containerQuestions')
    test.style.backgroundImage = "url('../imgs/brainRemove.png')"
}

setImages()