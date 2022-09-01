"use strict";

const simulationContainer = document.querySelector('.lift-simulation')
const btnGenerate = document.querySelector('.btn-generate')
const floorsInput = document.getElementById('floorsInput')
const liftsInput = document.getElementById('liftsInput')

btnGenerate.addEventListener('click', function (e) {
    handleFloors()
})

function handleFloors() {
    const floorValue = +floorsInput.value
    for (let i = 0 ; i <= floorValue - 1; i++) {
        const html =
            `
            <div class="floor ${i === 0 ? 'lastFloor' : ''}" data-floor=${i}>
                <div class="lift-buttons">
                    <button class="btn btn-up" id="btn-up" data-floor=${i}>
                        &uarr;
                    </button>
                    <button class="btn btn-down" id="btn-down" data-floor=${i}>
                        &darr;
                    </button>
                </div>
                ${i === 0 ? `
                <div class="lifts">
                    ${handleLifts()}
                </div>
                ` : ``}
            </div>
            `;
            
        simulationContainer.insertAdjacentHTML('afterend', html)
    }

}

function handleLifts() {
    let liftsHtml = ''
    for (let i = 0; i <= +liftsInput.value - 1; i++) {
        liftsHtml += `
            <div class="lift" data-lift=${i + 1}>
                <div class="lift-left"></div>
                <div class="lift-right"></div>
            </div>
        `
    }
    return liftsHtml
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'btn-up') {
       
    }
    if (e.target && e.target.id === 'btn-down') {
       
    }
});