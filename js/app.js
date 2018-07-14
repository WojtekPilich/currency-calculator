$(document).ready(function() {
    // finding html elements and assign them to variables
    const output = $('.output');
    const count = $('.count');
    const firstSelect = $('#first_select');
    const secondSelect = $('#second_select');
    const amount = $('#amount_input');
    const arrow = $('#arrow');

    //create empty array of rates objects
    const rates = [];
    //push PLN object as a first, basic and unchangeable rate which always equals to 1
    rates.push({code:"PLN", rate: 1});
    //push next rates objects
    $.ajax({
        url: 'https://api.nbp.pl/api/exchangerates/tables/A/?format=json'
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
            amount.val() + rate1.code
                + ' = ' +
                    ((amount.val() * rate1.rate) / rate2.rate).toFixed(2) + rate2.code;
        //create a view for result
        let view = $('<span class="output">');
        view.text(result);

        output.empty();
        output.append(view);
    }

    // start the function if count button is clicked
    count.on('click', function(e) {
       e.preventDefault();
        // assign elements of rates array to variables
        const plnRate = rates[0];
        const usdRate = rates[1];
        const eurRate = rates[2];
        const chfRate = rates[3];
        const gbpRate = rates[4];

       if(firstSelect.val() === 'pln') {
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
       }

    });


});