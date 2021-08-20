function lazyLoadImageHandler () {
  var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
    // https://css-tricks.com/the-complete-guide-to-lazy-loading-images/
  }
}

document.addEventListener("DOMContentLoaded", lazyLoadImageHandler);
document.addEventListener("productCardRendered", lazyLoadImageHandler);
