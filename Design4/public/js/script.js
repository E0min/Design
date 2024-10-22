// 원을 그리는 함수
function drawCircle(x, y, ctx, radius, fillColor, strokeColor, strokeWidth) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.lineWidth = strokeWidth || 1;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}

// 캔버스 요소 및 컨텍스트 가져오기
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const brushViewer = document.querySelector("#brushViewer");
const viewerCtx = brushViewer.getContext("2d");

// 캔버스 크기 설정
const canvasHolder = document.querySelector(".canvas-holder");
const canvasSize = Math.min(canvasHolder.clientHeight, canvasHolder.clientWidth);
canvas.width = canvasSize;
canvas.height = canvasSize;

const viewerSize = Math.min(brushViewer.clientHeight, brushViewer.clientWidth);
brushViewer.width = viewerSize;
brushViewer.height = viewerSize;

/* 상태 관리 영역 */
// 랜덤 색상 생성
const rnd = Math.floor(Math.random() * 256);
const rndColor = `rgb(${rnd},${rnd},${rnd})`;

// 초기 상태 변수
let brushSize = document.getElementById('brushSize').valueAsNumber;
let selectedColor = document.querySelector('input[name="palette"]:checked')?.value || '#000';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
/* 상태 관리 영역 끝 */

// 캔버스 배경 채우기
ctx.fillStyle = rndColor;
ctx.fillRect(0, 0, canvasSize, canvasSize);
viewerCtx.fillStyle = rndColor;
viewerCtx.fillRect(0, 0, viewerSize, viewerSize);

// 브러쉬 크기 및 팔레트 요소 가져오기
const brushSizeInput = document.getElementById('brushSize');
const paletteInputs = document.querySelectorAll('input[name="palette"]');
const increaseButton = document.querySelector('.plus');
const decreaseButton = document.querySelector('.minus');

// 브러쉬 뷰어 업데이트 함수
const updateBrushViewer = () => {
    brushSize = brushSizeInput.valueAsNumber;
    selectedColor = document.querySelector('input[name="palette"]:checked')?.value || '#000';
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;

    viewerCtx.fillStyle = rndColor;
    viewerCtx.fillRect(0, 0, viewerSize, viewerSize);
    drawCircle(viewerSize / 2, viewerSize / 2, viewerCtx, brushSize / 2, selectedColor);
};

// 초기화
updateBrushViewer();

// 팔레트 변경 시 이벤트 리스너 추가
paletteInputs.forEach((input) => {
    input.addEventListener('change', updateBrushViewer);
});

// 브러쉬 크기 업데이트 함수
const updateBrushSize = (increment) => {
    const minSize = parseInt(brushSizeInput.min) || 1;
    const maxSize = parseInt(brushSizeInput.max) || 100;
    let newSize = brushSize + increment;

    newSize = Math.max(minSize, Math.min(newSize, maxSize));

    brushSizeInput.value = newSize;
    brushSize = newSize;
    ctx.lineWidth = brushSize;
    updateBrushViewer();
};

// 버튼 클릭 이벤트 리스너 추가
increaseButton.addEventListener('click', () => updateBrushSize(5));
decreaseButton.addEventListener('click', () => updateBrushSize(-5));

// 브러쉬 크기 입력 변경 시 이벤트 리스너 추가
brushSizeInput.addEventListener('input', updateBrushViewer);

/*********************************************
 *                캔버스에 그리기
 *********************************************/
ctx.lineCap = 'round'; // 선 끝 모양

// 캔버스 위에서 마우스의 좌표를 가져오는 함수
function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// 마우스 이벤트 핸들러
function handleMouseDown(event) {
    isDrawing = true;
    const coords = getCanvasCoordinates(event);
    lastX = coords.x;
    lastY = coords.y;
}

function handleMouseMove(event) {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(event);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastX = coords.x;
    lastY = coords.y;
}

function handleMouseUp() {
    isDrawing = false;
}

function handleMouseOut() {
    isDrawing = false;
}

// 이벤트 리스너 등록
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseout', handleMouseOut);

const convertCanvasToImage = () =>{
    //캔버스 이미지를 png 파일로 변환
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.download = `${new Date().getTime()}.png`;
    link.href = image;
}

const handleUploadClick = async() => {
    const image = canvas.toDataURL();
    const storageRef = await storage.ref().child(`images/${new Date().getTime()}.png`); //firebaseConfig에 존재하는 storage = firebase.storage(); 를 사용
    console.log(storageRef);

    const res = await storageRef.putString(image,'data_url');
    console.log(res);
    if(res.state==="success"){
        ctx.fillStyle = rndColor;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
}
const submitBtn = document.getElementById('submitImage');
submitBtn.addEventListener('click',handleUploadClick);