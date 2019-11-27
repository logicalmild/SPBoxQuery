function SelectItem(mode){
    
    var list = $('#QueryInput').val();
    var process = false;
    var Query = '';
    var text='';
    if(list){
        process = true;
        switch(mode){
            case 'All':
                        Query = '?$select=*&$top=50000';
                        break;
    
            case 100:
                        Query = '?$select=*&$top=100';
                        break;
            case 1000:
                        Query = '?$select=*&$top=1000';
                        break;
            case 10000:
                        Query = '?$select=*&$top=10000';
                        break;
        }
    }else{
        $('#DisplayResult').append('<br>Input List name<br>');
    }

    

    if(process == true){
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+list+"')/items" + Query;
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
                    var col = '';
                    for(j in data[i]){
                        col = j;
                        text+='<th>'+col+'</th>';
                    }
                    break;
                }  
                text+='</tr>';             
                for(i in data){
                    text+='<tr>';
                    var d1 = data[i]
                    for(j in d1){
                        var d2 = d1[j];
                        text+='<td>'+d2+'</td>';
                        
                    }
                    text+='</tr>';
                }
               
                text+='</table>';
                
                $('#DisplayResult').append(text);
                    

                
                
            },
            error: function ajaxError(response) {
                console.log(response.status + ' ' + response.statusText);
            }
        });
    
   
    }


    

}