$(function() {

  var data = ['AAA', 'BBB', 'CCC'];
  var subcat = {
    'AAA': ['a1', 'a2', 'a3'],
    'CCC': ['c1', 'c2']
  };

  var main_scroller = $('#scroll');
  var subcat_scroller  = $('#scroll_sub');

  var once = 2601;
  var index = 0;
  var subcat_index = 0;

  function cancel() {
    console.log('cancelling');
    clearInterval(rollup);
  }

  rollup();

  function rollup() { //rolls up a main category.

    console.log('interval ' + index)
    main_scroller.text(data[index]);
    main_scroller.css('top', ""); //reset to original position

    console.log(main_scroller);
    animate_main();

    var subcats = subcat[data[index]];
    var subcat_count = 1;
    if (subcats != undefined) {
      subcat_count = subcats.length;
    }
    var delay = once * subcat_count;
    console.log('delay ' + delay);

    //index++; // This happens as the animation is running
    //put back if want loop to repeat
    //if (index == data.length) {
    //  index = 0;
    //}


    if (index == data.length) {
      cancel();
    } else {
    setTimeout(rollup, delay); //in this many ms, run this function again.
    }
  }

  //scroll up into view then check for subcats
  function animate_main() {

    console.log("animating " + data[index]);
    main_scroller.animate({
      "top": "-=75px"
    }, 800, subcats_here());
  }

  // Display subcats?

  function subcats_here() {

    console.log("rolling subcats, for main " + data[index] + " subcat_index " + subcat_index);

    subcat_scroller.css("top", "");  //reset
    console.log('subcats');
    var subcats = subcat[data[index]];

    console.log(subcats) ;

    if (subcats != undefined) {

      // roll subcats, then proceed with main roll

      //console.log("after cond " + subcats) ;

      subcat_scroller.css("top", "");

      subcat_scroller.text(subcats[subcat_index]);

      subcat_scroller.animate({
          "top": "-=75px"
        }, 800)
        .animate({
          fontSize: "+=0"
        }, 1000)
        .animate({
          "top": "-=75px"
        }, 800, function() {
          console.log('subcat animation done callback for subcat in ' +subcats + " "  + subcat_index);
          main_scroller.css('visibility', 'hidden').css('top', '').css('visibility', 'visible');

          subcat_index++;

          if (subcat_index == subcats.length) {
            subcat_index = 0;
            console.log('end of subcats');
            finish_main_roll()

          } else {
            console.log('more subcats to roll');
            //setTimeout(subcats_here, once);
            subcats_here();
          }

        });

    } else {
      finish_main_roll();
    }
  }


  function finish_main_roll() {

    main_scroller.animate({
        fontSize: "+=0"
      }, 1000)
      .animate({
        "top": "-=75px"
      }, 800, function() {
        console.log('animation done callback');
        main_scroller.css('visibility', 'hidden').css('top', '').css('visibility', 'visible');
        index++;
      });


  }

  function subcat_scroll(main_scroll_data) {

    var subcats = subcat[data[index]];

    if (subcats != undefined) {
      console.log(data[index] + ' has subcats ' + subcats);

      //scroll subcats

      var subcat_span = $("#scroll_sub");


      subcat_span.css('top', ""); //move to original position
      animate(subcat_span);

    }


    //resume main scroll
    index++
    if (index == data.length) {
      index = 0;
    }
    setTimeout(rollup, 2601);

  }

});

function reset(block) {

  console.log('reset ');
  block.css('backgroundColor', 'orange');
  block.css('top', '158px');
}
/*

 $(function() {

 //this does not work because the default position of an element is static. Need to set the postion : absolute to make this work
 $(".block").animate({
 right: "+=50"
 }, 2000);

 // this works
 $('#p').animate({
 opacity: 0.25
 }, 3000);

 var data = ['AAA', 'BBB', 'CCC', "DDD", "EEE"];

 var go = true;
 var index = 0

 function cancel() {
 console.log('cancelling')
 clearInterval(looper);
 }


 var looper = setInterval(function() {


 console.log('interval')

 scroller = $('#scroll')
 scroller.text(data[index]);

 var offset = scroller.offset();

 var scrollerOriginLeft = offset.left;
 var scrollerOriginTop = offset.top;

 //scroll up
 //pause
 //scroll up
 //return to base position

 scroller.animate({
 "bottom": "+=50px"
 }, 1000)
 .animate({
 fontSize: "24px"
 }, 1000) //pause
 .animate({
 "bottom": "+=50px"
 }, 1000)
 .animate({
 'left': scrollerOriginLeft,
 'top': scrollerOriginTop
 }, 5);

 index++
 if (index == data.length) {
 cancel();
 }

 }, 3100);


 });
 */
