const createElement=(arr)=>{
    const htmlElement =arr.map((el) => `<span class="btn">${el}</span>`);
    return (htmlElement.join(" "))
}

const loadLeasson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
}
loadLeasson()

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
}


const loadLavelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active")
            displaylavelWord(data.data)
        })
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

// {
// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Benevolent",
// "meaning": "দয়ালু",
// "pronunciation": "বেনেভোলেন্ট",
// "level": 6,
// "sentence": "The benevolent man donated food to the poor.",
// "points": 4,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "kind",
// "generous",
// "compassionate"
// ],
// "id": 2
// }
// }
const displayWordDetails = (word) => {
    console.log(word)
    const detailsbox = document.getElementById("details-container")
    detailsbox.innerHTML = ` <div class="">
                 <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i> ${word.pronunciation})</h2>
               </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonam</h2>
                    <div class="">${createElement(word.synonyms)}</div>
                </div>
    
    `
    document.getElementById("word_modal").showModal()
}



const displaylavelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center bg-sky-200 col-span-full py-10 space-y-6 rounded-xl">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>

        </div>
        `
    }


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
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <div class="text-2xl font-medium font-bangla">Meaning / Pronunciation</div>
            <p class="font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি"} </p>
            
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLavelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `

        // apend korbo
        lavelContainer.append(btnDiv)
        
    }
}