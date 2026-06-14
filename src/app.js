import debounce from 'debounce';

const URL = "https://pixabay.com/api/";
const API_KEY = "55978703-bb79675f7d797a559cd8adf58";

let currentPage = 1;
let search = "";

const limit = 9;

const inputEl = document.querySelector(".input");
const listEl = document.querySelector(".list");
const btnEl = document.querySelector(".btn");

function getImgApi() {
    return fetch(`${URL}?key=${API_KEY}&q=${search}&page=${currentPage}&per_page=${limit}`)
           .then(res => res.json());
}

function render() {
    getImgApi().then((res) => {
        console.log(res.totalHits);
        console.log(currentPage * limit);

        if (currentPage * limit >= res.totalHits) {
            btnEl.disabled = true;
            btnEl.classList.add("disabled-btn");
            btnEl.textContent = "Фотографії закінчились";
        }

        createImg(res.hits);
    });
}



function createImg(arr) {
    const img = arr.map((el) => {
        return `<li class="item">
                    <img src="${el.largeImageURL}" alt="${el.tags}" class="images">
                </li>`
    }).join("");

    listEl.insertAdjacentHTML("beforeend", img);
}

btnEl.addEventListener("click", () => {
    currentPage += 1;
    render()
})


inputEl.addEventListener("input", debounce((e) => {
    search = e.target.value.trim();

    currentPage = 1;
    listEl.innerHTML = "";
    
    if (search.length) {
        btnEl.style.display = "block";
    }
        
    render()
}, 500))


btnEl.style.display = "none";