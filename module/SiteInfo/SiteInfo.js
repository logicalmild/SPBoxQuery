function SiteInfo(){
    var text = '';
        text = JSON.stringify(_spPageContextInfo, null , 3);
        text = text.replace(/"/g,'');
        text = text.replace(/,/g,'<br>');
        text = text.replace(/{/g,'');
        text = text.replace(/}/g,'<br>');
        text = text.replace(/:/g,'');
        text = text.replace(/__deferred/g,'');
        text = text.replace(/uri/g,'=>');
        text = text.replace(/__metadata/g,'');
        $('#DisplayResult').append(text);
        Writeline();
}