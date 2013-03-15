define('ace/mode/mmseo', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextMode = require("ace/mode/text").Mode;
    var Tokenizer = require("ace/tokenizer").Tokenizer;
    var ExampleHighlightRules = require("ace/mode/example_highlight_rules").ExampleHighlightRules;

    var Mode = function() {

        this.$tokenizer = new Tokenizer(new ExampleHighlightRules().getRules());
    };
    oop.inherits(Mode, TextMode);

    (function() {
        // Extra logic goes here. (see below)
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

define('ace/mode/example_highlight_rules', function(require, exports, module) {

    var oop = require("ace/lib/oop");
    var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

    var ExampleHighlightRules = function() {

        //this.$rules = new TextHighlightRules().getRules();
        this.$rules = {
            start: [
                {
                    token: "keyword",
                    regex: /[\{\}]/
                },
                {
                    token: "variable",
                    regex: /\|/
                },
                {
                    token: "markup",
                    regex: /<.+>/
                },
                {
                    token: "comment",
                    regex: /\S/
                }
            ]
        };



    }

    oop.inherits(ExampleHighlightRules, TextHighlightRules);

    exports.ExampleHighlightRules = ExampleHighlightRules;
});