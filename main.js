song1="";
song2="";
LeftWristX="";
LeftWristY="";
RightWristX="";
RightWristY="";
scoreLeftWrist=0;
scoreRightWrist=0;
song1_status="";
song2_status="";
function preload(){
song1=loadSound("blinding_lights.mp3");
song2=loadSound("Imagine_dragons.mp3");
}
function setup(){
canvas=createCanvas(500,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose",gotPoses);
}
function gotPoses(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
LeftWristX=results[0].pose.LeftWrist.x;
LeftWristY=results[0].pose.LeftWrist.y;
console.log(LeftWristX, LeftWristY);
RightWristX=results.pose.RightWrist.x;
RightWristY=results[0].pose.RightWrist.y;
console.log(RightWristX, RightWristY);
}
}
function modelLoaded(){
console.log("Posenet Is Intialized");
}
function draw(){
image(video,0,0,500,400);
song1_status=song.isPlaying();
song2_status=song.isPlaying();
fill("red");
stroke("green");
if(scoreRightWrist>0.2){
    circle(RightWristX,RightWristY,20);
song2.stop();
if(song1_status==false){
    song1.play();
    document.getElementById("playing").innerHTML="playing blinding lights by The Weekend";
}
}
if(scoreLeftWrist>0.2){
    circle(LeftWristX,LeftWristY,20);
song1.stop();
if(song2_status==false){
    song2.play();
    document.getElementById("playing").innerHTML="playing Imagine Dragons song";
}
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}