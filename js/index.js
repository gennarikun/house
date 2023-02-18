((d, w) => {
  /**
    ハンバーガーメニュー
  */
  const header = d.querySelector(".js-header");
  const menuTrigger = d.querySelectorAll(".js-menu_trigger");
  // クリックでメニュー表示/非表示・アイコン変更
  for (let i = 0; i < menuTrigger.length; i++) {
    menuTrigger[i].addEventListener('click', () => {
      header.classList.toggle('is-open');
    });
  }

  /**
    スクロールボタン表示・非表示処理
  */
  const scrollTop = d.querySelector('.js-scroll');
  // スクロールでフェードイン・アウト
  w.addEventListener('scroll', () => {
    const scrollY = pageYOffset;
    if (scrollY > 700) {
      scrollTop.classList.add('is-show');
    } else {
      scrollTop.classList.remove('is-show');
    }
  });
    
  /**
    ページ先頭にスムーススクロール
  */
  // イージング関数
  const Ease = {
    easeInOut: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
  }
  // アニメーションの Duration の設定
  const duration = 500;
  w.addEventListener('DOMContentLoaded', function () {
    // スムーススクロールのトリガーを取得
    const smoothScrollTrigger = d.querySelector('.js-scroll');
    // トリガーをクリックした時に実行
    smoothScrollTrigger.addEventListener('click', () => {
      // 現在のスクロール位置を取得（クロスブラウザに対応）
      const currentPostion = d.documentElement.scrollTop || d.body.scrollTop;
      // スクロール先の要素を取得
      const targetElement = d.querySelector('.js-top');
      // スクロール先の要素が存在する場合はスムーススクロールを実行
      if (targetElement) {
        // スクロール先の要素の位置を取得
        const targetPosition = w.pageYOffset + targetElement.getBoundingClientRect().top;
        // スタート時点の時間を取得
        const startTime = performance.now();
        // アニメーションのループを定義
        const loop = function (nowTime) {
          // スタートからの経過時間を取得
          const time = nowTime - startTime;
          // duration を1とした場合の経過時間を計算
          const normalizedTime = time / duration;
          // duration に経過時間が達していない場合はアニメーションを実行
          if (normalizedTime < 1) {
            // 経過時間とイージングに応じてスクロール位置を変更
            w.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
            // アニメーションを継続
            requestAnimationFrame(loop);
          // duration に経過時間が達したら、アニメーションを終了
          } else {
            w.scrollTo(0, targetPosition);
          }
        }
        // アニメーションをスタート
        requestAnimationFrame(loop);
      }
    });
  });
})(document, window);