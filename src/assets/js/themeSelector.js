$(function() {
    if (document.body.classList.contains('vscode-light')) {
        $(window.MardownStyleLightTag).appendTo(document.head);
    } else {
        $(window.MardownStyleDarkTag).appendTo(document.head);
    }
})