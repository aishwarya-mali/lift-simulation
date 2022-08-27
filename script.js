"use strict";

const simulationContainer = document.querySelector('.lift-simulation')
const btnGenerate = document.querySelector('.btn-generate')
const floorsInput = document.getElementById('floorsInput')
const liftsInput = document.getElementById('liftsInput')

btnGenerate.addEventListener('click', function(e){
   console.log(`Floors ${+floorsInput.value} Lifts ${+liftsInput.value}`)
   handleFloors()
})

function handleFloors(){
    for( let i=+floorsInput.value - 1; i>=0; i--){
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

function handleLifts(){
    // const floorContainer = document.querySelector('.floor')
    // console.log(floorContainer)
    let liftsHtml = ''
    for( let i = 0 ; i <= +liftsInput.value - 1; i++){
        // console.log(i, +liftsInput.value)
        liftsHtml += `
            <div class="lift">
                <div class="lift-left"></div>
                <div class="lift-right"></div>
            </div>
        `
    }
    return liftsHtml
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'btn-up') {
       console.log(`btn-up clicked on floor ${e.target.dataset.floor}`)
       const { height } = document.querySelector(`[data-floor='${e.target.dataset.floor}']`).getBoundingClientRect()
       console.log(((height * +floorsInput.value) * e.target.dataset.floor) + 80)
       document.querySelector('.lift').style.transform = `translateY(-${(((height * +floorsInput.value) * e.target.dataset.floor) + 80) + 80}px)`
    }
    if (e.target && e.target.id == 'btn-down') {
        console.log(`btn-down clicked on floor ${e.target.dataset.floor}`)
     }
});