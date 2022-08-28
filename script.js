"use strict";

const simulationContainer = document.querySelector('.lift-simulation')
const btnGenerate = document.querySelector('.btn-generate')
const floorsInput = document.getElementById('floorsInput')
const liftsInput = document.getElementById('liftsInput')

btnGenerate.addEventListener('click', function (e) {
    handleFloors()
})

function handleFloors() {
    for (let i = +floorsInput.value - 1; i >= 0; i--) {
        const html =
            `
            <div class="floor ${i === +floorsInput.value - 1 ? 'lastFloor' : ''}" data-floor=${i + 1}>
                <div class="lift-buttons">
                    <button class="btn btn-up" id="btn-up" data-floor=${i + 1}>
                        &uarr;
                    </button>
                    <button class="btn btn-down" id="btn-down" data-floor=${i + 1}>
                        &darr;
                    </button>
                </div>
                ${i === +floorsInput.value - 1 ? `
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