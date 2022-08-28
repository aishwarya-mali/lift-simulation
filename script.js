"use strict";

const simulationContainer = document.querySelector('.lift-simulation')
const btnGenerate = document.querySelector('.btn-generate')
const floorsInput = document.getElementById('floorsInput')
const liftsInput = document.getElementById('liftsInput')

let liftPosition = []

btnGenerate.addEventListener('click', function (e) {
    console.log(`Floors ${+floorsInput.value} Lifts ${+liftsInput.value}`)
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
    // const floorContainer = document.querySelector('.floor')
    // console.log(floorContainer)
    let liftsHtml = ''
    for (let i = 0; i <= +liftsInput.value - 1; i++) {
        // console.log(i, +liftsInput.value)
        liftsHtml += `
            <div class="lift" data-lift=${i + 1}>
                <div class="lift-left"></div>
                <div class="lift-right"></div>
            </div>
        `
        let currentLift = {
            [`${i + 1}`]: +floorsInput.value
        }
        liftPosition.push(currentLift)
    }
    return liftsHtml
}

document.addEventListener('click', function (e) {
    let liftEl = document.querySelector(`.lift`)
    let objIndex = liftPosition.findIndex((obj => obj[liftEl.dataset.lift]));
    if (e.target && e.target.id === 'btn-up') {
        var { height } = document.querySelector(`[data-floor='${e.target.dataset.floor}']`).getBoundingClientRect()
        let newPosition = liftPosition[objIndex][liftEl.dataset.lift] = +e.target.dataset.floor
        liftEl.style.transform = `translateY(-${(height + 80) * (+floorsInput.value - newPosition)}px)`
        console.log(liftPosition)
    }
    if (e.target && e.target.id === 'btn-down') {
        liftEl.style.transform = `translateY(${(120 + 80) * ((objIndex + 1) - +e.target.dataset.floor)}px)`
    }
});