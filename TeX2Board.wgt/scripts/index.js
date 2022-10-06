/*
 *
 * index.js for Tex2Board
 * (C) obooklage 2022
 *
 */ 

document.addEventListener("DOMContentLoaded", ContentLoaded);

function ContentLoaded()
{
    console.log("ContentLoaded.");
    window.hiddenbuttons = false;
    window.defaultfontsize = 100; /* 100% */
    window.fontsize = window.defaultfontsize; /* 100% */
    GetParameters();
    // FontSizeDefault();
    /* Futurs use
    if (window.widget) 
    {  
		window.widget.onenter = function() // Quand on quitte le widget
        {
            SaveParameters();
            window.alert("onenter");
		}
        window.widget.onleave = function() // Quand on quitte le widget
        {
            SaveParameters();
            window.alert("onleave");
		}
	}*/
}

function GetParameters()
{
    
    console.log("GetParameters");
    /* Restauration du code source */
    
    if (window.sankore)
    {
        if (window.sankore.preference('parameters')=='saved')
        {
            var MathInput = window.sankore.preference('MathInput');
            if( MathInput != "")
            {
                document.getElementById("MathInput").value = MathInput;
            }
            else
            {
                MakeSampleCode();
            }
            window.hiddenbuttons = (window.sankore.preference('hiddenbuttons', false) === 'true');
            window.fontsize = parseInt(window.sankore.preference('fontsize', 100));
            console.log("Préférences sankore récupérées.");
        }

    }
    else 
    {    
        if (window.localStorage.getItem('MathInput'))
        {
            var MathInput = window.localStorage.getItem('MathInput');
            if( MathInput !="" )
            {
                document.getElementById("MathInput").value=window.localStorage.getItem('MathInput');
                console.log("Préférences localStorage récupérées.");
            }
            else /* Sample TeX */
            {
                MakeSampleCode();
            }
        }
        window.hiddenbuttons = (window.localStorage.getItem('hiddenbuttons', false) === 'true');
        window.fontsize = parseInt(window.localStorage.getItem('fontsize', 100));
    }

    FontSizeSet(window.fontsize);
    
    SetButtonsState(window.hiddenbuttons);

    MakeLaTeX();
}

function MakeSampleCode()
{
    document.getElementById("MathInput").innerHTML="Résoudre l'équation $(x+2)^3-(x-1)^3 = 0$";
}

function SaveParameters()
{
    /* Sauvegarde du code source */
        
    var MathInput = document.getElementById('MathInput').value;
    if (window.widget)
    {
        window.widget.onleave = function()
        {
            window.sankore.setPreference('parameters','saved');
            window.sankore.setPreference('MathInput', MathInput);
            window.sankore.setPreference('hiddenbuttons', window.hiddenbuttons);
            window.sankore.setPreference('fontsize', window.fontsize);
            console.log("Préférences sankore sauvegardées.");
        }
    }
    else
    {
        localStorage.setItem('MathInput', MathInput);
        localStorage.setItem('hiddenbuttons', window.hiddenbuttons);
        localStorage.setItem('fontsize', window.fontsize);
        console.log("Préférences localstorage sauvegardées.");
    }
}

function MakeLaTeX()
{
    console.log("MakeLaTeX");
    var MathInput = document.getElementById('MathInput').value;
    var MathInputCoded = MathInput.replace(/\n{2,}/g, '$\\\\$'); // Replace doubles carriages return
    document.getElementById('MathOutput').textContent = MathInputCoded;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    SaveParameters();
}

function SetButtonsState(hiddenbuttons=true)
{
    if(hiddenbuttons === true)
        window.hiddenbuttons = false;
    else
        window.hiddenbuttons = true;

    SwitchButtonsState();
}

function SwitchButtonsState()
{
    const HideShowButton = document.getElementById("HideShowButton");
    const MakeLaTeXButton = document.getElementById("MakeLaTeXButton");
    const MathInput = document.getElementById("MathInput");
    const FontSizeDefault = document.getElementById("FontSizeDefault");
    const FontSizeDown = document.getElementById("FontSizeDown");
    const FontSizeUp = document.getElementById("FontSizeUp");
    
    if(window.hiddenbuttons === true)
    {
        MathInput.style.display = "block";
        HideShowButton.textContent = "HIDE";
                
        MakeLaTeXButton.style.visibility = 'visible';
        FontSizeDefault.style.visibility = 'visible';
        FontSizeDown.style.visibility = 'visible';
        FontSizeUp.style.visibility = 'visible';
        MakeLaTeXButton.style.visibility = 'visible';
        window.hiddenbuttons = false;
    }
    else
    {
        MathInput.style.display = "none";
        HideShowButton.textContent = "SHOW";
        
        MakeLaTeXButton.style.visibility = 'hidden';
        FontSizeDefault.style.visibility = 'hidden';
        FontSizeDown.style.visibility = 'hidden';
        MakeLaTeXButton.style.visibility = 'hidden';
        FontSizeUp.style.visibility = 'hidden';
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
