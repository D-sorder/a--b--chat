const btn = document.querySelector(".submit");
const btnSvgBox = document.querySelector(".submit__img");

btn.addEventListener("click", ()=>{
    for (let svg of btnSvgBox.children) {
        svg.classList.toggle("visible");
    }
});