
$(function() {

  var data = ['Java', 'Python', 'Android', 'JavaScript'];
  var subcat = {
    'Java': [''],
    'Android' : [''],
    'Python' : ['Flask', 'Django'],
    'JavaScript': ['Node', 'JQuery']
    // Provide list with blank string for items with no sub-categories
  };

  var scroll_time = 800;
  var pause_time = 1500;

  var scroll_from_base = "-=65px";
  var scroll_to_top = "-=60px";

  var main_scroller = $('#scroll');
  var subcat_scroller = $('#scroll_sub');

  var index = 0;
  var subcat_index = 0;

  roll_main();

  function roll_main() { //rolls up a main category item.

    main_scroller.css('top', ""); //start (or reset) at base position
    main_scroller.text(data[index]);

    main_scroller.animate({
      "top": scroll_from_base
    }, scroll_time, roll_subcats());   //Scroll up, then check for subcats

  }

  var ended_subcats = false;

  function roll_subcats() {

    subcat_scroller.css("top", "");

    var subcats = subcat[data[index]];

    // roll subcats. Once all rolled, continue main roll, in sync with last rolling up.
    subcat_scroller.css("top", "");    //reset to bottom
    subcat_scroller.text(subcats[subcat_index]);   //set text
    subcat_index++;

    subcat_scroller.animate({
        "top": scroll_from_base
      }, scroll_time , function() {
        if (subcat_index == subcats.length) {   //Last subcat. Tell main to finish roll in sync with this.
          subcat_index = 0;
          ended_subcats = true;
          finish_main_roll()
        }
      })
      .animate({
        "top": "+=0"    //hold in place
      }, pause_time)
      .animate({
        "top": scroll_to_top
      }, scroll_time, function () {

        subcat_scroller.css("top", "");    //reset to bottom

        if (ended_subcats) {
          ended_subcats = false;           //don't roll more
          main_scroller.css("top", "");    //reset to bottom

        } else {
          roll_subcats();      // keep rolling subcats
        }

      });
  }


  function finish_main_roll() {

    //Main scroller should be showing an item. Roll it off top of screen

    main_scroller.animate({
        top: "+=0"
      }, pause_time)
      .animate({
        "top": scroll_to_top
      }, scroll_time, function () {
        main_scroller.css('top', '');
        index++;
        if (index < data.length) {
          roll_main();
        } else {
          // Done. Pause then call done to display final message.
          setTimeout(done, 1000);
        }

      });
  }


  function done() {
    main_scroller.css('top', '');  //reset
    main_scroller.text('some other programming stuff');    // scroll in last line
    main_scroller.animate({
      top: scroll_from_base
    }, pause_time);
  }

});