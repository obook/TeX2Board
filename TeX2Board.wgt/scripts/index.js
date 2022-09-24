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
            console.log("Préférences localStorage récupérées.");
        }
    }
    else /* Sample TeX */
    {
        MakeSampleCode();
    }
    
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
            console.log("Préférences sankore sauvegardées.");
        }
    }
    else
    {
        localStorage.setItem('MathInput', MathInput);
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

function HideShowButton()
{
    const HideShowButton = document.getElementById("HideShowButton");
    //const MakeLaTeXButton = document.getElementById("MakeLaTeXButton");
    const MathInput = document.getElementById("MathInput");
    
    if (MathInput.style.display === "none") 
    {
        MathInput.style.display = "block";
        // MakeLaTeXButton.style.display = "block";
        HideShowButton.value = "Hide";
    }
    else 
    {
        MathInput.style.display = "none";
        // MakeLaTeXButton.style.display = "none";
        HideShowButton.value = "Code";
    }

}

