


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
  delay: 0.2     
});