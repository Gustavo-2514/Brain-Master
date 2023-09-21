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

const createFalseResponse = (falseRes:string)=>{
    const falseResponse = document.createElement('div')
    falseResponse.classList.add('response')
    falseResponse.innerHTML = falseRes
    return falseResponse
}

const createRoundOfQuestions = async ()=>{
    await pushInQuestions()
    
    const divQuestions = document.querySelector('.containerQuestions')
    // um for aqui



    const titleQuestion = createTitleOfQuestion(questionsGlobal[0])
    divQuestions.appendChild(titleQuestion)


    let randomPosition = Math.floor(Math.random() *2)
    

    if(randomPosition === 0){
        
        const teste = questionsGlobal[0].incorrect_answers.forEach(falseRes=>{
            const falseResponse = createFalseResponse(falseRes)
            divQuestions.appendChild(falseResponse)
        })

        const trueResponse = createTrueResponse(questionsGlobal[0])
        divQuestions.appendChild(trueResponse)
        
    }
    else {
        const trueResponse = createTrueResponse(questionsGlobal[0])
        divQuestions.appendChild(trueResponse)

        const teste = questionsGlobal[0].incorrect_answers.forEach(falseRes=>{
            const falseResponse = createFalseResponse(falseRes)
            divQuestions.appendChild(falseResponse)
        })
    }

    console.log(questionsGlobal[0].correct_answer)
    
}



createRoundOfQuestions()


let test:HTMLDivElement = document.querySelector('.containerQuestions')
test.style.backgroundImage = "url('../imgs/brainRemove.png')"