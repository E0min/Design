async function getRecentPngFiles() {
    var storageRef = firebase.storage().ref('images/');

    // 파일 목록을 가져옴
    var listResult = await storageRef.listAll();

    // 파일명 중 '.png'로 끝나는 파일만 필터링하고, 파일명을 내림차순으로 정렬
    var pngFiles = listResult.items
        .filter((item) => item.name.endsWith('.png'))
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(0, 3);  // 상위 3개의 파일만 가져옴

    let urlList = [];

    // 최근 3개의 파일 URL을 비동기로 가져옴
    for (const fileRef of pngFiles) {
        const url = await fileRef.getDownloadURL();
        urlList.push(url);
    }

    console.log(urlList);
    const grid = document.querySelector('.grid');
    
    for (let url of urlList) {
        const div = document.createElement('div');
        const image = document.createElement('img');
        image.src = url;
        div.append(image);
        grid.append(div);
    }
}

getRecentPngFiles();


