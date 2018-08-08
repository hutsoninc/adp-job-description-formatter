const disclaimerEl = document.getElementById('disclaimer');
const purposeEl = document.getElementById('purpose');
const responsibilitiesEl = document.getElementById('responsibilities');
const experienceEl = document.getElementById('experience');
const essentialEligibilityEl = document.getElementById('essentialEligibility');
const jobRequirementsEl = document.getElementById('jobRequirements');
const contactInfoEl = document.getElementById('contactInfo');

const contactInputEl = contactInfoEl.getElementsByTagName('input')[0];

const textareaEls = document.querySelectorAll('textarea');

const submitEl = document.getElementById('submit');
const clearEl = document.getElementById('clear');
const characterCountEl = document.getElementById('characterCount');
const outputEl = document.getElementById('output');

const charLimit = 4000;

const sections = [
    {
        el: purposeEl,
        type: 'text'
    },
    {
        el: responsibilitiesEl,
        type: 'list'
    },
    {
        el: experienceEl,
        type: 'list'
    },
    {
        el: essentialEligibilityEl,
        type: 'list'
    },
    {
        el: jobRequirementsEl,
        type: 'list',
        subLists: true
    }
];

for(let i = 0; i < textareaEls.length; i++){

    textareaEls[i].addEventListener('keyup', () => {

        run();

    });

}

submitEl.addEventListener('mousedown', () => {
    
    run();

});

clearEl.addEventListener('mousedown', () => {
    
    clearTextareas();

});

submitEl.addEventListener('keyup', e => {
    
    if(e.keyCode === 13){
        run();
    }

});

clearEl.addEventListener('keyup', e => {
    
    if(e.keyCode === 13){
        clearTextareas();
    }

});

outputEl.onclick = function() {
    this.select();
    document.execCommand('copy');
}

function run() {

    let output = [];
    let disclaimerTextArea;

    // Get contact info
    disclaimerTextArea = disclaimerEl.getElementsByTagName('textarea')[0];

    if(disclaimerTextArea.value.trim().length) {
        output.push(`<p><b>${disclaimerTextArea.value.trim()}</b></p>`);
    }

    for(let i = 0; i < sections.length; i++) {

        let section, el, h2El, textareaEl, header, description;

        section = sections[i];
        el = section.el;

        h2El = el.getElementsByTagName('h2')[0];
        
        header = `<h2>${h2El.innerText.trim()}</h2>`;
        
        if(!section.subLists) {
            
            textareaEl = el.getElementsByTagName('textarea')[0];

            if(textareaEl.value.trim().length){
    
                if(section.type == 'text') {
                    description = `<p>${textareaEl.value.trim()}</p>`;
                }
                
                if(section.type == 'list') {
                    description = `<ul><li>${textareaEl.value.trim().replace(/\n/g, '</li><li>')}</li></ul>`
                }
                
                output.push(header);
                output.push(description);

            }

        }else {

            let subSections = el.getElementsByTagName('div');
            var headerSet = false;

            for(let j = 0; j < subSections.length; j++) {

                let subHeaderEl, subDescriptionEl, subHeader, subDescription;

                subHeaderEl = subSections[j].getElementsByTagName('h3')[0];
                subDescriptionEl = subSections[j].getElementsByTagName('textarea')[0];

                if(subDescriptionEl.value.trim().length){

                    if(!headerSet) {
                        output.push(header);
                        headerSet = true;
                    }

                    subHeader = `<h3>${subHeaderEl.innerText.trim()}</h3>`;
                    subDescription = `<ul><li>${subDescriptionEl.value.trim().replace(/\n/g, '</li><li>')}</li></ul>`

                    output.push(subHeader);
                    output.push(subDescription);

                }

            }

        }
    
    }

    // Get contact info
    if(contactInputEl.value.trim().length) {
        output.push(`<p>${contactInputEl.value}</p>`);
    }

    output = output.join('');

    output = output.replace(/•\t/g, '');

    outputEl.value = output;
    
    setCharacterCount(output.length);

}

function clearTextareas(){
    for(let i = 0; i < textareaEls.length; i++){
        textareaEls[i].value = '';
    }

    run();
}

function setCharacterCount(count){

    characterCountEl.innerText = `Character count: ${count}/${charLimit}`
    
    if(count > charLimit) {
        characterCountEl.style.backgroundColor = 'red';
    }else if(count == 0){
        characterCountEl.style.backgroundColor = '#000';
    }else {
        characterCountEl.style.backgroundColor = 'green';
    }

}

run();