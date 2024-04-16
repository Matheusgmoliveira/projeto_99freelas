$(document).ready(function(){
    $('.input-horario').mask('00:00:00').blur(function() {
        var valor = $(this).val();
        if (valor > '23:59:59') {
            $(this).val('00:00:00');
        }
    });
    
});
