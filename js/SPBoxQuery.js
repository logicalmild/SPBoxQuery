
        
        var SiteUrl = _spPageContextInfo.webServerRelativeUrl;
        var SiteTitle = _spPageContextInfo.webTitle;

        $(document).ready(function(){

            LoadHTML('Layout');
            LoadJS('GetList');
            
            $('#SiteTitle').text(SiteTitle);
            
            

        });

        function LoadHTML(component){
            var Url = 'https://logicalmild.github.io/SP-Terminal/component/'+component+'/'+component+'.js';
            $.ajax({ type: "GET",   
                url: Url,
                async: false,
                success : function(text)
                {
                    response= text;
                
                },
                error: function(err){
                    Load('#AppZone' ,MappingPage[1].Url); // Home
                },
            
                });
            
            // $(Elem).empty();
            $(Elem).append(response);

        }
        function LoadJS(module){
            var Url = 'https://logicalmild.github.io/SP-Terminal/module/'+module+'/'+module+'.js';
            $.ajax({
                url: Url,
                dataType: "script",
                success : function(data)
                {
                    console.log('Load:'+Url+' complete');
                },
        
            });
        }

        function ClearConsole(){
            $('#DisplayResult').empty();
        }   
        function ClearQueryInput(){
            $('#QueryInput').val('');
        }
        
        function Writeline(){
            var str='===========================================================================================<br><br>';
            $('#DisplayResult').append(str);
        }
