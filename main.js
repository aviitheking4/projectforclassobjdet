img=""
statusobjdet=""
objects=[];
function preload() {
    img=loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(640, 440);
    canvas.center()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("stats").innerHTML = "Status : detecting objects";
}

function draw() {
    image(img, 0,0,640,440);

    if(statusobjdet !="")
    {
        for (i = 0; i < objects.length; i++ ){
            document.getElementById("stats").innerHTML = "Status : Object Detected";
            
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" , objects[i].x + 15, objects[1].y + 15 )
            noFill();
            stroke("cyan")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function modelLoaded() {
    console.log("model loaded")
    statusobjdet = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error , results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
