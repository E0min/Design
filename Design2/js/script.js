//1. HTML DOM 요소 불러오기: 쿼리 셀렉터는 조건에 부합하는 가장 첫번째 요소를 불러온뒤 종료된다.
const links = document.querySelectorAll(".link-tree li");
//2. random position 구하기

const getRandomPosition = (min, max) => {
    return Math.round(Math.random() * (max - min)+ min )

}

for (let i=0;i<links.length;i++){
    links[i].style.top = `${Math.round(Math.random() * (window.innerHeight - 0)+ 0)}px`
    links[i].style.left = `${Math.round(Math.random() * (window.innerWidth - 0)+ 0)}px`
}