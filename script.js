"use strict";

const simulationContainer = document.querySelector('.lift-simulation')
const btnGenerate = document.querySelector('.btn-generate')
const floorsInput = document.getElementById('floorsInput')
const liftsInput = document.getElementById('liftsInput')

btnGenerate.addEventListener('click', function(e){
   console.log(typeof +floorsInput.value, typeof +liftsInput.value)
   handleFloors()
})

function handleFloors(){
    for( let i=+floorsInput.value - 1; i>=0; i--){
        const html = 
            `
            <div class="floor ${i === +floorsInput.value - 1 ? 'lastFloor' : ''}">
                <div class="lift-buttons">
                    <button class="btn">
                        &uarr;
                    </button>
                    <button class="btn">
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

function handleLifts(){
    // const floorContainer = document.querySelector('.floor')
    // console.log(floorContainer)
    let liftsHtml = ''
    for( let i = 0 ; i <= +liftsInput.value - 1; i++){
        console.log(i, +liftsInput.value)
        liftsHtml += `
            <div class="lift">
                <div class="lift-left"></div>
                <div class="lift-right"></div>
            </div>
        `
    }
    return liftsHtml
}