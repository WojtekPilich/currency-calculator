$(document).ready(function() {
    // finding elements
    const output = $('.output');
    const count = $('.count');
    const firstSelect = $('#first_select');
    const secondSelect = $('#second_select');
    const amount = $('#amount_input');
    const arrow = $('#arrow');

    //fetching data from NBP api
    // function countResult (cur) {
    //     $.ajax({
    //         url: 'https://api.nbp.pl/api/exchangerates/rates/a/' + cur + '?format=json'
    //     }).done(function(response) {
    //         let rate = response['rates'][0].mid;
    //         let amountVal = amount.val();
    //
    //         let result = amountVal + firstSelect.val() + ' = ' + (amountVal / rate).toFixed(2) + cur;
    //
    //         let view = $('<span class="output">');
    //         view.text(result);
    //
    //         output.empty();
    //         output.append(view);
    //     });
    // }

    const rates = [];

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
    console.log(rates);

    function countResult(cur1) {
        for(out of rates) {
            // if (rar.code === cur1) {
            //     // let result = amount.val() + firstSelect.val() +
            //     //     ' = ' + (amount.val() / rar.rate).toFixed(2) + rar.code;
            //     //
            //     // let view = $('<span class="output">');
            //     // view.text(result);
            //     //
            //     // output.empty();
            //     // output.append(view);
            // }
            console.log(out);

        }
    }


    count.on('click', function(e) {
       e.preventDefault();

       if(firstSelect.val() === 'pln') {
           switch (secondSelect.val()) {
               case 'eur':
                   // let result = amount.val() + firstSelect.val() +
                   //     ' = ' + (amount.val() / rates[1].rate).toFixed(2) + rates[1].code;
                   //
                   // let view = $('<span class="output">');
                   //     view.text(result);
                   //
                   //     output.empty();
                   //     output.append(view);
                   countResult('eur')
           }
       }

    });




    // let result = countResult('eur');
    // console.log(result);
//===============================================================================
//     count.on('click', function(e) {
//         e.preventDefault();
//
//         if(firstSelect.val() === 'pln') {
//             switch (secondSelect.val()) {
//                 case 'eur':
//                     countResult('eur');
//                     break;
//                 case 'usd':
//                     countResult('usd');
//                     break;
//                 case 'chf':
//                     countResult('chf');
//                     break;
//                 case 'gbp':
//                     countResult('gbp');
//                     break;
//             }
//         }

        // if(firstSelect.val() === 'eur') {
        //     switch (secondSelect.val()) {
        //         case 'gbp':
        //             countResult('gbp');
        //             break;
        //
        //     }
        // }


    // });





});