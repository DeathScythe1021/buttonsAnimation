// CDN置入
gsap.registerPlugin(TextPlugin);

// 變數
const circle = document.querySelector(".circle");



//黑色星星按鈕動畫
const blackStar = gsap.from(".black-star", {
  rotation: "+=360",
  duration: 2,
  repeat: -1,
  paused: true,
});
circle.addEventListener("mouseenter", () => {
  blackStar.play();
});

circle.addEventListener("mouseleave", () => {
  blackStar.pause();
  blackStar.progress(0); //動畫時間線歸0（回到初始位置）
});

//數字動畫
const split1 = new SplitType(".text-1", { types: "chars" });
const split2 = new SplitType(".text-2", { types: "chars" });

// 初始設定：把第二組先藏到下面
gsap.set(split2.chars, { yPercent: 100 });

const tl = gsap.timeline({ 
  repeat: -1, 
  paused: true,
  defaults: { ease: "power2.inOut", duration: 0.8 },
  repeatDelay: 0.5 
});

tl.to(split1.chars, { yPercent: -100, stagger: 0.05 })
  .to(split2.chars, { yPercent: 0, stagger: 0.05 }, "<")
  .set(split1.chars, { yPercent: 100 }) // 瞬間重置第一組
  .to(split2.chars, { yPercent: -100, stagger: 0.05 }, "+=0.5")
  .to(split1.chars, { yPercent: 0, stagger: 0.05 }, "<");

const textContainer = document.querySelector(".text-container");

textContainer.addEventListener("mouseenter", () => {
  tl.play(); // 滑鼠進來：繼續播放
});

textContainer.addEventListener("mouseleave", () => {
tl.pause(); 
 gsap.to(tl, {
    progress: 0,      // 目標：回到起點
    duration: 0.5,    // 花費時間：0.5秒慢慢滑回去
    ease: "power2.out", // 緩動：快->慢，感覺比較自然
    overwrite: true   // 重要：確保不要跟之前的動畫打架
  });
});

//括號動畫
const container = document.querySelector(".bracket-container");
const middleText = container.querySelector(".b-text");

// 文字分割
const textSplit = new SplitType(middleText, { types: 'chars' });
// 隱藏字母
gsap.set(textSplit.chars, { opacity: 0 });

const tl2 = gsap.timeline({ 
  paused: true,
  defaults: { duration: 0.5, ease: "power2.out" }
});

tl2.to(middleText, {
  width: "auto",      // 物理撐開，推動右邊長條
  opacity: 1,         // 文字浮現
  marginLeft: "15px", // 動畫開始時才加入間距
  marginRight: "15px"
});

// 打字動畫
tl2.to(textSplit.chars, {
    
  opacity: 1,
  duration: 0,  // 每個字浮現的時間 (打字通常很快)
  stagger: 0.1,   // 每個字之間的間隔 (打字節奏)
}, "<0.2");

// 綁定滑鼠事件
container.addEventListener("mouseenter", () => tl2.play());
container.addEventListener("mouseleave", () => tl2.reverse());