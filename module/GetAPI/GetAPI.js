function GetAPI(){
    var requestUri = SiteUrl + "/_api/web/";
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var text;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
        
            data = data.d; 
           
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
        error: function ajaxError(response) {
        console.log(response.status + ' ' + response.statusText);
        }
    });

}