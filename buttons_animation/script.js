// CDN置入
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(Draggable) ;



//黑色星星按鈕動畫
const circle = document.querySelector(".circle");

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

//圖片動畫
const imageButton = document.querySelector(".image-button");
const img = document.querySelector(".img");

imageButton.addEventListener("mouseenter", () => {
    // 圖片緩慢推進 
    gsap.to(img, {
        scale: 1.5,        // 放大 1.1 倍即可，太大會暈
        duration: 0.8,     // 時間拉長，製造「呼吸感」
        ease: "power2.out"
    });
    
});

imageButton.addEventListener("mouseleave", () => {
    // 圖片緩慢推進 
    gsap.to(img, {
        scale: 1,        // 放大 1.1 倍即可，太大會暈
        duration: 0.8,     // 時間拉長，製造「呼吸感」
        ease: "power2.out"
    });
    
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

// 撐開空間
tl2.to(middleText, {
  width: "auto",      // 物理撐開，推動右邊長條
  opacity: 1,        
  marginLeft: "15px", // 動畫開始時才加入間距
  marginRight: "15px"
});

// 打字效果
tl2.to(textSplit.chars, {
  opacity: 1,
  duration: 0,  
  stagger: 0.1,   
}, "<0.2");//撐開空間後0.2秒後再執行

// 綁定滑鼠事件
container.addEventListener("mouseenter", () => tl2.play());
container.addEventListener("mouseleave", () => tl2.reverse());


// 漸層長條區塊
const ellipseBox = document.querySelector(".ellipse-box");
const mouseBall = document.querySelector(".mouse-ball");

gsap.set(mouseBall,{xPercent: -50, yPercent: -50});
const xTo = gsap.quickTo(mouseBall, "x", { duration: 0.2, ease: "power2.out" });
const yTo = gsap.quickTo(mouseBall, "y", { duration: 0.2, ease: "power2.out" });

ellipseBox.addEventListener("mousemove", (e) => {
  const direction = ellipseBox.getBoundingClientRect(); // 取得容器在畫面上的位置
  
  // 計算：(滑鼠在視窗的 X) - (容器左邊界在視窗的 X) = 滑鼠在容器內的相對 X
  xTo(e.clientX - direction.left);
  yTo(e.clientY - direction.top);
});

ellipseBox.addEventListener("mouseenter",()=>{
    gsap.to(mouseBall, {  opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
})
ellipseBox.addEventListener("mouseleave",()=>{
    gsap.to(mouseBall, { scale: 1, opacity: 0, duration: 0 });
});

// click按鈕
const clickButton = document.querySelector(".click-button");
const buttonFill = document.querySelector(".button-fill");
const clickText = document.querySelector(".click-text");

gsap.set(buttonFill,{
    scaleY: 0, 
    transformOrigin: "bottom center"
});

clickButton.addEventListener("mouseenter",()=>{
    gsap.to(buttonFill,{
        scaleY: 1, 
        duration: 0.3, 
        ease: "power2.out"
    });
    gsap.to(clickText, { 

        color: "#D9D9D9", 
        duration: 0.3,
        ease: "power2.out"
    });
});

clickButton.addEventListener("mouseleave", () => {
    // 填色層縮回
    gsap.to(buttonFill, { 
        scaleY: 0, 
        duration: 0.3, 
        ease: "power2.out" 
    });
    
    // 文字變回黑色
    gsap.to(clickText, { 
        color: "#000000", 
        duration: 0.3,
        ease: "power2.out"
        
    });

});

clickButton.addEventListener("click",()=>{
    gsap.to(clickButton,{
        scale:1.02,
        duration:0.08,
        ease:"back.out(1.7)",
        yoyo: true,
        repeat: 1
    });
    gsap.fromTo(clickText,
        { letterSpacing: "0px" }, // 假設原本是 0
        { 
            letterSpacing: "6px", // 拉開一點點
            duration: 0.08,        // 時間拉長
            ease: "sine.out",   // 強一點的緩動，會有「滑行」的感覺
            yoyo: true,
            repeat: 1,
            autoRound: false      // ★★★ 關鍵魔法：允許小數點運算，解決卡頓
        }
    );
});




//空心星星按鈕
const StarContainer = document.querySelector(".drag-container");
const dragStar = StarContainer.querySelectorAll(".drag-star"); 
const positions = []; // 先準備空白筆記本記錄位置

// step1. 把「自動排版」變成「手動定位」
// 1-1. 鎖定容器高度
const containerRect = StarContainer.getBoundingClientRect();
StarContainer.style.width = containerRect.width + "px"; 
StarContainer.style.height = containerRect.height + "px";

// 1-2 記錄星星原本位置
dragStar.forEach((item, i) => {
    positions[i] = { x: item.offsetLeft, y: item.offsetTop };
});

// 1-3 變身 Absolute，並統一定位
dragStar.forEach((item, i) => {
    item.style.position = "absolute";
    item.style.top = "0px"; 
    item.style.left = "0px"; // 關鍵優化：大家起點都設為 0
    item.style.margin = "0"; // 拿掉 margin 避免干擾

    gsap.set(item, { x: positions[i].x, y: positions[i].y });
});

// step.2 記錄位移
Draggable.create(dragStar, {
    type: "x,y",  
    bounds: StarContainer, // 修正：直接使用變數 StarContainer
    zIndexBoost: true,     // 拖曳時層級最高
    inertia: true,         // 慣性 (若有引用的話)
    edgeResistance: 0.65,  // 邊緣阻力

    onPress: function() {
        // 記錄：我出發時的 x, y 是多少 (這就是我的家)
        this.startX = this.x;
        this.startY = this.y;
        gsap.to(this.target, {
            scale: 1.1,      // 抓起來時放大到 1.2 倍
            duration: 0.2,   
            cursor: "grabbing"
        });
        
        
    },

    onDragEnd: function() {
        let targetIndex = -1;
        const draggedElement = this.target;

        // 碰撞檢測：問問看有沒有撞到別人

        dragStar.forEach((item, i) => {
            // 如果 (1) 不是我自己 且 (2) 重疊超過 30%
            if (item !== draggedElement && this.hitTest(item, "30%")) {
                targetIndex = i;
            }
        });

        // 判斷結果
        if (targetIndex !== -1) {
            // --- 💥 撞到了！交換位置 ---
            // 修正：items 改為 dragStar
            const hitItem = dragStar[targetIndex];

            // 1. 先讀取「對方」現在的 x, y 數值
            const hitX = gsap.getProperty(hitItem, "x");
            const hitY = gsap.getProperty(hitItem, "y");

            // 2. 把「對方」移到「我原本的起點」
            gsap.to(hitItem, {
                scale: 1,
                x: this.startX,
                y: this.startY,
                duration: 0.1,
                ease: "back.out(1.7)",
              
            
                
            });

            // 3. 把「我」移到「對方的位置」
            gsap.to(draggedElement, {
                scale: 1,
                x: hitX,
                y: hitY,
                duration: 0.1,
                ease: "back.out(1.7)",
                
            });

        } else {
            // --- 沒撞到，回到原處 ---
            gsap.to(draggedElement, {
                scale: 1,
                x: this.startX,
                y: this.startY,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }
});