$(function() {
    var showDbScript = $('#showdb').html()
    var showDb = Handlebars.compile(showDbScript)
    var context = 'adam'

    var theCompiledHtml = showDb(context)
    $('.content_placeholder').html(theCompiledHtml)
})