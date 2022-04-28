(function () {
  if (!gtag) {
    console.warn("gtag is not defined");
    return;
  }
  function runOnceByLabel(callback) {
    var cache = [];

    return function (name) {
      if (cache.indexOf(name) >= 0) {
        return;
      }
      cache.push(name);
      callback(name);
    };
  }

  function event(label) {
    gtag("event", "control - " + label, {
      event_category: "interaction",
      event_label: label,
    });
  }

  var eventOnce = runOnceByLabel(event);

  var actions = [
    ["#pomodoro", "mode_change", "pomodoro"],
    ["#short_break", "mode_change", "short_break"],
    ["#long_break", "mode_change", "long_break"],

    ["#timer_start", "timer_controls", "start"],
    ["#timer_pause", "timer_controls", "pause"],
    ["#timer_reset", "timer_controls", "reset"],

    ["#enable_alerts", "cta", "enable_alerts"],

    ["#link_log", "navigation", "log"],
    ["#link_faq", "navigation", "faq"],
    ["#link_settings", "navigation", "settings"],
    ["#link_tweet", "navigation", "tweet"],

    ["#submit", "settings", "submit"],
    ["#reset", "settings", "reset"],
    ["#soundtest", "settings", "sound_test"],
  ];

  for (var i = 0, el; i < actions.length; i++, el = actions[i]) {
    (function (el) {
      var $el = document.querySelector(el[0]);
      if ($el)
        $el.addEventListener("click", function () {
          var label = el[1] + " - " + el[2];
          eventOnce(label);
        });
    })(actions[i]);
  }
})();
