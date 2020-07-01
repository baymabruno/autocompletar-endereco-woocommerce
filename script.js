$(document).ready(function () {
  function limpa_formulario_cep() {
    // Limpa valores do formulário de cep.
    $("#billing_address_1").val("");
    $("#billing_neighborhood").val("");
    $("#billing_city").val("");
    $("#select2-billing_state-container").val("");
    $("#select2-billing_state-container").html("");
    $("#select2-billing_state-container").prop("title", "");
  }

  //Quando o campo cep perde o foco.
  $("#billing_postcode").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Loading
        $("body").loading({ stoppable: true });

        // Limpar formulário
        limpa_formulario_cep();

        //Consulta o webservice viacep.com.br/
        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              //Atualiza os campos com os valores da consulta.
              $("#billing_address_1").val(dados.logradouro);
              $("#billing_neighborhood").val(dados.bairro);
              $("#billing_city").val(dados.localidade);
              $("#select2-billing_state-container").val(dados.uf);
              $("#select2-billing_state-container").html(dados.uf);
              $("#select2-billing_state-container").prop("title", dados.uf);
            } //end if.
            else {
              //CEP pesquisado não foi encontrado.
              limpa_formulario_cep();
              alert("CEP não encontrado.");
            }
          }
        );
      } //end if.
      else {
        //cep é inválido.
        limpa_formulario_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulario_cep();
    }

    // stop loading
    $("body").loading("stop");
  });
});
