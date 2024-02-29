/*
 *
 * index.js for Tex2Board
 * (C) obooklage 2022
 *
 */

document.addEventListener("DOMContentLoaded", ContentLoaded);

function ContentLoaded()
{
    console.log("ContentLoaded");
    window.hiddenbuttons = false;
    window.defaultfontsize = 100; /* 100% */
    window.fontsize = window.defaultfontsize; /* 100% */
    window.MathInput = "";
    window.lang = "en";

    try
    {
        if(window.sankore)
        {
            window.lang = sankore.locale().substring(0,2);
        }
        else
        {
            const userLocale =
            navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language;
            window.lang = userLocale.substring(0,2);
        }
    }
    catch(err)
    {
            window.lang = "en";
    }

    console.log("window.lang="+window.lang);

    GetParameters();

    if( window.MathInput != "")
    {
        console.log("Set MathInput to "+ window.MathInput);
        document.getElementById("MathInput").value = window.MathInput;
        MakeLaTeX();
    }
    else
    {
       console.log("Set MathInput is EMPTY");
       MakeSampleCode();
    }

    FontSizeSet(window.fontsize);

    ButtonsStateSet(window.hiddenbuttons);

}

function showMessage(message)
{
    if(window.sankore)
        window.sankore.showMessage(message);
    else
        console.log(message);
}

function GetParameters()
{
    console.log("GetParameters");
    /* Restauration */

    if (window.sankore)
    {
        if (window.sankore.preference('parameters')=='saved')
        {
            $("#id_msg_mode").html("GetParameters : Mode Openboard saved");
            window.MathInput = window.sankore.preference('MathInput');
            window.hiddenbuttons = (window.sankore.preference('hiddenbuttons', false) === 'true');
            window.fontsize = parseInt(window.sankore.preference('fontsize', 100));
            console.log("Préférences sankore récupérées.");
        }
        else
        {
            $("#id_msg_mode").html("GetParameters : Mode Openboard NOT saved");
             /* plante ? Non mais trop rapide
             showMessage("window.sankore.preference('parameters') != 'saved'");
              */
        }
    }
    else
    {
        $("#id_msg_mode").html("GetParameters : Mode Navigateur");
        if (window.localStorage.getItem('parameters')=='saved')
        {
            window.MathInput = window.localStorage.getItem('MathInput');
            window.hiddenbuttons = (window.localStorage.getItem('hiddenbuttons', false) === 'true');
            window.fontsize = parseInt(window.localStorage.getItem('fontsize', 100));
            console.log("Préférences localStorage récupérées.");
        }
    }

    $("#id_msg_getparameters").html("GetParameters : window.MathInput="+ window.MathInput);

}

function SaveParameters()
{
    console.log("SaveParameters");
    /* Sauvegarde */

    window.MathInput = document.getElementById('MathInput').value;
    console.log("SaveParameters window.MathInput=" + window.MathInput);
    if (window.widget)
    {
        window.sankore.setPreference('parameters','saved');
        window.sankore.setPreference('MathInput', window.MathInput);
        window.sankore.setPreference('hiddenbuttons', window.hiddenbuttons);
        window.sankore.setPreference('fontsize', window.fontsize);
        console.log("Préférences sankore sauvegardées.");
        $("#id_msg_saveparameters").html("SaveParameters : window.sankore.setPreference="+ window.MathInput);
    }
    else
    {
        localStorage.setItem('parameters', 'saved');
        localStorage.setItem('MathInput', window.MathInput);
        localStorage.setItem('hiddenbuttons', window.hiddenbuttons);
        localStorage.setItem('fontsize', window.fontsize);
        console.log("Préférences localstorage sauvegardées.");
        $("#id_msg_saveparameters").html("SaveParameters : localStorage.setItem="+ window.MathInput);
    }

}

function MakeSampleCode()
{
    document.getElementById("MathInput").innerHTML=sankoreLang[window.lang].sample;
}

function MakeLaTeX()
{
    console.log("MakeLaTeX");
    window.MathInput = document.getElementById('MathInput').value;
    MathInputCoded = MathInput.replace(/\n\r?/g, '<br />'); // Replace carriages return
    document.getElementById('MathOutput').innerHTML = MathInputCoded;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    SaveParameters();
}

function ButtonsStateSet(hiddenbuttons=true)
{
    if(hiddenbuttons === true)
        window.hiddenbuttons = false;
    else
        window.hiddenbuttons = true;

    SwitchButtonsState();
}

function SwitchButtonsState()
{

    const navbar = document.getElementById("navbar");

    if(window.hiddenbuttons === true)
    {
        navbar.style.display = "block";
        window.hiddenbuttons = false;
    }
    else
    {
        navbar.style.display = "none";
        window.hiddenbuttons = true;
    }

    SaveParameters();
}

function FontSizeSet(value)
{
    console.log("FontSizeSet="+value);
    document.getElementsByTagName('body')[0].style.fontSize = value +"%";
    SaveParameters();
}

function FontSizeDefault()
{
    window.fontsize = window.defaultfontsize;
    FontSizeSet(window.fontsize);
}

function FontSizeUp()
{
    window.fontsize = window.fontsize +20;
    FontSizeSet(window.fontsize);
}

function FontSizeDown()
{
    window.fontsize = window.fontsize -20;
    FontSizeSet(window.fontsize);
}
