/*
 * Wolf CMS - Content Management Simplified. <http://www.wolfcms.org>
 * Copyright (C) 2008-2010 Martijn van der Kleijn <martijn.niji@gmail.com>
 * 
 * Ace filter for Wolf CMS
 * Code editor and syntax highlighter based on Ajax.org Cloud9 Editor.
 *  
 * @package Plugins
 * @subpackage ace
 *
 * @author Marek Murawski <http://marekmurawski.pl>
 * @copyright Marek Murawski, 2012
 * @license http://www.gnu.org/licenses/gpl.html GPLv3 license
 * @license Ace http://opensource.org/licenses/BSD-3-Clause BSD
 * 
 */

var aceEditors = Array();
var Aces = Array();

function insertModeChange(elem) {
  	var el = '<div id="aceoptions' + partID + '" style="display:inline-block"><label for="acemode' + partID + '" style="margin: 0 4px 0 20px;" id="acemode_'+partID+'_label">Mode</label>'+
		'<select id="acemode_' + partID + '_select">'+
		'<option value="text">Plain text</option>'+
		'<option value="css">CSS</option>'+
		'<option value="html">HTML</option>'+
		'<option value="javascript">Javascript</option>'+
		'<option value="json">JSON</option>'+
		'<option value="markdown">Markdown</option>'+
		'<option value="php">PHP</option>'+
		'<option value="textile">Textile</option>'+
		'<option value="xml">XML</option>'+
		'</select><a href="../../plugin/ace/settings" target="_blank"><img style="margin-left: 16px;" src="../../../wolf/icons/settings-16.png" alt=""></a></div>';
      
      elem.parent().append(el);
}

function insertPageAce(elem)  {
      partID = elem.attr('id').slice(5, -8);

      cookieMode = $.cookie('aceM'+partID);
                 if (cookieMode !== null) {
                   aceMode = cookieMode; // override mode from cookie
                } 
      topScroll = $.cookie('aceScr'+partID);

      insertModeChange($('#part_'+partID+'_filter_id'));
 
      element = $('#part_'+partID+'_content').parent().append('<div id="aceeditor' + partID + '" style="position: relative; display:block; width:100%; height: '+aceEditorHeight+'px">\n\
                                                        </div>');
      var editor = ace.edit('aceeditor' + partID);
      
        editor.setTheme('ace/theme/'+aceTheme);
        editor.setBehavioursEnabled(true);
        editor.setScrollSpeed(aceScrollSpeed);
        editor.setFontSize(aceFontSize+'px');
        editor.setPrintMarginColumn(aceWrapRange);
        editor.setHighlightActiveLine(true);
        editor.setHighlightSelectedWord(true);
      var textarea = $('#part_'+partID+'_content');
        textarea.hide();
        editor.getSession().setValue(textarea.val());
        
        editor.getSession().setValue(textarea.val());
        editor.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
        editor.getSession().setUseWrapMode(aceWrapLines);
        editor.getSession().setMode('ace/mode/'+aceMode);
 
            $('#acemode_'+partID+'_select').val(aceMode);
            editor.getSession().setMode('ace/mode/'+aceMode);

                 if (topScroll !== null) {
                   editor.getSession().setScrollTop(topScroll);
                } 

        editor.getSession().on('change', function(){
          textarea.val(editor.getSession().getValue());
           setConfirmUnload(true);
        });
        
        aceEditors[partID] = editor; // store editor in global array
}


$(document).ready(function() {




 
  $('div#part-tabs ul.tabNavigation a').live('pageTabFocus', function(event, i, hash) {
   // alert(hash);
        //    alert(i);
        
    if ($('#part_'+i+'_filter_id :selected').val() == 'ace') {
        if (Aces[i] === true) {
            elem = $('#part_'+i+'_content');
            insertPageAce(elem);
            Aces[i] = 'shown';
            
        }

          //  alert('Dodano');
 
        aceEditors[i].getSession().on('changeScrollTop', function(num){
          if (typeof(num)=='number') {$.cookie('aceScr'+i,num);} else
            {$.removeCookie('aceScr'+i);}
       //alert(num);
        });
        
        $('#acemode_'+i+'_select').live('change',function(){
          aceEditors[i].getSession().setMode('ace/mode/' + $(this).val());
          $.cookie('aceM'+i,$(this).val());
        })      
    }

  });
  
  $('.filter-selector').live('wolfSwitchFilterOut', function(event, filtername, elem) {
    if (filtername == 'ace') {
      partID = elem.attr('id').slice(5, -8);
      //alert(partID);
      $('#'+elem.attr('id')).show();
           $('#aceeditor' + partID).remove();
           $('#aceoptions' + partID).remove();
           Aces[partID] = 'switchedOut';
    }
  });
    
  $('.filter-selector').live('wolfSwitchFilterIn', function(event, filtername, elem) {
    if (filtername == 'ace') {
     partID = elem.attr('id').slice(5, -8);
     if (Aces[partID] == 'switchedOut') {
       insertPageAce(elem);
     } else {
         Aces[partID] = true;
     }
    }
  });    
    
 $('#add-part-button').live('click', function(){
   ind = Aces.length;
   Aces[ind] = 'switchedOut';
 })
    
    
if (($("#layout_content").length > 0)&&(typeof(setCM) === 'undefined')&&(aceLayoutIntegrate===true)) {
      element = $('#layout_content').parent().append('<div id="acecontainer" style="position: relative; display:block; height: '+aceEditorHeight+'px; width: 100%">\n\
                                                        <div id="aceeditor" style="width:100%; height: '+aceEditorHeight+'px">\n\
                                                        </div></div>');
   
      var editor = ace.edit('aceeditor');
        editor.setTheme('ace/theme/'+aceTheme);
        editor.setBehavioursEnabled(true);
        editor.setScrollSpeed(aceScrollSpeed);
        editor.setFontSize(aceFontSize+'px');

        editor.setPrintMarginColumn(aceWrapRange);
        editor.setHighlightActiveLine(true);
        editor.setHighlightSelectedWord(true);
        var textarea = $('#layout_content');
        textarea.hide();
        editor.getSession().setValue(textarea.val());
        
        editor.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
        editor.getSession().setUseWrapMode(aceWrapLines);
        editor.getSession().setMode('ace/mode/'+aceMode);
        editor.getSession().on('change', function(){
          textarea.val(editor.getSession().getValue());
          setConfirmUnload(true);          
        });
        editor.focus();
    
  }
  
});