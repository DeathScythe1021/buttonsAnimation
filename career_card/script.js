gsap.registerPlugin(ScrollTrigger);

// 選取卡片容器
const cardWrapper = document.querySelector(".card-wrapper");

// 進場動畫
gsap.from(cardWrapper, {
  y: 50,
  opacity: 0,
  rotationX: -20,
  duration: 1.2,
  ease: "power3.out",
  delay: 0.2,
});

//浮動動畫
const wave = gsap.from(cardWrapper, {
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  duration: 5,
  
});

//翻轉動畫效果
const flipConfig = {
  duration: 0.8,
  ease: "power2.out",
};

//翻面監聽
cardWrapper.addEventListener("click", () => {
  wave.pause(); //浮動暫停
  gsap.to(cardWrapper, {
    rotationY: "+=540",
    scale: 1.05, // 🔥 加分題：稍微放大 1.05 倍
    y: 10, // 🔥 加分題：稍微往上浮 10px
    ...flipConfig,
  });
});

//翻回正面
cardWrapper.addEventListener("mouseleave", () => {
  gsap.to(cardWrapper, {
    rotationY: 360, 
    scale: 1, // 卡片大小恢復
    duration:1,

    ...flipConfig,

    onComplete: () => {
            wave.restart(); // 用 resume() 從上次暫停的地方繼續，會比較順
        }
  });
});
