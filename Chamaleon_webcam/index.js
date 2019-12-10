const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');  //CanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.
const video = document.querySelector('.player')
const refreshRate = 1000;

function getVideo() {
  console.log('get video')
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(webCam => {
      video.srcObject = webCam; //feeds the webcam image to the video object
      paintToCanvas();
    })
    .catch(err => {
      console.error('se requiere acceso a la webcam.', err)
    })
}

function paintToCanvas() {
  canvas.width = 1;
  canvas.height = 1;

  setInterval(updateColour, refreshRate);
}

function updateColour() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height); // lee el data image de 0,0 a el ancho/alto total del canvas
    console.log('imagedata', imageData.data)
    
    let r = imageData.data[0];
    let g = imageData.data[1];
    let b = imageData.data[2];

    let rgb = `rgb(${r}, ${g}, ${b})`

    let root = document.documentElement;

    root.style.setProperty('--colour-change', rgb); //se lo asigna a el elemento root en la hoja y cambia para todos los elementos que tengan este attribute en su css
}

window.addEventListener('load', getVideo);










 


  