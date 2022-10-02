/*
 *
 * index.js for TexBoard
 * (C) obooklage 2022
 *
 */ 

document.addEventListener("DOMContentLoaded", ContentLoaded);

function ContentLoaded()
{
    console.log("DOMContentLoaded.");
    window.hiddenbuttons = false;
    GetParameters();
}

function GetParameters()
{
    /* Restauration du code source */
    
    if (window.sankore)
    {
        if (window.sankore.preference('parameters')=='saved')
        {
            var MathInput = window.sankore.preference('MathInput');
            if( MathInput != "")
            {
                document.getElementById("MathInput").value = MathInput;
                console.log("Préférences sankore récupérées.");
            }
            window.hiddenbuttons = (window.sankore.preference('hiddenbuttons') === 'true');
        }
        else
        {
            MakeSampleCode();
        }
    }
    else if (window.localStorage.getItem('MathInput'))
    {
        var MathInput = window.localStorage.getItem('MathInput');
        if( MathInput !="" )
        {
            document.getElementById("MathInput").value=window.localStorage.getItem('MathInput');
            window.hiddenbuttons = (window.localStorage.getItem('hiddenbuttons') === 'true');
            console.log("Préférences localStorage récupérées.");
        }
    }
    else /* Sample TeX */
    {
        MakeSampleCode();
    }
    
    MakeLaTeX();
    HideShowButton(window.hiddenbuttons);
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
            console.log("Préférences sankore sauvegardées.");
        }
    }
    else
    {
        localStorage.setItem('MathInput', MathInput);
        localStorage.setItem('hiddenbuttons', window.hiddenbuttons);
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

function HideShowButton(hiddenbuttons=true)
{
    const HideShowButton = document.getElementById("HideShowButton");
    const MakeLaTeXButton = document.getElementById("MakeLaTeXButton");
    const MathInput = document.getElementById("MathInput");

    if (MathInput.style.display === "none" || window.hiddenbuttons === true) 
    {
        window.hiddenbuttons = false;
        MathInput.style.display = "block";
        MakeLaTeXButton.style.visibility = 'visible';
        HideShowButton.value = "Hide";
        window.hiddenbuttons = false;
    }
    else 
    {
        MathInput.style.display = "none";
        MakeLaTeXButton.style.visibility = 'hidden';
        HideShowButton.value = "Show";
        window.hiddenbuttons = true;
    }
}
