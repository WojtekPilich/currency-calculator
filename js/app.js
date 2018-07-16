$(document).ready(function() {
    // finding html elements and assign them to variables
    const output = $('.output');
    const count = $('.count');
    const firstSelect = $('#first_select');
    const secondSelect = $('#second_select');
    const amount = $('#amount_input');
    const arrow = $('#arrow');

    //create an empty array of rates
    const rates = [];
    //push PLN rate as a first, basic and unchangeable which always equals to 1
    rates.push({code:"PLN", rate: 1});


    //push next rates into the array
    $.ajax({
        //set api url
        url: 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json'
        //fetch data from api
    }).done(function(data) {
        for(value of data[0]['rates']) {
            if(value.code.includes('GBP') || value.code.includes('EUR') ||
                value.code.includes('CHF') || value.code.includes('USD') ) {
                rates.push({
                    code:value.code, rate:value.mid
                });
            }
        }
    });
    // console.log(rates);

    // function which calculates result
    function countResult(rate1, rate2) {
        let result =
            amount.val() + rate1.code + ' = ' +
            ((amount.val() * rate1.rate) / rate2.rate).toFixed(2) + rate2.code;
        //error message
        let error = 'Insert amount that is greater than 0!';

        //create a view for result
        if(amount.val() > 0) {
            let resultView = $('<span class="output--view"></span>');
            resultView.text(result);
            output.empty();
            output.append(resultView);
        }
        //create a view for an error
        if(amount.val() == 0) {
            let resultError = $('<span class="output--amount-error"></span>');
            resultError.text(error);
            output.empty();
            output.append(resultError);
        }
    }

    // start calculating results if count button is clicked
    count.on('click', function(e) {
       e.preventDefault();
       //handling error when selected values are the same
       if(firstSelect.val() === secondSelect.val()) {
           let identicalError = $('<span class="output--identical-error"></span>');
           let error = 'Please select two different currencies';

           identicalError.text(error);
           output.empty();
           output.append(identicalError);

           //disable amount input when currencies are the same
           $('.content__amount__input').attr('disabled', true);

       } else {
           // assign elements of rates array to variables
           const plnRate = rates[0];
           const usdRate = rates[1];
           const eurRate = rates[2];
           const chfRate = rates[3];
           const gbpRate = rates[4];

           //from pln
           if (firstSelect.val() === 'pln') {
               switch (secondSelect.val()) {
                   case 'usd':
                       countResult(plnRate, usdRate);
                       break;
                   case 'eur':
                       countResult(plnRate, eurRate);
                       break;
                   case 'chf':
                       countResult(plnRate, chfRate);
                       break;
                   case 'gbp':
                       countResult(plnRate, gbpRate);
                       break;
               }

               //from usd
           } else if (firstSelect.val() === 'usd') {
               switch (secondSelect.val()) {
                   case 'pln':
                       countResult(usdRate, plnRate);
                       break;
                   case 'eur':
                       countResult(usdRate, eurRate);
                       break;
                   case 'chf':
                       countResult(usdRate, chfRate);
                       break;
                   case 'gbp':
                       countResult(usdRate, gbpRate);
                       break;
               }

               //form eur
           } else if (firstSelect.val() === 'eur') {
               switch (secondSelect.val()) {
                   case 'pln':
                       countResult(eurRate, plnRate);
                       break;
                   case 'usd':
                       countResult(eurRate, usdRate);
                       break;
                   case 'chf':
                       countResult(eurRate, chfRate);
                       break;
                   case 'gbp':
                       countResult(eurRate, gbpRate);
                       break;
               }

               //from chf
           } else if (firstSelect.val() === 'chf') {
               switch (secondSelect.val()) {
                   case 'pln':
                       countResult(chfRate, plnRate);
                       break;
                   case 'usd':
                       countResult(chfRate, usdRate);
                       break;
                   case 'eur':
                       countResult(chfRate, eurRate);
                       break;
                   case 'gbp':
                       countResult(chfRate, gbpRate);
                       break;
               }

               //from gbp
           } else if (firstSelect.val() === 'gbp') {
               switch (secondSelect.val()) {
                   case 'pln':
                       countResult(gbpRate, plnRate);
                       break;
                   case 'usd':
                       countResult(gbpRate, usdRate);
                       break;
                   case 'eur':
                       countResult(gbpRate, eurRate);
                       break;
                   case 'chf':
                       countResult(gbpRate, chfRate);
                       break;
               }
           }
       }
    });

    //activate amount input when user selects a currency
    $('select').on('change', function() {
        $('.content__amount__input').attr('disabled', false);
        // output.empty();
    });
});