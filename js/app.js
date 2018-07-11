$(document).ready(function() {
    // finding elements
    const output = $('.output');
    const count = $('.count');
    const firstSelect = $('#first_select');
    const secondSelect = $('#second_select');
    const amount = $('#amount_input');
    const arrow = $('#arrow');

    //fetching data from NBP api
    function countResult (cur) {
        $.ajax({
            url: 'https://api.nbp.pl/api/exchangerates/rates/a/' + cur + '?format=json'
        }).done(function(response) {
            let currency = response['rates'][0].mid;
            let amountVal = amount.val();

            let result = amountVal + firstSelect.val() + ' = ' + (amountVal / currency).toFixed(2) + cur;

            let view = $('<span class="output">');
            view.text(result);

            output.empty();
            output.append(view);
        });
    }
//===============================================================================
    count.on('click', function(e) {
        e.preventDefault();

        if(firstSelect.val() === 'pln') {
            switch (secondSelect.val()) {
                case 'eur':
                    countResult('eur');
                    break;
                case 'usd':
                    countResult('usd');
                    break;
                case 'chf':
                    countResult('chf');
                    break;
                case 'gbp':
                    countResult('gbp');
                    break;
            }
        }

        // if(firstSelect.val() === 'eur') {
        //     switch (secondSelect.val()) {
        //         case 'gbp':
        //             countResult('gbp');
        //             break;
        //
        //     }
        // }


    });





});