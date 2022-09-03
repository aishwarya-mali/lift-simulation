"use strict";

const simulationContainer = document.querySelector('.lift-simulation')
const btnGenerate = document.querySelector('.btn-generate')
const floorsInput = document.getElementById('floorsInput')
const liftsInput = document.getElementById('liftsInput')
const errorFloor = document.querySelector('.errorFloor')
const errorLift = document.querySelector('.errorLift')

btnGenerate.addEventListener('click', function (e) {
    handleValidations() && handleFloors()
})

floorsInput.addEventListener('change', function(){
    errorFloor.innerHTML = ''
})

liftsInput.addEventListener('change', function(){
    errorLift.innerHTML = ''
})

function handleValidations(){
    let validationSuccessfull
    const floorValue = +floorsInput.value
    const liftValue = +liftsInput.value

    if(!floorValue){
        errorFloor.innerHTML = 'Please Enter floors'
        validationSuccessfull = false
    }

    if(!liftValue){
        errorLift.innerHTML = 'Please Enter Lifts to Travel'
        validationSuccessfull = false
    }

    return validationSuccessfull ?? true
}

function handleFloors() {
    const floorValue = +floorsInput.value
    for (let i = 0; i <= floorValue - 1; i++) {
        const html =
            `
            <div class="floor ${i === 0 ? 'lastFloor' : ''}" data-floor=${i}>
                <div class="lift-buttons">
                    ${i !== 0 ? (
                        `<button class="btn btn-up" id="btn-up" data-floor=${i}>
                            &uarr;
                        </button>`
                    ): ''}
                    ${i!== floorValue-1 ? (
                        `<button class="btn btn-down" id="btn-down" data-floor=${i}>
                            &darr;
                        </button>`
                    ): ''}
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
        liftsMovement(e.target.id, floorClicked);
    }
    if (e.target && e.target.id === 'btn-down') {
        liftsMovement(e.target.id, floorClicked);
    }

});

function liftDoorAnimation(lift, floorClicked) {
    let [leftDoor, rightDoor] = lift.children;
 
    leftDoor.classList.add('leftDoor');
    rightDoor.classList.add('rightDoor');

    leftDoor.addEventListener('animationend', function () {
        leftDoor.classList.remove('leftDoor');
    });

    rightDoor.addEventListener('animationend', function () {
        rightDoor.classList.remove('rightDoor');
    });
}

function liftsMovement(id, floorClicked) {
    const lifts = Array.from(document.querySelectorAll('.lift'));
    for (let i = 0; i < lifts.length; i++) {
        const lift = lifts[i];
        const currentFloor = +lift.dataset.floor;
        const { height } = document.querySelector(`[data-floor='${floorClicked}']`).getBoundingClientRect();
        const floorCondition = id === 'btn-down' ? currentFloor > floorClicked : currentFloor < floorClicked
        if (floorCondition && currentFloor !== floorClicked) {
            lift.style.transform = `translateY(-${(height + 80) * floorClicked}px)`;
            lift.style.transition = `all ${floorClicked + 1}s ease-in`;
            lift.dataset.floor = floorClicked;
            enableDisableButtons(true)
            lift.addEventListener('transitionend', function () {
                liftDoorAnimation(lift, floorClicked);
            });
            setTimeout(() => {
                enableDisableButtons(false)
            }, 3000 * floorClicked);
            break;
        } 
    }
}

function enableDisableButtons(value){
    const buttons = document.querySelectorAll('.btn')
    buttons.forEach(btn => {
        btn.disabled = value
    })
}