const selectElement = document.getElementById('timeframe');

// Define the available timeframes
const timeframes = [
    /*'1s', */'1m', '3m', '5m', '15m', '30m', '1h', /*'2h',*/ '4h',
    /*'6h', '8h', '12h',*/ '1d',/* '3d', '1w', '1M'*/
];

// Generate the options dynamically
timeframes.forEach(timeframe => {
    const option = document.createElement('option');
    option.value = timeframe;
    option.text = timeframe;
    if (timeframe === '1h') {
        option.selected = true;
    }
    selectElement.appendChild(option);
});