gsap.registerPlugin(ScrollTrigger);

// 選取卡片容器
const triggerBox = document.querySelector(".trigger-box");
const cardWrapper = document.querySelector(".card-wrapper");
const shineLayer = cardWrapper.querySelector(".shine-layer");

// 進場動畫，要用fromTo鎖定開始和結束位置，才不會在渲染完成前就跑完動畫
gsap.fromTo(
  triggerBox,
  {
    y: 20, // 距離拉大一點比較明顯
    opacity: 0,
    rotationX: -45, // 角度大一點比較有 3D 感
  },
  // 2. 設定結束狀態 (要去哪裡)
  {
    y: 0,
    opacity: 1,
    rotationX: 0,
    duration: 1, // 5秒太久了，改 1.5 秒比較剛好
    ease: "power3.out",
    delay: 0.2,
  }
);

//浮動動畫
const wave = gsap.to(triggerBox, {
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  duration: 2,
  y: 5,
});

//翻轉動畫效果
const flipConfig = {
  duration: 0.8,
  ease: "power2.out",
};

//反光光線效果
const playShineEffect = () => {
  gsap.fromTo(
    shineLayer,
    { left: "-100%" },
    {
      left: "200%",
      duration: 2.4,
      repeat: -1,
      repeatDelay: 1.3, //動畫重複播放的中間間隔時間
      ease: "power1.inOut",
      delay: 0.2,
    }
  );
};

//翻面監聽
triggerBox.addEventListener("click", () => {
  wave.pause();
  playShineEffect();

  gsap.to(cardWrapper, {
    rotationY: "+=180",
    scale: 1.1,
    y: 10,
    ...flipConfig,
  });
});

//翻回正面
triggerBox.addEventListener("mouseleave", () => {
  gsap.to(cardWrapper, {
    rotationY: 360,
    scale: 1, // 卡片大小恢復
    duration: 1,

    ...flipConfig,

    onComplete: () => {
      wave.restart(); // 用 resume() 從上次暫停的地方繼續，會比較順
    },
  });
});
