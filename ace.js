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

$(document).ready(function() {
  $('.filter-selector').bind('wolfSwitchFilterOut', function(event, filtername, elem) {
    if (filtername == 'ace') {
      $('#'+elem.attr('id')).show();
      $('#acecontainer').remove();
    }
  });
    
  $('.filter-selector').bind('wolfSwitchFilterIn', function(event, filtername, elem) {
    if (filtername == 'ace') {
      
      element = $('#'+elem.attr('id')).parent().append('<div id="acecontainer" style="position: relative; display:block; height: '+aceEditorHeight+'px; width: 100%">\n\
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
      var textarea = $('#'+elem.attr('id'));
        textarea.hide();
        editor.getSession().setValue(textarea.val());
        
        editor.getSession().setValue(textarea.val());
        editor.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
        editor.getSession().setUseWrapMode(aceWrapLines);
        editor.getSession().setMode('ace/mode/'+aceMode);
        editor.getSession().on('change', function(){
          textarea.val(editor.getSession().getValue());
        });
        editor.focus();
    }
  });

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
        
        editor.getSession().setValue(textarea.val());
        editor.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
        editor.getSession().setUseWrapMode(aceWrapLines);
        editor.getSession().setMode('ace/mode/'+aceMode);
        editor.getSession().on('change', function(){
          textarea.val(editor.getSession().getValue());
        });
        editor.focus();
    
  }
  
});