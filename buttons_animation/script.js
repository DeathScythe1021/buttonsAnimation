// CDN置入
gsap.registerPlugin(TextPlugin);

// 變數
const circle = document.querySelector(".circle");

//黑色星星按鈕動畫
const blackStar=
    gsap.from(
    ".black-star",{
        rotation:"+=360",
        duration:2,
        repeat: -1,
        paused:true
});
circle.addEventListener("mouseenter",()=>{
    blackStar.play();

});

circle.addEventListener("mouseleave",()=>{
    blackStar.pause();
    blackStar.progress(0);//動畫時間線歸0（回到初始位置）
});