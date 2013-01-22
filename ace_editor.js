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
    var el = '<div id="aceoptions' + pID + '" style="display:inline-block"><label for="acemode' + pID + '" style="margin: 0 4px 0 20px;" id="acemode_'+pID+'_label">Mode</label>'+
    '<select id="acemode_' + pID + '_select">'+
    '<option value="text">Plain text</option>'+
    '<option value="css">CSS</option>'+
    '<option value="html">HTML</option>'+
    '<option value="javascript">Javascript</option>'+
    '<option value="json">JSON</option>'+
    '<option value="markdown">Markdown</option>'+
    '<option value="php">PHP</option>'+
    '<option value="textile">Textile</option>'+
    '<option value="xml">XML</option>'+
    '</select> <a href="../../plugin/ace/settings" target="_blank">[config Ace]</a></div>';
      
    elem.parent().append(el);
}

function insertPageAce(elem)  {
    pID = elem.attr('id').slice(5, -8);

    cookieMode = $.cookie('aceM'+pID);
    if (cookieMode !== null) {
        aceMode = cookieMode; // override mode from cookie
    } 
    topScroll = $.cookie('aceScr'+pID);
    curPos = ($.cookie('aceCur'+pID) !== null) ? $.cookie('aceCur'+pID).split('-') : null;      

    insertModeChange($('#part_'+pID+'_filter_id'));
 
    element = $('#part_'+pID+'_content').parent().append('<div id="aceeditor' + pID + '" style="position: relative; display:block; width:100%; height: '+aceEditorHeight+'px">\n\
                                                        </div>');
    var ed = ace.edit('aceeditor' + pID);
      
    ed.setTheme('ace/theme/'+aceTheme);
    ed.setBehavioursEnabled(true);
    ed.setScrollSpeed(aceScrollSpeed);
    ed.setFontSize(aceFontSize+'px');
    ed.setPrintMarginColumn(aceWrapRange);
    ed.setHighlightActiveLine(aceHighlightActiveLine);
    ed.setHighlightSelectedWord(true);
    var txa = $('#part_'+pID+'_content');
    txa.hide();
    ed.getSession().setValue(txa.val());
        
    ed.getSession().setValue(txa.val());
    ed.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
    ed.getSession().setUseWrapMode(aceWrapLines);
    ed.getSession().setMode('ace/mode/'+aceMode);
 
    $('#acemode_'+pID+'_select').val(aceMode);
    ed.getSession().setMode('ace/mode/'+aceMode);

    if (curPos !== null) {
        ed.gotoLine(parseInt(curPos[0]) + 1, parseInt(curPos[1]));
    } 
    if (topScroll !== null) {
        ed.getSession().setScrollTop(topScroll);
    } 

    ed.getSession().on('change', function(){
        txa.val(ed.getSession().getValue());
        setConfirmUnload(true);
    });
        
    aceEditors[pID] = ed; // store editor in global array
    ed.focus();
}

function insertSnippetAce()  {
    var pID = window.location.pathname.split("/").pop(); //extract snippet ID from path, TODO: maybe better from FORM??
    cookieMode = $.cookie('aceM'+pID);
    if (cookieMode !== null) {
        aceMode = cookieMode; // override mode from cookie
    } 
    topScroll = $.cookie('aceScr'+pID);
    curPos = ($.cookie('aceCur'+pID) !== null) ? $.cookie('aceCur'+pID).split('-') : null;      

    insertModeChange($('#snippet_filter_id'));
 
    element = $('#snippet_content').parent().append('<div id="aceeditor" style="position: relative; display:block; width:100%; height: '+aceEditorHeight+'px">\n\
                                                        </div>');
    var ed = ace.edit('aceeditor');
      
    ed.setTheme('ace/theme/'+aceTheme);
    ed.setBehavioursEnabled(true);
    ed.setScrollSpeed(aceScrollSpeed);
    ed.setFontSize(aceFontSize+'px');
    ed.setPrintMarginColumn(aceWrapRange);
    ed.setHighlightActiveLine(aceHighlightActiveLine);
    ed.setHighlightSelectedWord(true);
    var txa = $('#snippet_content');
    txa.hide();
    ed.getSession().setValue(txa.val());
        
    ed.getSession().setValue(txa.val());
    ed.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
    ed.getSession().setUseWrapMode(aceWrapLines);
    ed.getSession().setMode('ace/mode/'+aceMode);
 
    $('#acemode_'+pID+'_select').val(aceMode);
    ed.getSession().setMode('ace/mode/'+aceMode);

    if (curPos !== null) {
        ed.gotoLine(parseInt(curPos[0]) + 1, parseInt(curPos[1]));
    }             
    if (topScroll !== null) {
        ed.getSession().setScrollTop(topScroll);
    } 

    ed.getSession().on('change', function(){
        txa.val(ed.getSession().getValue());
        setConfirmUnload(true);
    });
        
    ed.getSession().on('changeScrollTop', function(num){
        if (typeof(num)==='number') {
            $.cookie('aceScr'+pID,num);
        } else
{
            $.removeCookie('aceScr'+pID);
        }
    });
    
    ed.getSession().selection.on('changeCursor', function(num){
        $.cookie('aceCur'+pID,ed.getSession().selection.getCursor().row + '-' + ed.getSession().selection.getCursor().column);
    });
        
    $('#acemode_'+pID+'_select').live('change',function(){
        ed.getSession().setMode('ace/mode/' + $(this).val());
        $.cookie('aceM'+pID,$(this).val());
    });
    ed.focus();
}


$(document).ready(function() {

    if (aceCookieLife!==-1) {
        $.cookie.defaults = {
            expires: aceCookieLife
        };
    }
    $('div#part-tabs ul.tabNavigation a').live('pageTabFocus', function(event, i, hash) {
        if ($('#part_'+i+'_filter_id :selected').val() === 'ace') {
            if (Aces[i] === true) {
                elem = $('#part_'+i+'_content');
                insertPageAce(elem);
                Aces[i] = 'shown';
            
            }
 
            aceEditors[i].getSession().on('changeScrollTop', function(num){
                if (typeof(num)==='number') {
                    $.cookie('aceScr'+i,num);
                } else
{
                    $.removeCookie('aceScr'+i);
                }
            });
    
            aceEditors[i].getSession().selection.on('changeCursor', function(num){
                $.cookie('aceCur'+i,aceEditors[i].getSession().selection.getCursor().row + '-' + aceEditors[i].getSession().selection.getCursor().column);
            });
        
            $('#acemode_'+i+'_select').live('change',function(){
                aceEditors[i].getSession().setMode('ace/mode/' + $(this).val());
                $.cookie('aceM'+i,$(this).val());
            });  
        }

    });
  
    $('.filter-selector').live('wolfSwitchFilterOut', function(event, filtername, elem) {
        var pID = elem.attr('id').slice(5, -8);
        if (filtername === 'ace') {
            $('#'+elem.attr('id')).show();
            if ($('#pagetitle').length > 0) { // we are in PAGE
                $('#aceeditor' + pID).remove();
                $('#aceoptions' + pID).remove();
                Aces[pID] = 'switchedOut';
            }
            if ($('#snippet_name').length > 0) { // we are in SNIPPET
                $('#aceeditor').remove();
                $('#aceoptions1').remove(); 
                Aces[1] = false;
                aceEditors[1] = false;
            }           
        }
        if (filtername==='') {
            Aces[pID] = 'switchedOut';
        };
    });
    
    $('.filter-selector').live('wolfSwitchFilterIn', function(event, filtername, elem) {
        var pID = elem.attr('id').slice(5, -8);
        if (filtername === 'ace') {
            if ($('#pagetitle').length > 0) { // we are in PAGE
                if (Aces[pID] === 'switchedOut') {
                    insertPageAce(elem);
                } else {
                    Aces[pID] = true;
                }
            }
            if ($('#snippet_name').length > 0) { // we are in SNIPPET
                insertSnippetAce();
            }
        }
        else {
            Aces[pID] = 'switchedOut';
        }
    });    

    // needed to provide ace activation after adding part
    $('#add-part-button').live('click', function(){
        ind = Aces.length;
        Aces[ind] = 'switchedOut';
    });
 
    
    if (($("#layout_content").length > 0)&&(typeof(setCM) === 'undefined')&&(aceLayoutIntegrate===true)) {
        element = $('#layout_content').parent().append('<div id="aceeditor" style="position: relative; display:block; width:100%; height: '+aceEditorHeight+'px">\n\
                                                        </div>');
        pID = window.location.pathname.split("/").pop(); //extract layout ID from path, TODO: maybe better from FORM??
        cookieMode = $.cookie('aceM'+pID);
        if (cookieMode !== null) {
            aceMode = cookieMode; // override mode from cookie
        } 
        topScroll = $.cookie('aceScr');
        curPos = ($.cookie('aceCur'+pID) !== null) ? $.cookie('aceCur'+pID).split('-') : null;      
      
        insertModeChange($('#aceeditor'));
      
        var ed = ace.edit('aceeditor');
      
        ed.setTheme('ace/theme/'+aceTheme);
        ed.setBehavioursEnabled(true);
        ed.setScrollSpeed(aceScrollSpeed);
        ed.setFontSize(aceFontSize+'px');
        ed.setPrintMarginColumn(aceWrapRange);
        ed.setHighlightActiveLine(aceHighlightActiveLine);
        ed.setHighlightSelectedWord(true);
        var textarea = $('#layout_content');
        textarea.hide();
        ed.getSession().setValue(textarea.val());
        
        ed.getSession().setWrapLimitRange(aceWrapRange,aceWrapRange);
        ed.getSession().setUseWrapMode(aceWrapLines);
        ed.getSession().setMode('ace/mode/'+aceMode);
 
        $('#acemode_'+pID+'_select').val(aceMode);
        ed.getSession().setMode('ace/mode/'+aceMode);

        if (curPos !== null) {
            ed.gotoLine(parseInt(curPos[0]) + 1, parseInt(curPos[1]));
        }             
        if (topScroll !== null) {
            ed.getSession().setScrollTop(topScroll);
        } 

        ed.getSession().on('change', function(){
            textarea.val(ed.getSession().getValue());
            setConfirmUnload(true);
        });
        
        ed.getSession().on('changeScrollTop', function(num){
            if (typeof(num)==='number') {
                $.cookie('aceScr',num);
            } else
{
                $.removeCookie('aceScr');
            }
        });
        
        $('#acemode_'+pID+'_select').live('change',function(){
            ed.getSession().setMode('ace/mode/' + $(this).val());
            $.cookie('aceM'+pID,$(this).val());
        });
    
        ed.getSession().selection.on('changeCursor', function(num){
            $.cookie('aceCur'+pID,ed.getSession().selection.getCursor().row + '-' + ed.getSession().selection.getCursor().column);
        });    
        
        ed.focus();
    
    }
  
});