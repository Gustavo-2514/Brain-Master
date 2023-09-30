
const initGameBtn = () => {
    const inputName: HTMLInputElement = document.querySelector('.inputName')
    const select: HTMLSelectElement = document.querySelector('.select')
    inputName.style.borderBottom = '1px solid black'
    select.style.border = '1px solid black'

    if (inputName.value === '') {
        inputName.style.borderBottom = '1px solid red'
        inputName.classList.add('error')
    } else if(select.value === ''){
        select.style.border = '1px solid red'
    } else{
        const values = {playerName:inputName.value, theme:select.value}
        localStorage.setItem('play',JSON.stringify(values))
        window.location.href = 'game.html'
    }

}

const btnInit: HTMLButtonElement = document.querySelector('.initGameBtn')
btnInit.addEventListener('click', initGameBtn)