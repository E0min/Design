const sunnyMove = (e) => {
    document.querySelector(".sunny-sun").style.top = `${(e.y / window.innerHeight) * (window.innerHeight * 0.5)}px`;
    document.querySelector(".sunny-sun").style.left = `${(e.x / window.innerWidth) * (window.innerWidth * 0.5)}px`;
}
window.addEventListener("mousemove", sunnyMove);
// document.addEventListener("DOMContentLoaded", () => {
//     const sunCircle = document.querySelector(".sun-circle");
//     const sunnySun = document.querySelector(".sunny-sun");

//     document.addEventListener("mousemove", (event) => {
//         const x = event.clientX;
//         const y = event.clientY;

//         // Move the sunny-sun element
//         sunnySun.style.transform = `translate(${x - 263.5}px, ${y - 263.5}px)`; // 263.5 is half of the SVG's width and height

//         // Calculate shadow offset
//         const rect = sunCircle.getBoundingClientRect();
//         const circleCenterX = rect.left + rect.width / 2;
//         const circleCenterY = rect.top + rect.height / 2;
//         const offsetX = (x - circleCenterX) / 40; // Adjust divisor for sensitivity
//         const offsetY = (y - circleCenterY) / 40; // Adjust divisor for sensitivity

//         // Set the box-shadow
//         sunCircle.style.boxShadow = `inset ${offsetX}px ${offsetY}px 30px rgba(0, 0, 0, 0.5)`;
//     });
// });

const snowClick = (e) => {
    const div = document.createElement("div");
    div.innerText = "♥︎";
    console.log(div);
    div.style.fontSize = `${Math.random() * 8 + 2}rem`; // 랜덤한 크기 생성
    div.style.top = `calc(${e.y}px - 0.5em)`;
    div.style.left = `calc(${e.x}px - 0.5em)`;

    document.querySelector(".snow .footprints").appendChild(div); // 쿼리 셀렉터로 .snow.foot


}
window.addEventListener("click",snowClick );
const rainMove = (e) => {
    document.querySelectorAll(".rainy-mood-holder >div:nth-child(odd)").forEach(odd => odd.style.top = `${e.y / 2}px`);
    document.querySelectorAll(".rainy-mood-holder >div:nth-child(even)").forEach(even => even.style.top = `${-e.y / 2 + 400}px`);




}
window.addEventListener("mousemove",rainMove);
const cloudClick = (e) => {
    const ratios = [1.63, 2.18];
    const div = document.createElement("div");

    const ratio = ratios[Math.floor(Math.random() * ratios.length)];
    const height = window.innerHeight * 0.18;
    const width = height * ratio;
    console.log(e);

    div.className = 'circle';
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.top = `calc(${e.y - height * 0.5}px)`;
    div.style.left = `calc(${e.x - width * 0.5}px)`;


    // 요소 추가 및 애니메이션 제거 후 삭제
    document.querySelector(".cloud-circle").appendChild(div);
    setTimeout(() => {
        const ratios = [1.63, 2.18];
        const div = document.createElement("div");

        const ratio = ratios[Math.floor(Math.random() * ratios.length)];
        const height = window.innerHeight * 0.18;
        const width = height * ratio;

        div.className = 'circle';
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.top = `calc(${e.y - height * 0.2}px)`;
        div.style.left = `calc(${e.x - width * 0.7}px)`;
        document.querySelector(".cloud-circle").appendChild(div);

    }, 500)

};

window.addEventListener("click", cloudClick);


// script.js

