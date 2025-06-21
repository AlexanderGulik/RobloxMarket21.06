export class CommonService {
  static debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  static scrollToTop = () => {
    const scrollInterval = setInterval(() => {
      if (document.documentElement.scrollTop !== 0) {
        window.scrollBy(0, -100);
      } else {
        clearInterval(scrollInterval);
      }
    }, 12);
  };
}
