// var iframe = document.createElement("iframe");
// iframe.setAttribute("src", "https://www.facebook.com/plugins/like.php?href=http://allofrgb.blogspot.in/");
// iframe.setAttribute("style", "border:none; width:150px; height:30px");
// iframe.setAttribute("scrolling", "no");
// iframe.setAttribute("frameborder", "0");
// //parent.$("body").append(iframe);
// document.body.insertBefore(iframe);


var query = $('[name="q"]').val();

if (query == "" || query==undefined){
    query = $('[name="k"]').val();
}

if (query == "" || query==undefined){
    query = $('[name="search_query"]').val();
}

if (query !== "" && query!==undefined){
    var height = '100px'
    //alert("calling: "+ 'https://www.google.com/search?igu=1&q=' +query)
    //var url = chrome.extension.getURL('https://www.google.com/search?igu=1&q=' +query);
    var url = chrome.extension.getURL("https://0.0.0.0:5000/get_product_toolbar?q=" + query);
    
    var iframe = "<iframe src=" + url + " id=myFirstToolbar123 style='height: " + height + "'></iframe>"
    //var iframe = "<img src=" + "clock.png" + " id=myFirstToolbar123 style='height: " + height + "'/>"

    $('html').append(iframe)

    // var url = chrome.extension.getURL('toolbar.html');
    // var iframe = "<iframe src=" + url + " id=myFirstToolbar123 style='height: " + height + "'></iframe>"
    $('html').append(iframe)
    //$('#myFirstToolbar123').append("<input type='text' id='test_flipkart' name='test_flipkart' size='50' value='"+query+"' />")
    //$('html').contents().find("test_flipkart").val('The url to be called:' + 'https://www.flipkart.com/search?q=' +query);
    //$('#test_flipkart').text('The url to be called:' + 'https://www.flipkart.com/search?q=' +query);

    $('body').css({
        '-webkit-transform': 'translateY('+'75px'+')'
    });
}

