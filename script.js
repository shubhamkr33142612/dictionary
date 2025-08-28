const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";   // ditonary api call 
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

 const textHTML = `TripFates <span class="shtextclrorg">India</span><br>
                      <span class="shtextclrblue">New TRIP </span>
                      <span class="shtextclrgreen">Experiance</span>`;
    let i = 0;
    function typeWriter() {
      if (i < textHTML.length) {
        document.getElementById("typewriter").innerHTML += textHTML.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // typing speed
      }
    }
    window.onload = typeWriter;

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                    <p>${data[0]}</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    sound.play();

}


