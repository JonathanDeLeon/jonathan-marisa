<template>
  <div id="countdown-wrapper" class="col-transform">
    <div class="title-front" style="">
        <span class="char1"
              style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-3px) translateY(84px) rotate(-48deg);">W</span>
      <span class="char2"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-7px) translateY(64px) rotate(-42deg);">e</span>
      <span class="char3 empty"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-9px) translateY(55px) rotate(-38deg);">&nbsp;</span>
      <span class="char4"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-10px) translateY(45px) rotate(-35deg);">a</span>
      <span class="char5"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-11px) translateY(33px) rotate(-29deg);">r</span>
      <span class="char6"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-10px) translateY(23px) rotate(-24deg);">e</span>
      <span class="char7 empty"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-10px) translateY(17px) rotate(-21deg);">&nbsp;</span>
      <span class="char8"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-8px) translateY(11px) rotate(-17deg);">g</span>
      <span class="char9"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-6px) translateY(5px) rotate(-12deg);">e</span>
      <span class="char10"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-4px) translateY(2px) rotate(-7deg);">t</span>
      <span class="char11"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-1px) translateY(0px) rotate(-2deg);">t</span>
      <span class="char12"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(0px) translateY(0px) rotate(1deg);">i</span>
      <span class="char13"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(3px) translateY(1px) rotate(5deg);">n</span>
      <span class="char14"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(6px) translateY(5px) rotate(11deg);">g</span>
      <span class="char15 empty"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(7px) translateY(8px) rotate(14deg);">&nbsp;</span>
      <span class="char16"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(9px) translateY(14px) rotate(19deg);">m</span>
      <span class="char17"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(10px) translateY(24px) rotate(25deg);">a</span>
      <span class="char18"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(11px) translateY(35px) rotate(30deg);">r</span>
      <span class="char19"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(10px) translateY(48px) rotate(36deg);">r</span>
      <span class="char20"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(8px) translateY(59px) rotate(40deg);">i</span>
      <span class="char21"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(6px) translateY(71px) rotate(44deg);">e</span>
      <span class="char22"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(2px) translateY(87px) rotate(49deg);">d</span>
    </div>
    <div class="logo">
      <img src="/static/media/logo.png" alt="">
    </div>
    <div class="all-title">
      <span class="bombshell">
        Jonathan <span>&amp;</span> Marisa
      </span>
    </div>
    <div class="countdown-title">
      Countdown To Wedding Day
    </div>
    <!-- Countdown -->
    <div id="countdown" class="flip-clock-wrapper">
      <span class="flip-clock-divider days">
        <span class="flip-clock-label">Days</span>
      </span>
      <ul class="flip">
        <li class="flip-clock">
          <div class="inn">{{days[0]}}</div>
        </li>
      </ul>
      <ul class="flip ">
        <li class="flip-clock">
          <div class="inn">{{days[1]}}</div>
        </li>
      </ul>
      <ul class="flip ">
        <li class="flip-clock">
          <div class="inn">{{days[2]}}</div>
        </li>
      </ul>
      <span class="flip-clock-divider hours">
        <span class="flip-clock-label">Hours</span>
        <span class="flip-clock-dot top"></span>
        <span class="flip-clock-dot bottom"></span>
      </span>
      <ul class="flip ">
        <li class="flip-clock">
          <div class="inn">{{hours[0]}}</div>
        </li>
      </ul>
      <ul class="flip ">
        <li class="flip-clock">
          <div class="inn">{{hours[1]}}</div>
        </li>
      </ul>
      <span class="flip-clock-divider minutes">
        <span class="flip-clock-label">Minutes</span>
        <span class="flip-clock-dot top"></span>
        <span class="flip-clock-dot bottom"></span>
      </span>
      <ul class="flip play">
        <li class="flip-clock">
          <div class="inn">{{minutes[0]}}</div>
        </li>
      </ul>
      <ul class="flip play">
        <li class="flip-clock">
          <div class="inn">{{minutes[1]}}</div>
        </li>
      </ul>
      <span class="flip-clock-divider seconds">
        <span class="flip-clock-label">Seconds</span>
        <span class="flip-clock-dot top"></span>
        <span class="flip-clock-dot bottom"></span>
      </span>
      <ul class="flip play">
        <li class="flip-clock">
          <div class="inn">{{seconds[0]}}</div>
        </li>
      </ul>
      <ul class="flip play">
        <li class="flip-clock">
          <div class="inn">{{seconds[1]}}</div>
        </li>
      </ul>
    </div>
    <!-- END Countdown -->
    <div class="title-date">
      6<span>.</span>23<span>.</span>2019
    </div>
    <div class="title-under" style="">
        <span class="char1"
              style="display: inline-block; transition: none 0s ease 0s; transform: translateX(0px) translateY(-24px) rotate(30deg);">S</span>
      <span class="char2"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-1px) translateY(-17px) rotate(25deg);">a</span>
      <span class="char3"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-1px) translateY(-10px) rotate(19deg);">v</span>
      <span class="char4"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-1px) translateY(-5px) rotate(13deg);">e</span>
      <span class="char5 empty"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(-1px) translateY(-2px) rotate(9deg);">&nbsp;</span>
      <span class="char6"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(0px) translateY(-1px) rotate(6deg);">t</span>
      <span class="char7"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(0px) translateY(0px) rotate(0deg);">h</span>
      <span class="char8"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(0px) translateY(0px) rotate(-5deg);">e</span>
      <span class="char9 empty"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(1px) translateY(-2px) rotate(-9deg);">&nbsp;</span>
      <span class="char10"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(1px) translateY(-4px) rotate(-12deg);">d</span>
      <span class="char11"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(1px) translateY(-9px) rotate(-18deg);">a</span>
      <span class="char12"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(1px) translateY(-16px) rotate(-24deg);">t</span>
      <span class="char13"
            style="display: inline-block; transition: none 0s ease 0s; transform: translateX(0px) translateY(-23px) rotate(-29deg);">e</span>
    </div>
  </div>
</template>

<script>
  let interval = null;
  export default {
    props: {
      deadline: {
        type: String
      },
      end: {
        type: String
      },
      stop: {
        type: Boolean
      }
    },
    data() {
      return {
        now: Math.trunc((new Date()).getTime() / 1000),
        date: null,
        diff: 0,
      }
    },
    created() {
      if (!this.deadline && !this.end) {
        throw new Error("Missing props 'deadline' or 'end'");
      }
      let endTime = this.deadline ? this.deadline : this.end;
      this.date = Math.trunc(Date.parse(endTime.replace(/-/g, "/")) / 1000);
      if (!this.date) {
        throw new Error("Invalid props value, correct the 'deadline' or 'end'");
      }
      interval = setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
      }, 1000);
    },
    computed: {
      seconds() {
        let diff = Math.trunc(this.diff) % 60;
        return [Math.floor(diff / 10), Math.floor(diff % 10)]
      },
      minutes() {
        let diff = Math.trunc(this.diff / 60) % 60
        return [Math.floor(diff / 10), Math.floor(diff % 10)]
      },
      hours() {
        let diff = Math.trunc(this.diff / 60 / 60) % 24
        return [Math.floor(diff / 10), Math.floor(diff % 10)]
      },
      days() {
        let diff = Math.trunc(this.diff / 60 / 60 / 24)
        return [Math.floor(diff / 100), Math.floor((diff / 10) % 10), Math.floor(diff % 10)]
      }
    },
    watch: {
      now(value) {
        this.diff = this.date - this.now;
        if (this.diff <= 0 || this.stop) {
          this.diff = 0;
          // Remove interval
          clearInterval(interval);
        }
      }
    },
    destroyed() {
      clearInterval(interval);
    }
  }
</script>
<style>
  .flip-clock-wrapper ul {
    list-style: none;
  }

  .flip-clock-wrapper {
    /*font: normal 11px "Helvetica Neue", Helvetica, sans-serif;*/
    -webkit-user-select: none;
  }

  .flip-clock-wrapper {
    text-align: center;
    position: relative;
    max-width: 461px;
    margin: 25px auto;
  }

  .flip-clock-wrapper:before,
  .flip-clock-wrapper:after {
    content: " "; /* 1 */
    display: table; /* 2 */
  }

  .flip-clock-wrapper:after {
    clear: both;
  }

  /* Skeleton */
  .flip-clock-wrapper ul {
    position: relative;
    float: left;
    width: 40px;
    height: 70px;
    margin: 2px;
    font-size: 80px;
    font-weight: bold;
    line-height: 87px;
    border-radius: 6px;
    background: #000;
  }

  .flip-clock-wrapper ul li {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 71px;
    text-decoration: none !important;
  }

  .flip-clock-wrapper ul li:first-child {
    z-index: 2;
  }

  .flip-clock-wrapper ul li div.inn {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    color: #e2b123;
    color: #ffbcd4;
    text-shadow: 0 1px 2px #000;
    text-align: center;
    background-color: #fff;
    border-radius: 6px;
    font-size: 52px;
  }

  .flip-clock-wrapper ul li div.inn {
    top: 0;
  }

  .flip-clock-wrapper .flip {
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.7);
  }

  .flip-clock-divider {
    float: left;
    display: inline-block;
    position: relative;
    width: 20px;
    height: 100px;
  }

  .flip-clock-divider:first-child {
    width: 0;
  }

  .flip-clock-dot {
    display: block;
    background: #fff;
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    left: 5px;
  }

  .flip-clock-divider .flip-clock-label {
    position: absolute;
    bottom: -0.5em;
    right: -86px;
    color: #e2b123;
    color: #ffbcd4;
    text-shadow: none;
  }

  .flip-clock-divider.hours .flip-clock-label {
    right: -70px;
  }

  .flip-clock-divider.minutes .flip-clock-label {
    right: -75px;
  }

  .flip-clock-divider.seconds .flip-clock-label {
    right: -75px;
  }

  .flip-clock-dot.top {
    top: 20px;
  }

  .flip-clock-dot.bottom {
    bottom: 48px;
  }

  #countdown-wrapper {
    margin-top: 3em;
  }

  .all-title span span {
    color: #e2b123;
    color: #ffbcd4;
  }

  .title-under {
    color: #e2b123;
    color: #ffbcd4;
  }

  .title-front {
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
  }

  .logo img {
    width: 50px;
    margin-top: 35px;
  }

  .all-title {
    color: #fff;
    font-size: 3.5em;
    padding-top: 0px;
    margin: 1.5rem 0;
    display: block;
  }

  /* 2.2. END Block Info Text */

  /* 2.3. Countdown */
  .countdown-title {
    color: #fff;
    font-size: 22px;
    margin-top: 15px;
  }

  .title-date {
    color: #fff;
    font-weight: 800;
    font-size: 22px;
    padding: 10px 0;
  }

  /* 2.3. END Countdown */

  /* 2.4. Swirl Date */
  .title-under {
    font-weight: 800;
    text-transform: uppercase;
    padding: 20px 0 0 0;
  }

  /* 2.4. END Swirl Date */

  /***********************************
              /* 4. RESPONSIVE */
  /***********************************/

  @media only screen and (max-width: 1400px) {
    .flip-clock-wrapper ul {
      margin: 2px;
    }
  }

  @media only screen and (min-width: 991px) {
    .col-transform {
      transition: all 0.6s ease-in-out;
    }
  }

  @media only screen and (max-width: 768px) {
    .all-title {
      font-size: 3.0em;
    }

    .countdown-title {
      font-size: 18px;
    }

    .flip-clock-divider .flip-clock-label {
      bottom: -0.2em;
    }

    .flip-clock-wrapper {
      max-width: 403px;
    }

    .flip-clock-wrapper ul {
      width: 34px;
      height: 55px;
    }

    .flip-clock-wrapper ul li {
      line-height: 60px;
    }

    .flip-clock-wrapper ul li div.inn {
      font-size: 42px;
    }

    .flip-clock-dot.top {
      top: 13px;
    }

    .flip-clock-dot.bottom {
      bottom: 30px;
    }

    .flip-clock-divider {
      height: 80px;
    }
  }

  @media only screen and (max-width: 480px) {

    .flip-clock-wrapper {
      max-width: 291px;
      margin: 20px auto;
    }

    .flip-clock-wrapper ul {
      width: 26px;
      height: 40px;
      margin: 1px;
      padding: 0;
    }

    .flip-clock-wrapper ul li {
      line-height: 39px;
    }

    .flip-clock-wrapper ul li div.inn {
      font-size: 28px;
    }

    .flip-clock-label {
      font-size: 0.8em;
    }

    .flip-clock-divider.days .flip-clock-label {
      right: -61px;
    }

    .flip-clock-divider.hours .flip-clock-label {
      right: -50px;
    }

    .flip-clock-divider.minutes .flip-clock-label {
      right: -58px;
    }

    .flip-clock-divider.seconds .flip-clock-label {
      right: -59px;
    }

    .flip-clock-dot.top {
      top: 13px;
      width: 4px;
      height: 4px;
    }

    .flip-clock-dot.bottom {
      bottom: 30px;
      width: 4px;
      height: 4px;
    }

    .flip-clock-divider {
      width: 13px;
      height: 60px;
    }

    #countdown-wrapper {
      padding-right: 10px;
      padding-left: 10px;
    }

    .all-title {
      font-size: 2.0em;
    }

    .title-front, .title-under {
      font-size: 0.8em;
    }

    .logo img {
      width: 40px;
    }

    .countdown-title {
      font-size: 1em;
    }

    .title-date {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: 345px) {
    .flip-clock-wrapper {
      max-width: 258px;
    }

    .flip-clock-wrapper ul {
      width: 22px;
      height: 35px;
    }

    .flip-clock-wrapper ul li {
      line-height: 39px;
    }

    .flip-clock-wrapper ul li div.inn {
      font-size: 24px;
    }

    .flip-clock-divider.days .flip-clock-label {
      right: -55px;
    }

    .flip-clock-divider.hours .flip-clock-label {
      right: -45px;
    }

    .flip-clock-divider.minutes .flip-clock-label {
      right: -52px;
    }

    .flip-clock-divider.seconds .flip-clock-label {
      right: -52px;
    }

    .flip-clock-dot.top {
      top: 13px;
    }

    .flip-clock-dot.bottom {
      bottom: 24px;
    }

    .flip-clock-divider {
      width: 13px;
      height: 52px;
    }

  }

  /***********************************
              /* 4. END RESPONSIVE */
  /**********************************/
</style>
