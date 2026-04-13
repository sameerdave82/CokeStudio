/*Browser detection script start*/
var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version =
      this.searchVersion(navigator.userAgent) ||
      this.searchVersion(navigator.appVersion) ||
      "Unknown";
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }

    var rv = dataString.indexOf("rv:");
    if (this.versionSearchString === "Trident" && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(
        dataString.substring(index + this.versionSearchString.length + 1)
      );
    }
  },

  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Edge",
      identity: "ms-edge",
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "explorer",
    },
    {
      string: navigator.userAgent,
      subString: "Trident",
      identity: "explorer",
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "firefox",
    },
    {
      string: navigator.userAgent,
      subString: "Opera",
      identity: "opera",
    },
    {
      string: navigator.userAgent,
      subString: "OPR",
      identity: "opera",
    },

    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "chrome",
    },
    {
      string: navigator.userAgent,
      subString: "Safari",
      identity: "safari",
    },
  ],
};

/* Waypoint script*/
$(function () {
  function onScrollInit(items, trigger) {
    items.each(function () {
      var osElement = $(this),
        osAnimationClass = osElement.attr("data-os-animation"),
        osAnimationDelay = osElement.attr("data-os-animation-delay");

      osElement.css({
        "-webkit-animation-delay": osAnimationDelay,
        "-moz-animation-delay": osAnimationDelay,
        "animation-delay": osAnimationDelay,
      });

      var osTrigger = trigger ? trigger : osElement;

      osTrigger.waypoint(
        function () {
          osElement.addClass("animate__animated").addClass(osAnimationClass);
        },
        {
          triggerOnce: true,
          offset: "90%",
        }
      );
    });
  }
  onScrollInit($(".os-animation"));
  onScrollInit($(".staggered-animation"), $(".staggered-animation-container"));
});

$(document).ready(function () {
  //console.log("Hello BB");
  BrowserDetect.init();
  $("body").addClass(
    BrowserDetect.browser + " " + BrowserDetect.browser + BrowserDetect.version
  );

  var homeSlider = document.querySelector(".mySwiper");
  var homeSliderNext = homeSlider
    ? homeSlider.querySelector(".swiper-button-next")
    : null;
  var homeSliderPrev = homeSlider
    ? homeSlider.querySelector(".swiper-button-prev")
    : null;

  var swiper = new Swiper(".mySwiper", {
    centeredSlides: true,
    loop: true,
    speed: 500,
    slidesPerView: 1.1,
    spaceBetween: 40,
    //slideToClickedSlide:true,
    navigation: {
      nextEl: homeSliderNext,
      prevEl: homeSliderPrev,
    },
    breakpoints: {
        640: {
            slidesPerView: 2.5,
        },
        768: {
            slidesPerView: 2.75,
        },
        1080: {
            slidesPerView: 3.25,
        },
        1280: {
            slidesPerView: 3.75,
        },
    },
  });

  var taleSlider = document.querySelector(".taleSwiper");
  var taleSliderWrap = taleSlider ? taleSlider.closest(".tribe-story") : null;
  var taleSliderNext = taleSliderWrap
    ? taleSliderWrap.querySelector(".swiper-button-next")
    : null;
  var taleSliderPrev = taleSliderWrap
    ? taleSliderWrap.querySelector(".swiper-button-prev")
    : null;

  var swiper1 = new Swiper(".taleSwiper", {
    speed: 500,
    slidesPerView: 1,
    navigation: {
      nextEl: taleSliderNext,
      prevEl: taleSliderPrev,
    },
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // }
  });

  var cardSlider = document.querySelector(".cardSwiper");
  if (cardSlider) {
    var cardSliderNext = cardSlider
      ? cardSlider.querySelector(".swiper-button-next")
      : null;
    var cardSliderPrev = cardSlider
      ? cardSlider.querySelector(".swiper-button-prev")
      : null;

    var swiper2 = new Swiper(".cardSwiper", {
      effect: "cards",
      grabCursor: true,
      navigation: {
        nextEl: cardSliderNext,
        prevEl: cardSliderPrev,
      },
    });
  }

  var storyCardModalElement = document.getElementById("storyCardModal");
  if (homeSlider && storyCardModalElement && typeof bootstrap !== "undefined") {
    var storyCardModal = new bootstrap.Modal(storyCardModalElement);
    var storyCardModalBody = document.getElementById("storyCardModalBody");

    function resetModalAudio() {
      if (!storyCardModalBody) {
        return;
      }

      storyCardModalBody.querySelectorAll("audio").forEach(function (audio) {
        audio.pause();
        audio.currentTime = 0;
      });

      storyCardModalBody
        .querySelectorAll(".play-audio")
        .forEach(function (playButton) {
          playButton.classList.remove("push-audio");
        });
    }

    homeSlider.querySelectorAll(".swiper-slide a").forEach(function (cardLink) {
      cardLink.addEventListener("click", function (event) {
        event.preventDefault();

        var modalTarget = cardLink.getAttribute("data-modal-target");
        var modalContent = modalTarget
          ? document.getElementById(modalTarget)
          : null;

        if (modalContent && storyCardModalBody) {
          resetModalAudio();
          storyCardModalBody.innerHTML = modalContent.innerHTML;
          storyCardModal.show();
        }
      });
    });

    if (storyCardModalBody) {
      storyCardModalBody.addEventListener("click", function (event) {
        var playButton = event.target.closest(".play-audio");
        if (!playButton) {
          return;
        }

        event.preventDefault();

        var modalPanel = playButton.closest(".story-card-content") || storyCardModalBody;
        var audio = modalPanel.querySelector("audio");
        if (!audio) {
          return;
        }

        storyCardModalBody.querySelectorAll("audio").forEach(function (item) {
          if (item !== audio) {
            item.pause();
            item.currentTime = 0;
          }
        });

        storyCardModalBody
          .querySelectorAll(".play-audio")
          .forEach(function (button) {
            if (button !== playButton) {
              button.classList.remove("push-audio");
            }
          });

        if (audio.paused) {
          audio.play();
          playButton.classList.add("push-audio");
        } else {
          audio.pause();
          audio.currentTime = 0;
          playButton.classList.remove("push-audio");
        }

        audio.onended = function () {
          playButton.classList.remove("push-audio");
          audio.currentTime = 0;
        };

        audio.onpause = function () {
          if (audio.ended || audio.currentTime === 0) {
            playButton.classList.remove("push-audio");
          }
        };
      });
    }

    storyCardModalElement.addEventListener("hidden.bs.modal", function () {
      resetModalAudio();
    });
  }

  $("#videoModal").on("hidden.bs.modal", function () {
    var iframe = $("#youtubeVideo");
    var src = iframe.attr("src");
    iframe.attr("src", "");  // Remove the src to stop the video
    iframe.attr("src", src); // Restore the src when modal opens again
  }); 

});
