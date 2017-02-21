"use strict";

var chevrotainParser = require("argdown-parser-chevrotain-test");
var antlr4Parser = require("argdown-parser-antlr4-test");
//var fs = require("fs");
//var path = require('path');
var benchmark = require('benchmark');
var Benchmark = benchmark.runInContext({ _, process });
window.Benchmark = Benchmark;
var $ = require('jquery');
require("./main.scss");

$(function(){
  var $runButton = $("#runBenchmarkButton");
  var $benchmarkInput = $("#benchmarkInput");
  var $chevrotainResults = $("#benchmarkResults .chevrotain");
  var $antlr4Results = $("#benchmarkResults .antlr4");

  $runButton.on("click",function(){
    var input = $benchmarkInput.val();
    runBenchmark(input);
  });

  var runBenchmark = function(input){
    $("#runBenchmarkButton").prop('disabled', true);
    //handle "Running..."
    var valueBeforeTheDots = "Running"
    var wait = document.getElementById("wait");
    wait.innerHTML = valueBeforeTheDots
    var dots = window.setInterval(function () {
        if (wait.innerHTML.length >= valueBeforeTheDots.length + 3)
            wait.innerHTML = valueBeforeTheDots
        else
            wait.innerHTML += "."
    }, 500);


    var result = {};
    var suite = new Benchmark.Suite("Argdown Parsers",{
      'onStart' : function(){
        //var filePath = path.join(__dirname, 'simple-text.argdown');
        //input = fs.readFileSync(filePath, 'utf8');
        //var input = "Test test test";
        //console.log(input);
      }
    });
    suite.add('chevrotain', function() {
      chevrotainParser.parse(input);
    })
    .add('antlr4', function() {
      antlr4Parser.parse(input);
    })
    // add listeners
    .on('cycle', function(event) {
      var suite = event.target;
      var rate = suite.hz.toFixed(2);
      var $rate = $('.' + suite.name + ' .benchRate .value');
      var $delta = $('.' + suite.name + ' .benchRate .delta');
      $rate.html(rate);
      $delta.html('&plusmn;' + suite.stats.rme.toFixed(2) + '%');
    })
    .on('complete', function() {
      var suites = this.filter('successful');
      var fastestSuite = this.filter('fastest')[0];
      suites.splice(suites.indexOf(fastestSuite), 1);
      $('.' + fastestSuite.name + ' .benchSpeed').html("100%");
      $('.' + fastestSuite.name).addClass("fastestRow");
      _.forEach(suites, function (suite) {
          var $cell = $('.' + suite.name + ' .benchSpeed');
          var speed = ((suite.hz / fastestSuite.hz).toFixed(4) * 100).toFixed(2);
          $cell.html(speed + '%');
      })
      window.clearInterval(dots)
      $('#wait').html('&nbsp;')

      $("#runBenchmarkButton").prop('disabled', false);
      window.clearInterval(dots)
      $('#wait').html('&nbsp;')
    })
    // run async
    .run({ 'async': true });
  }
});
