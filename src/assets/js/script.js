// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  //定義
  const drawerIcon = document.querySelector(".p-drawer__icon");
  const drawer = document.querySelector(".p-drawer");
  const drawerNavItem = document.querySelectorAll('.p-drawer__body a[href^="#"]');
  const headerHeight = document.querySelector("header").offsetHeight;
  const drawerText = document.querySelector(".p-drawer__icon-text span");
  const body = document.querySelector("body");
  const breakpoint = 900;
  let isMenuOpen = false;
  let isMenuOpenAtBreakpoint = false;

  const drawerChangeTextFade = () => {
    if (drawerText.classList.contains("js-open")) {
      drawerText.innerHTML = "menu";
      drawerText.classList.toggle("js-open");
    } else {
      drawerText.innerHTML = "close";
      drawerText.classList.toggle("js-open");
    }
  };

  //メニューを開くアニメーション
  const openMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      drawer.classList.add("js-show");
      drawerIcon.classList.add("js-show");
      drawerChangeTextFade();
      body.style.overflow = "hidden";
    }
  };
  //メニューを閉じるアニメーション
  const closeMenu = () => {
    if (drawer.classList.contains("js-show")) {
      drawer.classList.remove("js-show");
      drawerIcon.classList.remove("js-show");
      drawerChangeTextFade();
      body.style.overflow = "visible";
      isMenuOpen = false;
    }
  };
  //メニューの開閉動作
  const toggleMenu = () => {
    if (!drawer.classList.contains("js-show")) {
      openMenu();
    } else {
      closeMenu();
    }
  };
  //リサイズ処理
  const handleResize = () => {
    const bp = breakpoint;
    const windowWidth = window.innerWidth;
    if (windowWidth > bp && isMenuOpenAtBreakpoint) {
      closeMenu();
    } else if (windowWidth <= bp && drawer.classList.contains("js-show")) {
      isMenuOpenAtBreakpoint = true;
    }
  };
  //メニュー外クリック処理
  const clickOuter = (event) => {
    if (drawer.classList.contains("js-show") && !drawer.contains(event.target) && isMenuOpen) {
      closeMenu();
    } else if (drawer.classList.contains("js-show") && !drawer.contains(event.target)) {
      isMenuOpen = true;
    }
  };
  //該当箇所までスクロール
  const linkScroll = (target) => {
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - headerHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  //アイコン クリック時
  drawerIcon.addEventListener("click", toggleMenu);
  //画面幅リサイズ時
  window.addEventListener("resize", handleResize);
  //メニュー外クリック時
  document.addEventListener("click", clickOuter);
  //ページ内リンクメニュー クリック時
  drawerNavItem.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      const targetItem = document.querySelector(item.getAttribute("href"));
      linkScroll(targetItem);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".p-header");
  const drawerIcon = document.querySelector(".p-drawer__icon");
  const drawerContent = document.querySelector(".p-drawer");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY < lastScrollY) {
      // 上方向へスクロール
      header.classList.remove("js-slide-up");
      drawerIcon.classList.remove("js-slide-up");
      drawerContent.classList.remove("js-slide-up");
    } else {
      // 下方向へスクロール
      header.classList.add("js-slide-up");
      drawerIcon.classList.add("js-slide-up");
      drawerContent.classList.add("js-slide-up");
    }
    lastScrollY = window.scrollY;
  });
});

const banner = document.querySelector(".c-banner");
const bannerCancel = document.querySelector(".c-banner__cancel");
bannerCancel.addEventListener("click", () => {
  banner.classList.add("display-none");
});

// TOPへ戻るボタン
document.addEventListener("DOMContentLoaded", function () {
  let toTopButton = document.querySelector(".c-to-top");

  // スクロールイベントを監視してTo Topボタンを制御
  window.addEventListener("scroll", function () {
    // 現在のスクロール位置を取得
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    let showLength = 0;

    if (mediaQuery.matches) {
      showLength = 300;
    } else {
      showLength = 100;
    }

    // スクロール位置が一定値よりも大きい場合にTo Topボタンを表示、それ以外は非表示にする
    if (scrollPosition > showLength) {
      toTopButton.classList.add("js-show");
    } else {
      toTopButton.classList.remove("js-show");
    }
  });

  // To Topボタンがクリックされたときにページの先頭にスクロールする
  toTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// スムーススクロール
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = item.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = document.querySelector(".p-header__upper").offsetHeight; // headerの高さを取得
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
