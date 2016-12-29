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
        
        if (emoticons.length == 0)
            return;

        $("#postmodify").submit(replaceShortcuts);

        // gross
        var customSmiley = $(
            '<tr><td></td><td><a href="#" id="custom-smiley-expand"><b>Show custom smileys...</b></a></td></tr>' +
            '<tr><td></td><td><div id="custom-smiley-container" style="display: none;"></div></td></tr>'
        );

        $("#custom-smiley-expand", customSmiley).click(function() {
            $("#custom-smiley-container").toggle();
            return false;
        });

        $("#custom-smiley-container", customSmiley).append(generateCustomList());

        $("#postmodify > table.bordercolor > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(8)").after(customSmiley);
    });