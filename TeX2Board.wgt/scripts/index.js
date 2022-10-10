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
    window.MathInput = "";

    GetParameters();

    if( window.MathInput != "")
        document.getElementById("MathInput").value = window.MathInput;
    else
       MakeSampleCode();

    FontSizeSet(window.fontsize);
    
    ButtonsStateSet(window.hiddenbuttons);

    MakeLaTeX();
}

function GetParameters()
{
    console.log("GetParameters");
    /* Restauration */
    
    if (window.sankore)
    {
        if (window.sankore.preference('parameters')=='saved')
        {
            window.MathInput = window.sankore.preference('MathInput');
            window.hiddenbuttons = (window.sankore.preference('hiddenbuttons', false) === 'true');
            window.fontsize = parseInt(window.sankore.preference('fontsize', 100));
            console.log("Préférences sankore récupérées.");
        }
    }
    else 
    {    
        if (window.localStorage.getItem('parameters')=='saved')
        {
            window.MathInput = window.localStorage.getItem('MathInput');
            window.hiddenbuttons = (window.localStorage.getItem('hiddenbuttons', false) === 'true');
            window.fontsize = parseInt(window.localStorage.getItem('fontsize', 100));
            console.log("Préférences localStorage récupérées.");
        }
    }
}

function SaveParameters()
{
    console.log("SaveParameters");
    /* Sauvegarde */
        
    window.MathInput = document.getElementById('MathInput').value;
    if (window.widget)
    {
        window.sankore.setPreference('parameters','saved');
        window.sankore.setPreference('MathInput', window.MathInput);
        window.sankore.setPreference('hiddenbuttons', window.hiddenbuttons);
        window.sankore.setPreference('fontsize', window.fontsize);
        console.log("Préférences sankore sauvegardées.");
    }
    else
    {
        localStorage.setItem('parameters', 'saved');
        localStorage.setItem('MathInput', window.MathInput);
        localStorage.setItem('hiddenbuttons', window.hiddenbuttons);
        localStorage.setItem('fontsize', window.fontsize);
        console.log("Préférences localstorage sauvegardées.");
    }
}

function MakeSampleCode()
{
    /* document.getElementById("MathInput").innerHTML="1) Déterminer l'ensemble de définition de la fonction $f$ définie par $ f(x)=\\dfrac{2x+1}{\\sqrt{x-3}}$ \n2) Résoudre l'équation $(x+2)^3-(x-1)^3 = 0$"; */
    document.getElementById("MathInput").innerHTML="Sample : solve $ \\dfrac{2x+1}{\\sqrt{x-3}}=0 $";
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
    const HideShowButton = document.getElementById("HideShowButton");
    const MakeLaTeXButton = document.getElementById("MakeLaTeXButton");
    const MathInput = document.getElementById("MathInput");
    const FontSizeDefault = document.getElementById("FontSizeDefault");
    const FontSizeDown = document.getElementById("FontSizeDown");
    const FontSizeUp = document.getElementById("FontSizeUp");
    
    if(window.hiddenbuttons === true)
    {
        MathInput.style.display = "block";
        //HideShowButton.textContent = "HIDE";
        HideShowButton.style.visibility = 'visible';
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
        //HideShowButton.textContent = "SHOW";
        HideShowButton.style.visibility = 'hidden';
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
