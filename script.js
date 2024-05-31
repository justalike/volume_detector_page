import { allPairs } from './pairs.js';
import { autocomplete } from './autocomplete.js';

let telegram = window.Telegram.WebApp;
telegram.expand();

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded and parsed");
    const pairs = await allPairs();
    var n = 1;

    const pairInputs = document.querySelectorAll('input[name="pair"]');
    pairInputs.forEach(input => {
        autocomplete(input, pairs);
    });

    window.addPair = function () {
        const pairContainer = document.getElementById('pair-section');
        const pairEntry = document.createElement('div');
        pairEntry.className = 'pair-entry';
        pairEntry.innerHTML = `
          <div class="autocomplete">
            <div class="divider"></div>
            <div class="pair">
                <input type="text" id="pair${n++}" name="pair" placeholder="Введите пару" class="pair-input">
                <button class="delete-btn" onclick="removePair(this)">Удалить</button>
            </div>
            </div>
        `;
        pairContainer.appendChild(pairEntry);

        const newInput = pairEntry.querySelector('input[name="pair"]');
        autocomplete(newInput, pairs);


    };

    window.removePair = function (button) {
        const pairEntry = button.closest('.pair-entry');
        pairEntry.remove();
    };


    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener("click", () => {

        let timeframe = document.getElementById('timeframe');
        let longMA = document.getElementById('longMA-value');
        let shortMA = document.getElementById('shortMA-value');
        let longX = document.getElementById('longX-value');
        let shortX = document.getElementById('shortX-value');

        const pairInputs = Array.from(document.querySelectorAll('input[name="pair"]'))
            .map(input => input.value.toUpperCase())
            .filter(pair => pairs.includes(pair));

        if (pairInputs.length === 0) {
            alert('Вы не выбрали пару или она указана некорректно');
            return;
        }

        let data = {
            pair: pairInputs,
            timeframe: timeframe.value,
            longMA: +longMA.value,
            shortMA: +shortMA.value,
            longThreshold: +longX.value,
            shortThreshold: +shortX.value,
        }

        if (!timeframe.value || !longMA.value || !shortMA.value || !longX.value || !shortX.value) {
            alert('Заполните все поля')
            return
        }
        console.log(data)
        telegram.sendData(JSON.stringify(data))
        telegram.close()
    });



});
