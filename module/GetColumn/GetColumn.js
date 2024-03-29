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
                var text = '<br>';
                var count = 0;
                text += '<table>';
                text += '   <tr>';
                text += '       <td>No</td>';
                text += '       <td>Internal Name</td>';
                text += '       <td>Display name</td>';
                text += '       <td>Type</td>';
                text += '       <td>Required</td>';
                text += '   </tr>';
                for(i in data){
                    if(data[i].FromBaseType == false){
                        count = count+1;
                        text += '   <tr>';
                        text += '       <td>'+ count +') '+'</td>';
                        text += '       <td>'+data[i].InternalName+'</td>';
                        text += '       <td>'+ data[i].Title +'</td>';
                        text += '       <td>'+ data[i].TypeDisplayName +'</td>';
                        text += '       <td>'+ data[i].Required +'</td>';
                        text += '   </tr>';  
                    }
                    
                }
                text += '</table>';
                $('#DisplayResult').empty();
                $('#DisplayResult').append(text);
                // Writeline();
            },
            error: function(err){
                $('#DisplayResult').empty();
                $('#DisplayResult').append('<br> List ' + command + ' is not found.');
            }            
        });


    }else{
        var str = 'Input list name';
        $('#DisplayResult').empty();
        $('#DisplayResult').append(str);
    }

}