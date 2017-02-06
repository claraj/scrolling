$(function() {

  var data = ['AAA', 'BBB', 'CCC'];
  var subcat = {
    'AAA': ['a1', 'a2', 'a3'],
    'CCC': ['c1', 'c2']
  };

  var scroll_time = 800;
  var pause_time = 1000;

  var main_scroller = $('#scroll');
  var subcat_scroller = $('#scroll_sub');

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
    //main_scroller.css('top', ""); //reset to original position

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


    //if (index == data.length) {
    //  cancel();
    //} else {
    // // setTimeout(rollup, delay); //in this many ms, run this function again.
    //}
  }

  //scroll up into view then check for subcats
  function animate_main() {

    console.log("animating " + data[index]);
    main_scroller.animate({
      "top": "-=75px"
    }, scroll_time, subcats_here());
  }

  // Display subcats?

  function subcats_here() {

    console.log("rolling subcats, for main " + data[index] + " subcat_index " + subcat_index);

    subcat_scroller.css("top", "");  //reset
    console.log('subcats');
    var subcats = subcat[data[index]];

    console.log(subcats);

    if (subcats != undefined) {

      // roll subcats, then proceed with main roll
      subcat_scroller.css("top", "");    //reset to bottom
      subcat_scroller.text(subcats[subcat_index]);   //set text

      subcat_scroller.animate({
          "top": "-=75px"
        }, scroll_time)
        .animate({
          "top": "+=0"    //hold
        }, pause_time)
        .animate({
          "top": "-=75px"
        }, scroll_time, function () {
          console.log('subcat animation done callback for subcat in ' + subcats + " subcat index " + subcat_index);
          subcat_scroller.css('visibility', 'hidden').css('top', '').css('visibility', 'visible');

          subcat_index++;

          if (subcat_index == subcats.length) {
            subcat_index = 0;
            console.log('end of subcats index is ' + subcat_index);
            subcat_scroller.css("top", "");    //reset to bottom //todo roll off top

            finish_main_roll()

          } else {
            console.log('more subcats to roll');
            //setTimeout(subcats_here, once);
            subcats_here();
          }

        });

    } else {
      console.log('No subcats to roll for ' + data[index]);
      finish_main_roll();
    }
  }


  function finish_main_roll() {

    console.log('Finish main roll for ' + data[index]);
    main_scroller.animate({
        fontSize: "+=0"
      }, pause_time)
      .animate({
        "top": "-=75px"
      }, scroll_time, function () {
        console.log('main roll animation done callback, resetting to bottom');
        main_scroller.css('visibility', 'hidden').css('top', '').css('visibility', 'visible');

        index++;
        console.log('Index is now ' + index)

        if (index < data.length) {
        rollup();
        }

      });
  }

});