/*
TODO why does code to test for no sub-cats cause incorrect scrolling?
 */



$(function() {

  var data = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
  var subcat = {
    'AAA': ['a1', 'a2', 'a3'],
    'BBB' : [''],
    'CCC': ['c1', 'c2'],
    'DDD' : ['d1', 'd2'],
    'EEE' : ['']
  };

  var scroll_time = 800;
  var pause_time = 1500;

  var main_scroller = $('#scroll');
  var subcat_scroller = $('#scroll_sub');

  var index = 0;
  var subcat_index = 0;

  roll_main();

  function roll_main() { //rolls up a main category.

    main_scroller.text(data[index]);
    main_scroller.css('top', ""); //reset to original position

    console.log("animating " + data[index]);
    main_scroller.animate({
      "top": "-=75px"
    }, scroll_time, roll_subcats());
  }


  var ended_subcats = false;

  function roll_subcats() {

    console.log("rolling subcats, for main " + data[index] + " subcat_index " + subcat_index);

    subcat_scroller.css("top", "");

    var subcats = subcat[data[index]];

    if (subcats != undefined) {

      // roll subcats. Once all rolled, continue main roll, in sync with last rolling up.
      subcat_scroller.css("top", "");    //reset to bottom
      subcat_scroller.text(subcats[subcat_index]);   //set text
      subcat_index++;

      subcat_scroller.animate({
          "top": "-=75px"
        }, scroll_time , function() {

          if (subcat_index == subcats.length) {   //Last subcat. Tell main to finish roll in sync with this.
            subcat_index = 0;
            ended_subcats = true;
            console.log('end of subcats index is ' + subcat_index);
            //subcat_scroller.("top", "");
            finish_main_roll()
          }
        })
        .animate({
          "top": "+=0"    //hold in place
        }, pause_time)
        .animate({
          "top": "-=65px"
        }, scroll_time, function () {

          subcat_scroller.css("top", "");    //reset to bottom

          console.log('subcat animation done callback for subcat in ' + subcats + " subcat index " + subcat_index);
          //subcat_scroller.css('visibility', 'hidden').css('top', '').css('visibility', 'visible');

          if (ended_subcats) {
            ended_subcats = false;   //don't roll more
            main_scroller.css("top", "");    //reset to bottom

          } else {//if (subcat_index < subcats.length) {
            console.log('more subcats to roll, subcat index is ' + subcat_index);
            roll_subcats();
          }

        });

    } else {
      console.log('No subcats to roll for ' + data[index]);
      finish_main_roll();
    }
  }


  function finish_main_roll() {

    //Main scroller should be showing an item. Roll it off top of screen
    console.log('Finish main roll for ' + data[index]);
    main_scroller.animate({
        fontSize: "+=0"
      }, pause_time)
      .animate({
        "top": "-=50px"
      }, scroll_time, function () {
        console.log('main roll animation done callback, ' + data[index] + ' resetting to bottom');
        main_scroller.css('top', '');

        index++;
        console.log('finish main roll callback; Index is now ' + index)

        if (index < data.length) {
        roll_main();
        }

      });
  }

});