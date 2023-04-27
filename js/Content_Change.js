var CoverSL = ["#F1", "#F2", "#F3"];
var FeaNum = ["1", "2", "3"];
// 1. Click on Cover
// var selected = 1
// 1.1 Change Cover
$(document).ready(function () {
    $.each(CoverSL, function (i1, v1) {
        
        
        
        $(v1)[0].addEventListener('click', function () {   // mind the difference of jquery object and dom object
            
            // the selected
            if (i1 == 1) { CollaborationPlotting() }
            $(v1).css({ "background": "#FFFFFF", "color": "#000000" });

            // the rest
            $.each($.grep(CoverSL, function (temp) {
                return temp != v1;
            }), function (i2, v2) {
                $(v2).css({ "background": "transparent", "color": "#f1ece4" });
            });
        });
    });
});



// Click on Trans 2
// 3.1 change itself
$(document).ready(function () {
        $.each(FeaNum, function (i1, v1) {
            document.getElementsByClassName("C" + v1)[0].addEventListener('click', function () {
                // the selected
                if (i1 === 0) { StreamPlotting(); }
                
                if (i1 === 2) { BubblePlotting(); }
                $(".C" + v1).css({ "background": "#FFFFFF", "color": "#000000" });
                $("#Me" + v1).css("display", "block");
                $("#Cht" + v1).css("display", "block");
                // the rest
                $.each($.grep(FeaNum, function (temp) {
                    return temp != v1;
                }), function (i2, v2) {
                    $(v2).css({ "background": "#000000", "color": "#FFFFFF" });
                    $("#Me" + v2).css("display", "none");
                    $("#Cht" + v2).css("display", "none");
                });
            });
        });
});


// 1.3 change Content
$(document).ready(function () {
    $.each(FeaNum, function (i1, v1) {
        $("#F" + v1)[0].addEventListener('click', function () {
            // the selected
            $("#Feature" + v1).css("display", "block");
            $("#Text" + v1).css("display", "block");
            // the rest
            $.each($.grep(FeaNum, function (temp) {
                return temp != v1;
            }), function (i2, v2) {
                $("#Feature" + v2).css("display", "none");
                $("#Text" + v2).css("display", "none");
            });
        });
    });
});

// Click on Trans 1

// 2.1 change itself and Cover
$(document).ready(function () {
        $.each(FeaNum, function (i1, v1) {
                // the selected
                if (i1 == 1) { CollaborationPlotting() }
                $("#F" + v1).css({ "background": "#000000", "color": "#FFFFFF" });

                // the rest
                $.each($.grep(FeaNum, function (temp) {
                    return temp != v1;
                }), function (i2, v2) {
                    $("#F" + v2).css({ "background": "#FFFFFF", "color": "#000000"});
                });
            });
});


// 2.2 change Content
$(document).ready(function () {
        $.each(FeaNum, function (i1, v1) {
            
                // the selected
                $("#Feature" + v1).css("display", "block");
                $("#Text" + v1).css("display", "block");
                // the rest
                $.each($.grep(FeaNum, function (temp) {
                    return temp != v1;
                }), function (i2, v2) {
                    $("#Feature" + v2).css("display", "none");
                    $("#Text" + v2).css("display", "none");
                });
            });
});




