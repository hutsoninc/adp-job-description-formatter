const disclaimerEl = document.getElementById('disclaimer');
const purposeEl = document.getElementById('purpose');
const responsibilitiesEl = document.getElementById('responsibilities');
const experienceEl = document.getElementById('experience');
const essentialEligibilityEl = document.getElementById('essentialEligibility');
const jobRequirementsEl = document.getElementById('jobRequirements');
const contactInfoEl = document.getElementById('contactInfo');

const submitEl = document.getElementById('submit');
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

submitEl.addEventListener('mousedown', () => {
    
    run();

});

outputEl.onclick = function() {
    this.select();
    document.execCommand('copy');
}

function run() {

    let output = [];
    let contactTextarea;
    let disclaimerTextArea

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
    contactTextarea = contactInfoEl.getElementsByTagName('textarea')[0];

    if(contactTextarea.value.trim().length) {
        output.push(`<p>${contactTextarea.value.trim()}</p>`);
    }

    output = output.join('');

    outputEl.value = output;
    
    setCharacterCount(output.length);

}

function setCharacterCount(count){

    characterCountEl.innerText = `Character count: ${count}/${charLimit}`
    
    if(count > charLimit) {
        characterCountEl.style.color = 'red';
    }else if(count == 0){
        characterCountEl.style.color = '#000';
    }else {
        characterCountEl.style.color = 'green';
    }

}