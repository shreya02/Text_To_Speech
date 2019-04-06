//Init Speech
const synth= window.speechSynthesis
//DOM Elements
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init voices array
let voices=[];
const getVoices = () =>
{
    voices= synth.getVoices();
    //loop through voices and create option
    voices.forEach(voice =>
    {
        const option =document.createElement('option');
        option.textContent=voice.name + '('+ voice.lang+')';

        //set needed attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
    //console.log(voices);
};
    getVoices();
    if(synth.onvoiceschanged !== undefined)
    {
        synth.onvoiceschanged=getVoices;
    }
//speak 
const speak =() =>
{
    if(synth.speaking)
    {
        console.log('Speaking');
        return;
    }
    if(textInput.value!=='')
    {
        body.style.background = '#141414 url(wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speak text
        const speakText= new SpeechSynthesisUtterance(textInput.value);

            speakText.onend = e =>
            {
                console.log('FInsihed speaking');
                body.style.background = '#141414';
            }

        //speak console.error(
            speakText.onerror =e =>
            {
                console.error('Error came');
            }

            //selected voice
            const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');


            //looping through voices to check if the one we select matches th one in api
            voices.forEach(voice =>
                {
                    if(voice.name === selectedVoice){
                        speakText.voice=voice;
                    }
                });
                
                //set pitch and rate
                speakText.rate = rate.value;
                speakText.pitch= pitch.value;
                //speak
                synth.speak(speakText);
            }
        };


                //event listener
                textForm.addEventListener('submit',e =>
                {
                    e.preventDefault();
                    speak();
                    textInput.blur();
                });

                //Rate value change
                rate.addEventListener('change', e => {
                    rateValue.textContent=rate.value
                });
                //Pitch change
                pitch.addEventListener('change', e => {
                    pitchValue.textContent=pitch.value
                });
                //voice select change
                voiceSelect.addEventListener('change', e=> speak());
        
