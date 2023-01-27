// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const dailySalesChart = (labels, series) => {
  const data = {
    labels: labels,
    series: [series],
  };
  const options = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: Math.max.apply(Math, series) + 10, // we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  console.log(options);
  // for animation
  const animation = {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  };
  return { data, options, animation };
};

// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = (labels, series) => {
  const data = {
    labels: labels,
    series: [series],
  };
  const options = {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 110,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  };
  const responsiveOptions = [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          },
        },
      },
    ],
  ];
  const animation = {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  };
  return { data, options, animation, responsiveOptions };
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = (labels, series) => {
  const data = {
    labels: labels,
    series: series,
  };

  return { data };
};

module.exports = {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
};
