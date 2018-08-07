$(function() {
    $('.lazy').map(function(idx, element) {
        var data = $(element).data();
        if (data) {
            if (data["src"].indexOf("http:") == -1 && data["src"].indexOf("https:") == -1) {
                var absImage = window.LazyImageBaseUrl + data["src"];
                $(element).attr('src', absImage);
            } else {
                $(element).attr('src', data["src"]);
            }
        }
    });
});