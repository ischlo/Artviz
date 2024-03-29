var country = "All";
var color = "";
var year =1930;
var colormap = L.layerGroup();

$(document).ready(function () {
    //countryandcolor(country, color);
    getcolors();
    
    fillMap(year);
    
    console.log("Getting all the colors for the searchar:");
    
});


// Following are functions

function fillMap(year) {
    console.log("fillmap: getting the colorMap from the server!");
    $.getJSON(aws_endpoint +"/Assessment/ColorGeo/"+year, function (data, status) {
	console.log('Fillmap '+ status);
        
        var mapcountry = "", mapcolor = "", m = 0;
        var wkt = new Wkt.Wkt();
        var object;
        var colordata = []; // each element in this list will be a polygon
        $.each(data, function (u) {


            // extracting the main color for a country
            wkt.read(data[u]['geometry']);
            mapcountry = data[u]['ADMIN'];
            object = wkt.toObject().bindPopup(mapcountry, { className: 'Popup' });
            object.name = mapcountry;
            for (var key in data[u]) {
                if (key != "level_0" && key != "index" && key != "ISO_A3" && key != "geometry" && key != "ADMIN" && key != "Decade") {
                    if (data[u][key] > m) {
                        m = data[u][key];
                        mapcolor = key;
                        
                    }
                }
            }

            object.setStyle({
                color: "black",
                weight: 1,
                fillColor: mapcolor,
                //border: black,
                fillOpacity: 0.8,
            });
            object.on("click", function (e) {
                if (country == e.target.name) {
                    country = "All";
                    allcolorsforcountry("All");
                    countryandcolor(country, e.target.options.fillColor);
                    map3.closePopup();

                } else {
                    //object.options.padding = 5;
                    //object.options.fillColor = "black";
                    country = e.target.name;
                    console.log(country);
                    color = e.target.options.fillColor;
                    console.log(color);
                    allcolorsforcountry(country);
                    countryandcolor(country, color);
                };
            });
            colordata.push(object);
            m = 0;
            mapcolor = "";
            mapcountry = "";

        });
        colormap.clearLayers();
        colormap = L.layerGroup(colordata);
        colormap.addTo(map3);
        //colordata = [];
        //console.log(colordata);
    });

}


function allcolorsforcountry(country) {
    console.log("allcolorsforcountry: Filling the searchbar with colors of the country " + country + "!");
    $.getJSON(aws_endpoint +"/Assessment/Color/"  + country + "/All/"+year, function (data) {
        console.log('allcolors for country '+ status);
        $("select").empty();
        $.each(data, function (u) {
            //console.log(data[u]['Colors']);
            if (data[u]['Colors'] == color) {
                $("#scrollable").css('background-color', data[u]['Colors'])
                //console.log(data[u]['Colors']);
                $("select").append(
                    '<option value="' + parseInt(u) + '" selected>' + data[u]['Colors'] + '</option>'
                );
            } else {
                $("select").append(
                    '<option value="' + parseInt(u) + '">' + data[u]['Colors'] + '</option>'
                );
            }
        });
    });
}


function countryandcolor(country, color) {
    console.log("countryandcolor: getting for " + country + " and " + color + " from server and fillig the gallery!");

    $.getJSON(aws_endpoint +"/Assessment/Color/" + country + "/" + color + "/"+year, function (data) {
        console.log('country and color '+ status);
        $("#imagegallery").empty();

        if (data.length > 1) {
            $(".Imgtext").text(
              "There are " + data.length + " artworks matching this color for " + country
            )
          } else if (data.length == 1) {
            $(".Imgtext").text(
              "There is " + data.length + " artwork matching this color for " + country
            )
          };
        if (color == "black") {

            $("#scrollable").css('color', '#f1ece4');
        } else {
            $("#scrollable").css('color', 'black');
        };

        $.each(data.slice(0, 30), function (i, v) {
            if (v != undefined) {
                $("#imagegallery").append(
                    '<a target="_blank" href="' + v.URL + '"><img src="' + v.ThumbnailURL + '" alt="https://www.moma.org"> </a>'
                );
            };
        });
        //when_images_loaded($("#imagegallery"),waterfallHandler)
    });
}


function getcolors() {
    console.log("getcolors: Filling the searchbar!");
    $.getJSON(aws_endpoint +"/Assessment/Color/All/All/"+year, function (data) {
        console.log('getcolors '+ status);
        color = data[Math.floor(Math.random() * data.length)]['Colors'];
        console.log(color);
        $("select").empty();
        $.each(data, function (u) {

            if (data[u]['Colors'] == color) {
                $("#scrollable").css('background-color', data[u]['Colors'])

                $("select").append(
                    '<option value="' + parseInt(u) + '" selected>' + data[u]['Colors'] + '</option>'
                );
            } else {
                $("select").append(
                    '<option value="' + parseInt(u) + '">' + data[u]['Colors'] + '</option>'
                );
            }
        });
        countryandcolor(country, color);
    });
};

function when_images_loaded($img_container, callback) {
    /* do callback when images in $img_container (jQuery object) are loaded. Only works when ALL images in $img_container are newly inserted images and this function is called immediately after images are inserted into the target. */
    var _imgs = $img_container.find('img'),
        img_length = _imgs.length,
        img_load_cntr = 0;
    if (img_length) {//if the $img_container contains new images.
        _imgs.on('load', function () {//then we avoid the callback until images are loaded
            img_load_cntr++;
            if (img_load_cntr == img_length) {
                callback();
            }
        });
    }
    else { //otherwise just do the main callback action if there's no images in $img_container.
        callback();
    }
}


// color bar reacts when a value is selected
$(".colors").change(function () {
    var selectedColor = $(this).children("option:selected").text();

    $("#scrollable").css('background-color', selectedColor)

    //allcolorsforcountry(country);
    console.log("getting artworks in " + country + " with " + selectedColor + " in them");
    countryandcolor(country, selectedColor);
    color = selectedColor;
});

    
$('#sliderColor')[0]
    .addEventListener('input', function (Y) {
        console.log('clearing the map !')
        country = "All";
        year = parseInt(Y.target.value);
        
        $("#timeColor").text(year + "s"); // Change the time label
        
        getcolors();
        fillMap(year);
        
});
