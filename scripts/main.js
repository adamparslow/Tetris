(function() {
    const FRAMES_PER_SEC = 30;

    window.onload = () => {
        let canvas = document.getElementById('gameCanvas');
        let canvasContext = canvas.getContext('2d');

        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);


        setInterval(() => {
        }, 1000/FRAMES_PER_SEC);
    };

    inputSetup();

})();

function inputSetup() {
    document.onkeydown = (evt) => {
        console.log(evt.key);
    };

    document.onkeyup = (evt) => {
        console.log(evt.key);
    };
}