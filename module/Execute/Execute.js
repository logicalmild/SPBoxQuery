function Execute(){

    var Query = $('#QueryInput').val();
    if(!Query){
        var err = 'Command is not found';
        err = '<p style="color:red;">'+err+'</p>';
        $('#DisplayResult').append(err);
    }else{
        var text='';
        var requestUri = Query;
        var requestHeaders = {
        "accept": "application/json;odata=verbose"
        }
    
        $.ajax({
            url: requestUri,
            type: 'GET',
            dataType: 'json',
            async: false,
            headers: requestHeaders,
            success: function (data) 
            {      
                data = data.d.results; 
                text+='<table>';
                text+='<tr>';
                for(i in data){
                    if(data[i].FromBaseType == false){
                        var col = '';
                        for(j in data[i]){
                            col = j;
                            text+='<th>'+col+'</th>';
                        }
                        break;
                    }
                    
                }  
                text+='</tr>';             
                for(i in data){
                    if(data[i].FromBaseType == false){
                        text+='<tr>';
                        var d1 = data[i]
                        for(j in d1){
                            var d2 = d1[j];
                            text+='<td>'+d2+'</td>';
                            
                        }
                        text+='</tr>';
                    }
                    
                }
               
                text+='</table>';
                
                $('#DisplayResult').append(text);
                    
            },
            error: function ajaxError(response) {
                var err = response.status + ' ' + response.statusText;
                err = '<p style="color:red;">'+err+'</p>';
                $('#DisplayResult').append(err);
            }
        });
    }

}