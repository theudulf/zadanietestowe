import $ from "jquery";

$(window).on("load", function () {

    function checkInputs(item){
        if (!item.val()) {
            item.next('.support-form__error').removeClass('d-none');
        } else {
            item.next('.support-form__error').addClass('d-none');
        }
    }

    function generateKey() {
        const uniqueKey = Math.floor(Math.random() * 100000);
        $('.support-form__input--key').val(uniqueKey);
        $('.support-form__unique-key--value').text(uniqueKey);
    }

    $('.support-form__input').on("blur", function () {
       checkInputs($(this));
    });

    $('#support-form').on('submit', function(e){
        e.preventDefault();
        $('.support-form__input').each(function() {
            checkInputs($(this));
        })
    });

    generateKey();
  
});
