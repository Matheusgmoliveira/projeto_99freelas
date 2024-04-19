$(document).ready(function(){
    const inputNome = $('#nome')
    const inputEmail = $('#email')
    const botaoConvida =$('#btn-convidar')
    const botaoCancela =$('#btn-cancelar')
    const enviaSms=$('#checkbox-sms');
    const enviaEmail=$('#checkbox-email');
    const enviaPush=$('#checkbox-push');
    
    let linhas='';

    botaoConvida.click(function(){
        if(inputNome.val()!== '' && inputEmail.val()!== ''){
            adicionaLinha();
        atualizaTabela();
        }else{
            alert('Por favor, preencha o nome e o email antes de convidar.');
        }
        
    })

    botaoCancela.click(function(){
        LimpaDados();
    })

    $(document).ready(function(){
        
        $(document).on('click', '.btn-remover', function(){
            let index = $(this).closest('tr').index();
            removeLinha(index);
        });
    
        
    });
    
    function removeLinha(index) {
       
        let linhasArray = linhas.split('</tr>');
    
        
        linhasArray.splice(index, 1);
    
        
        linhas = linhasArray.join('</tr>');
    
        atualizaTabela();
        
    }
    

    function adicionaLinha(){
        let linha = "<tr>"
        linha += `<td id="td-nome"><label id="nome-body">${inputNome.val()}</td>`;
        linha += `<td id="check-sms">${enviaSms.is(':checked') ? '<div id="sms-checkbox-body"></div>' : ''}</td>`;
        linha += `<td id="check-email">${enviaEmail.is(':checked') ? '<div id="email-checkbox-body"></div>' : ''}</td>`;
        linha += `<td id="check-push">${enviaPush.is(':checked') ? '<div id="push-checkbox-body"></div>' : ''}</td>`;
        linha += `<td id="convite"><label id="convite-body" for="">Convite Aceito</td>`;
        linha += `<td id="td-email"><label id="email-body" required>${inputEmail.val()}</td>`;
        linha += `<td id="botao-body"><button class="btn-remover">Remover</button></td>`;
        linha += '</tr>';

        

        linhas+=linha;

        inputEmail.val('');
        inputNome.val('');
        enviaSms.prop('checked', false);
        enviaEmail.prop('checked', false);
        enviaPush.prop('checked', false);
    }

    function LimpaDados(){
        inputEmail.val('');
        inputNome.val('');
        enviaSms.prop('checked', false);
        enviaEmail.prop('checked', false);
        enviaPush.prop('checked', false);
    }

    function atualizaTabela(){
        const corpoTabela =$('tbody')
        corpoTabela.html(linhas);
    }
})