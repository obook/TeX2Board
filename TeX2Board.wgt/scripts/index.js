/*
 *
 * index.js for Tex2Board
 * (C) obooklage 2022-2024
 * JQuery used
 * for OpenBoard >=1.7.0
 */

// document.addEventListener("DOMContentLoaded", ContentLoaded);

async function init(){

/* Variables */
var version = "V3.0 (C) Obook";
var MathInput = '';
var defaultfontsize = 100;
var fontsize = defaultfontsize;
var navbarvisibility = true;
var lang = GetLanguage();
/* Fields */
var MathInputField = $('#MathInputField');
var MathOuputField = $('#MathOuputField');
var id_msg_info = $('id_msg_info');
/* Buttons  */
var OkButton =$('#OkButton');
var FontSizeDefaultButton = $('#FontSizeDefaultButton');
var FontSizeUpButton = $('#FontSizeUpButton');
var FontSizeDownButton = $('#FontSizeDownButton');
/* Objects */
var navbar = $('#navbar');

    ConsoleMessage("init:start");

    $("#id_msg_info").html(version);

    function ConsoleMessage(message) {
        console.log(message);
    }

    function MakeLaTeX()
    {
        ConsoleMessage("MakeLaTeX");
        MathInput = MathInputField.val();
        MathInputCoded = MathInput.replace(/\n\r?/g, '<br />'); // Replace carriages return
        MathOuputField.html(MathInputCoded);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        SavePreferences();
    }

    function GetLanguage()
    {
    let lang = 'en';
        try {
            if(window.sankore) {
                /* v1.7.0 obsolete : sankore.locale() */
                lang =  window.sankore.lang.substring(0,2);
                ConsoleMessage("GetLanguage:Mode window.sankore ["+lang+"]");
            }
            else {
                const userLocale =
                navigator.languages && navigator.languages.length
                ? navigator.languages[0]
                : navigator.language;
                lang = userLocale.substring(0,2);
                ConsoleMessage("GetLanguage:Mode navigator ["+lang+"]");
            }
        }
        catch(err) {
                ConsoleMessage("GetLanguage:Try failed ["+lang+"]");
        }
        return(lang);
    }

    function MakeSampleCode()
    {
        ConsoleMessage("MakeSampleCode");
        MathInput = sankoreLang[lang].sample;
        $("#MathInputField").html(MathInput);
    }

    function SetNavbarVisibility(navbarvisibility=true)
    {
        if(navbarvisibility === false) {
            ConsoleMessage("SetNavbarVisibility:hide");
            navbar.hide();
        } else {
            ConsoleMessage("SetNavbarVisibility:show");
            navbar.show();
        }
    }

    function SwitchNavbarVisibility()
    {

        if(navbarvisibility === true)
            navbarvisibility = false;
       else
            navbarvisibility = true;

        SetNavbarVisibility(navbarvisibility);
        SavePreferences();
    }

    function FontSizeSet(value)
    {
        ConsoleMessage("FontSizeSet="+value);
        document.getElementsByTagName('body')[0].style.fontSize = value +"%";
        SavePreferences();
    }

    function SavePreferences()
    {
        /* Sauvegarde */
        ConsoleMessage("SavePreferences " + MathInput + " " + navbarvisibility + " " + fontsize);
        if (window.widget)
        {
            window.sankore.setPreference('parameters','saved');
            window.sankore.setPreference('MathInput', MathInput);
            window.sankore.setPreference('navbarvisibility', navbarvisibility);
            window.sankore.setPreference('fontsize', fontsize);
            ConsoleMessage("SavePreferences sankore done.");
        }
        else
        {
            localStorage.setItem('parameters', 'saved');
            localStorage.setItem('MathInput', MathInput);
            localStorage.setItem('navbarvisibility', navbarvisibility);
            localStorage.setItem('fontsize', fontsize);
            ConsoleMessage("SavePreferences localstorage done.");
        }

    }

    FontSizeUpButton.click(
        function(){
            fontsize = fontsize +20;
            FontSizeSet(fontsize);
    });

    FontSizeDownButton.click(
        function(){
            if (fontsize>20) {
                fontsize = fontsize -20;
                FontSizeSet(fontsize);
            }
    });

    FontSizeDefaultButton.click(
        function(){
            fontsize = defaultfontsize;
            FontSizeSet(fontsize);
    });

     MathOuputField.click(
        function(){
            SwitchNavbarVisibility();
    });

    OkButton.click(
        function(){
            MakeLaTeX();
    });

    /* MAIN PGM */

    if(window.sankore) {
        if( await window.sankore.async.preference('parameters') )
        {
            MathInput = await window.sankore.async.preference('MathInput', MathInput);
            navbarvisibility = (await window.sankore.async.preference('navbarvisibility', false) === 'true');
            fontsize = await window.sankore.async.preference('fontsize', 100);
            ConsoleMessage("sankore.preference :"+ MathInput+" "+navbarvisibility+" "+fontsize);
        } else {
            ConsoleMessage("No preferences found");
            MakeSampleCode();
            SavePreferences();
        }

    }
    else {
        if (window.localStorage.getItem('parameters') ) {
            MathInput = window.localStorage.getItem('MathInput');
            navbarvisibility = (window.localStorage.getItem('navbarvisibility', false) === 'true');
            fontsize = parseInt(window.localStorage.getItem('fontsize', 100));
            ConsoleMessage("localStorage :"+ MathInput+" "+navbarvisibility+" "+fontsize);
        }
        else {
            ConsoleMessage("No preferences found");
            MakeSampleCode();
            SavePreferences();
        }
    }

    /* Set navbar visibility */

    SetNavbarVisibility(navbarvisibility);

    /* Set Font size Source */

    FontSizeSet(fontsize);

    /* Set Code Source */

    if( MathInput != "") {
        ConsoleMessage("Set MathInput to "+ MathInput);
        $("#MathInputField").val(MathInput);
        MakeLaTeX();
    }
    else {
       ConsoleMessage("Set MathInput is EMPTY");
       MakeSampleCode();
    }

    ConsoleMessage("init:end");
}
