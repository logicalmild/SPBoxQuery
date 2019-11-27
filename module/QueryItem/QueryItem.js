function QueryItem(){

    var Query = $('#QueryInput').val();
    if(!Query){
        var str = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('listname')/items?$select=*&$top=100";
        $('#QueryInput').val(str); 
    }
    
}