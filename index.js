const loadLeasson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}
loadLeasson()
const loadLavelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displaylavelWord(data.data))
}

const displaylavelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""


    // id
    // :106
    // level:2
    // meaning:"ঘুমানো"
    // pronunciation:"স্লিপ"
    // word:"Sleep"


    words.forEach((word) => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">${word.meaning} / ${word.pronunciation} </p>
            <div class="text-2xl font-medium font-bangla">আগ্রহি / ইগার</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card)
    })


}
const displayLesson = (lessons) => {
    // Get the Container and Empty
    const lavelContainer = document.getElementById("leavel-container");
    lavelContainer.innerHTML = '';

    // get into every leasson 

    for (let lesson of lessons) {
        // creat element 
        console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLavelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `

        // apend korbo
        lavelContainer.append(btnDiv)
    }
}