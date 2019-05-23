// This callback function is called when the content script has been
// injected and returned its results
function onPageDetailsReceived(pageDetails) {
    document.getElementById('title').value = pageDetails.title;
    document.getElementById('url').value = pageDetails.url;
    var url_string = new URL(pageDetails.url);
    var query = url_string.searchParams.get("q");
    document.getElementById('query').value = "www.flipkart.com?search=" + query;

    // if(query != null){
    //     chrome.tabs.create({url:"typedUrls.html"});
    // }
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = 'http://post-test.local.com';

    // Set up an asynchronous AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);

    // Prepare the data to be POSTed by URLEncoding each field's contents
    var title = document.getElementById('title');
    var url = document.getElementById('url');
    var summary = document.getElementById('summary');
    var tags = document.getElementById('tags');
    var params = 'title=' + encodeURIComponent(title.value) +
        '&url=' + encodeURIComponent(url.value) +
        '&summary=' + encodeURIComponent(summary.value) +
        '&tags=' + encodeURIComponent(tags.value);

    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '+');

    // Set correct header for form data
    var formContentType = 'application/x-www-form-urlencoded';
    xhr.setRequestHeader('Content-type', formContentType);

    // Handle request state change events
    xhr.onreadystatechange = function() {
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                statusDisplay.innerHTML = 'Saved!';
                window.setTimeout(window.close, 1000);
            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

// Avoid recursive frame insertion...
var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var height = '300px'
    var width = '300px'
    var url = chrome.extension.getURL("frame.html");
    var iframe = "<iframe src=" + url + " id=myFirstToolbar123" + "></iframe>"
    //var iframe = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    //iframe.src = chrome.runtime.getURL('frame.html');

    // Some styles for a fancy sidebar
    iframe.style.cssText = 'position:fixed;top:0;left:0;display:block;' +
        'width:300px;height:100%;z-index:1000;';
    document.body.appendChild(iframe);
}