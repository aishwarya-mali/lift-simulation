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
    for (let i = 0; i <= floorValue - 1; i++) {
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
            <div class="lift" data-lift=${i + 1} data-floor=${0}>
                <div class="lift-left"></div>
                <div class="lift-right"></div>
            </div>
        `
    }
    return liftsHtml
}

document.addEventListener('click', function (e) {
    const floorClicked = +e.target.dataset.floor
    if (e.target && e.target.id === 'btn-up') {
        const lifts = Array.from(document.querySelectorAll('.lift'))
        for (let i = 0; i < lifts.length; i++) {
            const lift = lifts[i]
            const currentFloor = +lift.dataset.floor
            const { height } = document.querySelector(`[data-floor='${floorClicked}']`).getBoundingClientRect()
            if (currentFloor < floorClicked) {
                lift.style.transform = `translateY(-${(height + 80) * floorClicked}px)`
                lift.style.transition = `all ${floorClicked}s ease-in`
                lift.dataset.floor = floorClicked
                lift.addEventListener('transitionend', function () {
                    liftDoorAnimation(lift, floorClicked);
                })
                break;
            }
        }
    }
    if (e.target && e.target.id === 'btn-down') {
        const lifts = Array.from(document.querySelectorAll('.lift'))
        for (let i = 0; i < lifts.length; i++) {
            const lift = lifts[i]
            const currentFloor = +lift.dataset.floor
            const { height } = document.querySelector(`[data-floor='${floorClicked}']`).getBoundingClientRect()
            if (currentFloor > floorClicked) {
                lift.style.transform = `translateY(-${(height + 80) * floorClicked}px)`
                lift.style.transition = `all 3s ease-in`
                lift.dataset.floor = floorClicked
                lift.addEventListener('transitionend', function () {
                    liftDoorAnimation(lift, floorClicked);
                })
            }
            break;
        }
    }
});

function liftDoorAnimation(lift, floorClicked) {
    let [leftDoor, rightDoor] = lift.children;
    leftDoor.classList.add('openLeftDoor');
    rightDoor.classList.add('openRightDoor');

    leftDoor.addEventListener('transitionend', function () {
        leftDoor.classList.add('closeLeftDoor');
    });

    rightDoor.addEventListener('transitionend', function () {
        rightDoor.classList.add('closeRightDoor');
    });

    setTimeout(() => {
        leftDoor.classList.remove('openLeftDoor');
        rightDoor.classList.remove('openRightDoor');
        leftDoor.classList.remove('closeLeftDoor');
        rightDoor.classList.remove('closeRightDoor');
    }, 3000 * floorClicked);
}