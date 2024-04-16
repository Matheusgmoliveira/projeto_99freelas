lucide.createIcons();
$(document).ready(function() {
    // Função para ser executada após o carregamento completo do DOM
    
    const checkbox = $('#pagamento-antecipado');
    const tipoPagamento = $('.tipo-pagamento');
    const setaParaCima = $('.chevron-up');
    const setaParaBaixo = $('.chevron-down');
    const formasDePagamento = $('#option');
    const inputsOptions = $('#option li');
    const selectedValue = $('.selected-value');
    const valorRecebido = $('.valor-recebido');
    const setaParaBaixoComanda = $('.chevron-down-comanda');
    const setaParaCimaComanda = $('.chevron-up-comanda');
    const apagaValor = $('.apaga-valor');

    
    checkbox.change(function() {
        if ($(this).prop('checked')) {
            tipoPagamento.addClass('checked');
            valorRecebido.css('display','flex');
            tipoPagamento.css('display','block');
            setaParaBaixo.css('display', 'block');
            setaParaCima.css({
                'display': 'none',
                'color': '#33C899'
            });
        } else {
            tipoPagamento.removeClass('checked');
            tipoPagamento.css('display','none');
            valorRecebido.css('display','none');
            setaParaBaixo.css('display', 'block');
            setaParaCima.css('display', 'none');
            formasDePagamento.css('display', 'none');
        }
    });

    setaParaBaixo.click(function(){
        valorRecebido.css('display','block');
        setaParaBaixo.css('display', 'none');
        setaParaCima.css('display', 'block');
        formasDePagamento.css('display', 'block');
    });

    setaParaCima.click(function(){
        checkbox.prop('checked',true);
        tipoPagamento.addClass('checked');
        setaParaBaixo.css('display', 'block');
        setaParaCima.css({
            'display': 'none',
            'color': '#33C899'
        });
        formasDePagamento.css('display', 'none');
    });

    inputsOptions.each(function() { 
        $(this).click(function() {
            selectedValue.text($(this).text()); 
            formasDePagamento.css('display', 'none');
            checkbox.prop('checked',true);
            setaParaCima.click();
        });
    });

    $('#digite').mask('R$ 000.000.000.000.000,00', {reverse: true});

    $('#digite').on('input',function(){
        let value = $(this).val();
        if(!value.startsWith('R$ ')){
            $(this).val('R$ '+ value);
        }
    });

    setaParaBaixoComanda.click(function(){
        $('.comanda-info').css('display','block');
        setaParaBaixoComanda.css('display','none');
        setaParaCimaComanda.css('display','block');
    });

    setaParaCimaComanda.click(function(){
        $('.comanda-info').css('display','none');
        setaParaBaixoComanda.css('display','block');
        setaParaCimaComanda.css('display','none');
    });

    $('.apaga-valor').click(function() {
        // Encontre o elemento .servico-container pai do botão clicado
        let servicoContainer = $(this).closest('.servico-container');
    
        // Encontre o valor do serviço que está sendo removido
        let valorServico = parseFloat(servicoContainer.find('.valor-servico').text().replace('R$ ', '').replace(',', '.')) || 0;
    
        // Encontre o elemento .valor-total específico para este serviço
        let valorTotalElement = servicoContainer.closest('.label-tipo-servico').find('.valor-total');
        let valorTotal = parseFloat(valorTotalElement.text().replace('R$ ', '')) ;
        
        // Certifique-se de que os valores são números válidos antes de realizar a subtração
        if (!isNaN(valorServico) && !isNaN(valorTotal)) {
            // Remova o elemento .servico-container
            servicoContainer.remove();
    
            // Atualize o valor total específico para este serviço
            valorTotal = valorTotal-valorServico
            console.log(valorTotal)
            $('.valor-total').html(`R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`); // Atualize o texto do elemento com o novo valor total
        } else {
            console.log("Um dos valores não é um número válido.");
        }
    });

    
    
    
   
    

    $('.horario-disponivel td').click(function(){
        $(this).toggleClass('selecionado');
    });

    $('#dias-mes td').click(function(){
        $(this).toggleClass('selecionado');
    });

    const monthsBr=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const tableDays = $('#dias-mes');
    
    function GetDaysCalendar(mes,ano){
        $('.mes').html(monthsBr[mes]);
        $('.ano').html(ano);

        let firstDayOfWeek = new Date(ano,mes,1).getDay()-1;
        let getlastDayThisMonth = new Date(ano,mes+1,0).getDate();

        for(let i= -firstDayOfWeek, index=0; i < (35-firstDayOfWeek); i++, index++){
            let dt = new Date(ano,mes,i);
            let dayTable = tableDays.find('td').eq(index);
            dayTable.html(dt.getDate());

            if(i<1){
                dayTable.addClass('mes-anterior');
            }
            if(i>getlastDayThisMonth){
                dayTable.addClass('proximo-mes');
            }
        }
    }

    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDaysCalendar(mes,ano);

    const botaoProximo = $('.btn-next-month');
    const botaoAnterior = $('.btn-prev-month');

    botaoProximo.click(function(){
        mes++;
        if(mes>11){
            mes=0;
            ano++;
        }
        GetDaysCalendar(mes, ano);
    });

    botaoAnterior.click(function(){
        mes--;
        if(mes<0){
            mes=11;
            ano--;
        }
        GetDaysCalendar(mes, ano);
    });
});
