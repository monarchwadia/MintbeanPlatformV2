// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
interface DebounceOptions {
  wait?: number;
}

const debounce = (wait = 500) => {
  let timeout: any = null;

  const stopTimeout = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return (cb: () => void) => {
    stopTimeout();

    timeout = setTimeout(() => {
      stopTimeout();
      cb();
    }, wait);
  };
};

export default debounce;
// export default function debounce(
//   func: (...args: any[]) => any | void,
//   opts: DebounceOptions = {}
// ) {
//   const wait = opts.wait || 1;
//   const immediate = opts.immediate || false;

//   let timeout: any;

//   return function(...args: any[]) {
//     // @ts-ignore
//     const context: any = this;

//     const later = function() {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };

//     const callNow = immediate && !timeout;
//     timeout !== null && clearTimeout(timeout);

//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }
