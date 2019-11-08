<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" x-undefined="" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SP Box Query</title>
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<SharePoint:CssRegistration Name="default" runat="server" />
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/jquery.terminal/css/jquery.terminal.min.css" rel="stylesheet"/>
    <script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="https://logicalmild.github.io/SPGuide/SPGuide.js"></script>
 
    
</head>

<style>
    .border{
        border-style:solid;
        border-width:1px; 
        border-color:gray;
    }
    html,body{
        height:100%;
        margin:0px;
        
    }
    .container{
        height:97%;
        width:100%;
        position:fixed;
        padding:10px;

    }
    .left-pane{
        float:left; 
        width:14%; 
        height:100%;
        padding:10px;
    }
    .center-area{
        float:left;
        width:81%;
        height:97%;
        padding:10px;
        margin-left:10px;
 
    }
    .result{
        width:98%; 
        height:60%;
        overflow:auto;
        overflow-x:auto;
        padding-left:10px; 
        padding-right:10px;
    }
    .context-box{
        width:98%; 
        margin-top:10px; 
        height:35%;
        padding:10px;
    }
    #Title{
        border-style:solid;
        border-width:1px; 
        border-color:gray;
    }
    #Title p{
        margin-top:5px;
        margin-bottom:5px;
        text-align:center;
    }
    #SiteInfo{

    }
    #LeftPaneControl{
        margin-bottom:10px;
    }
    #LeftPaneControl button{
        margin-right:5px;
    }
</style>
    
<body>
    <form id="form1" runat="server">
        <SharePoint:FormDigest runat="server"></SharePoint:FormDigest>
    </form>
    
    <div class="container border">
        <div class="border left-pane">
            <div id="LeftPaneControl">
                <button onclick="GetList();" type="button">List</button>
                <button type="button">User</button>
                <button onclick="SiteInfo();" type="button">Site</button>
                <button onclick="GetAPI();" type="button">API</button>
            </div>
            <div id="Title">
                <p id="SiteTitle"></p>
            </div>
            <ul id="LeftPaneInfo">

            </ul>
        </div>
        <div class="border center-area">
            <div id="DisplayResult" class="border result">

            </div>
            <div class="border context-box">
                <button onclick="ClearConsole();" type="button">Clear Console</button>
                <button type="button">Select All</button>
                <button type="button">Select Top 100</button>
                <button type="button">Select Top 1,000</button>
                <button type="button">Select Top 10,000</button>
                <textarea id="QueryInput" rows="10" style="width:99%;"></textarea>
                <button type="button">Execute</button>
                <button onclick="ClearQueryInput();" type="button">Clear</button>
            </div>
            <!-- <div id="SiteInfo">
                <p>Site Info</p>
            </div> -->
        </div>
        <div style="clear:both;"></div>
    </div>
</body>



    <script>
        
        var SiteUrl = _spPageContextInfo.webServerRelativeUrl;
        var SiteTitle = _spPageContextInfo.webTitle;

        $(document).ready(function(){

            $('#SiteTitle').text(SiteTitle);
            GetList();
            

        });

        function GetList(){
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/lists',
                type: 'GET',
                async: false,
                headers: {
                'accept': 'application/json;odata=verbose',
                'content-type': 'application/json;odata=verbose',
                },
                success: function (data) {
                    data = data.d.results;
                    var str='';
                    for(i in data){
                        str+='<li>'+data[i].Title+'</li>';
                    }
                    $('#LeftPaneInfo').empty();
                    $('#LeftPaneInfo').append(str);
                },            
            });
        }

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

        function ClearConsole(){
            $('#DisplayResult').empty();
        }   
        function ClearQueryInput(){
            $('#QueryInput').val('');
        }
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
        function Writeline(){
            var str='===========================================================================================<br><br>';
            $('#DisplayResult').append(str);
        }
    </script>


</html>
