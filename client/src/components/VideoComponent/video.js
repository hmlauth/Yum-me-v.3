// Called automatically when JavaScript client library is loaded.
function onClientLoaded() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded.
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAp30JHgIM1nXzBjunubxIvZlp8hLBnNY8');
    makeRequest();
}

function makeRequest() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function (response) {
        renderVideos(response);
    });
}

function renderVideos(resp) {
    var maxNumVideos = 5;
    var stList = '<table id="res1" border="1" cellspacing="1" width="100%"><tbody>';

    for (var i = 0; i < resp.items.length && i < maxNumVideos; i++) {
        var video = resp.items[i].id.videoId;
        var title = resp.items[i].snippet.title;

        if (typeof video != 'undefined') {
            stList += '<tr><td style="width:80px;vertical-align:top">' +
                '<a class="show" href="#" title="' + video + '" onclick="playVideo(this);' +
                ' return false">' +
                '<img width="80" height="60" src="http://img.youtube.com/vi/' +
                video + '/default.jpg"></a></td>' +
                '<td>' + title + '</td></tr>';
        }
    }

    document.getElementById('video-list').innerHTML = stList + '</tbody></table>';
}

function playVideo(self) {
    var videoLink = 'https://www.youtube.com/embed/' + self.title + '?autoplay=1';
    document.getElementById('player').src = videoLink;
}

<script src="https://apis.google.com/js/client.js?onload=onClientLoaded"> </script>