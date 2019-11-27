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
                text = '<br>';
                var count = 0;
                for(i in data){
                    if(data[i].FromBaseType == false){
                        count = count+1;
                        text += '<br>'+ count +') ' +data[i].InternalName+ ': <br>'
                    }
                    
                }
                $('#DisplayResult').append(text);
                // Writeline();
            },
            error: function(err){
                $('#DisplayResult').append('<br> List ' + command + ' is not found.');
            }            
        });


    }else{
        var str = 'Input list name';
        $('#DisplayResult').append(str);
    }

}