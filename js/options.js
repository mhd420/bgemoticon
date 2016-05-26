var emoticons = [];

function addEmoticonRow(shortcut, url) {
    var newRow = $('<tr>');
    newRow.append('<td><img src="' + url + '"></td>');
    newRow.append('<td>' + shortcut + '</td>');
    newRow.append('<td>' + url + '</td>');
    
    var deleteButton = $('<button class="error">Delete</button>');
    deleteButton.click(function() { 
        newRow.remove();
        removeEmoticon(shortcut);
    })
    newRow.append($('<td>').append(deleteButton));
    
    $("#emoticonTable > tbody").append(newRow);
}

function removeEmoticon(shortcutToDelete) {
    for (var i = 0; i < emoticons.length; i++)
    {
        if (emoticons[i].shortcut == shortcutToDelete)
        {
            emoticons.splice(i, 1);
        }
    }
}

$(function () {
    // load current data
    chrome.storage.sync.get({"emoticons": []}, 
    function(options) {
        emoticons = options.emoticons;
        
        // populate form
        emoticons.forEach(function(emote) {
            addEmoticonRow(emote.shortcut, emote.url);
        }, this);
    });
    
    // hook up buttons
    $("#addEmoticon").click(function() {
        var shortcut = $("#addShortcut").val();
        var url = $("#addURL").val();
        
        if (shortcut && url)
        {
            emoticons.push({"shortcut": shortcut, "url": url});
            addEmoticonRow(shortcut, url);
        }
    });
    
    $("#importEmoticons").click(function() {
        var importData = $("#importJSON").val();
        
        try {
            var importData = JSON.parse(importData);
            
            importData.forEach(function(emote) {
                emoticons.push(emote);
                addEmoticonRow(emote.shortcut, emote.url);
            }, this);
        } catch (e) {
            window.alert("Invalid import data");
        }
    });
    
    $("#exportEmoticons").click(function() {
        $("#importJSON").val(JSON.stringify(emoticons));
    });
    
    $("#saveChanges").click(function() {
        chrome.storage.sync.set({
            "emoticons": emoticons
        });
    });
});