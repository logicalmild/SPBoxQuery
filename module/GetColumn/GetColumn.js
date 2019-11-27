function GetColumn(){
    var command = $('#QueryInput').val();

    if(command){
        
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+command+"')/fields",
            type: 'GET',
            async: false,
            headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json;odata=verbose',
            },
            success: function (data) {
                data = data.d.results;
                text = JSON.stringify(data, null , 3);
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
            },
            error: function(err){
                $('#DisplayResult').append('List ' + command + ' is not found.');
            }            
        });


    }else{
        var str = 'Input list name';
        $('#QueryInput').val(str);
    }

}