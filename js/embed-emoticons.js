var emoticons = [];

function replaceShortcuts()
{
    var post = $("#postmodify #editor").val();

    emoticons.forEach(function(emote) {
        post = post.replace(emote.shortcut, "[img]" + emote.url + "[/img]");
    }, this);

    $("#postmodify #editor").val(post);
}

function generateCustomList()
{
    var ul = $('<ul class="smilies">');
    
    emoticons.forEach(function(emote) {
        ul.append('<a href="#" onclick="replaceText(\'' + emote.shortcut + '\', document.forms.postmodify.message); return false;">' + 
                  '<li class="smiley"><img src="' + emote.url + '" align="bottom"></li></a>');
    }, this);
    
    return ul;
}

chrome.storage.sync.get({"emoticons": []}, 
    function(options) {
        emoticons = options.emoticons;
        
        $("#postmodify").submit(replaceShortcuts);

        // gross
        var tr = $("<tr>");
        tr.append("<td>");
        tr.append($("<td>").append(generateCustomList()));

        $("#postmodify > table.bordercolor > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8)").after(tr);
    });