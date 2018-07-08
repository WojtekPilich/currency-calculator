$(document).ready(function() {

    const output = $('.output');
    const count = $('.count');
    const firstSelect = $('#first_select');
    const secondSelect = $('#second_select');
    const amount = $('#amount_input');
    const arrow = $('#arrow');


    function pln_to_other (cur) {
        $.ajax({
            url: 'http://api.nbp.pl/api/exchangerates/rates/a/' + cur + '?format=json'
        }).done(function(response) {
            let currency = response['rates'][0].mid;
            let amountVal = amount.val();

            let result = amountVal + ' pln = ' + (amountVal / currency).toFixed(2) + ` ${cur}`;

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
                    pln_to_other('eur');
                    break;
                case 'usd':
                    pln_to_other('usd');
                    break;
                case 'chf':
                    pln_to_other('chf');
                    break;
                case 'gbp':
                    pln_to_other('gbp');
                    break;
            }
        }



    });



});