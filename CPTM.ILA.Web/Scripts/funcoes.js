var requisicaoCorrenteComboEstruturaOrganizacional;

// Usuário
modalUsuarioDetalhar = function (id) {
    mostrarCaixaDialogoAjax('modalUsuarioDetalhe', urlUsuarioDetalhar + '?id=' + id);
}
modalUsuarioPesquisar = function (elementoId, elementoUserName, elementoNome) {
    mostrarCaixaDialogoAjax('modalUsuarioPesquisar', urlUsuarioIndex + '?elementoId=' + elementoId + '&elementoUserName=' + elementoUserName + '&elementoNome=' + elementoNome);
}

// Estrutura Organizacional
modalEstruturaOrganizacionalDetalhar = function (id) {
    mostrarCaixaDialogoAjax('modalEstruturaOrganizacionalDetalhe', urlEstruturaOrganizacionalDetalhar + '?id=' + id);
}
modalEstruturaOrganizacionalPesquisar = function () {
    mostrarCaixaDialogoAjax('modalEstruturaOrganizacionalPesquisa', urlEstruturaOrganizacionalIndex);
}
carregarComboEstruturaOrganizacional = function (elemento, nivel, diretoriaSiglas, gerenciaGeralSiglas, gerenciaSiglas, departamentoSiglas) {
    diretoriaSiglas = diretoriaSiglas || '';
    gerenciaGeralSiglas = gerenciaGeralSiglas || '';
    gerenciaSiglas = gerenciaSiglas || '';
    departamentoSiglas = departamentoSiglas || '';
    requisicaoCorrenteComboEstruturaOrganizacional =
        $.ajax({
            type: 'get',
            url: urlEstruturaOrganizacionalCarregarCombo + '/?nivel=' + nivel + '&diretoriaSiglas=' + diretoriaSiglas + '&gerenciaGeralSiglas=' + gerenciaGeralSiglas + '&gerenciaSiglas=' + gerenciaSiglas + '&departamentoSiglas=' + departamentoSiglas,
            beforeSend: function () {
                if (requisicaoCorrenteComboEstruturaOrganizacional != null) {
                    requisicaoCorrenteComboEstruturaOrganizacional.abort();
                }
                $(elemento).find("option").remove();
                $(elemento).append("<option value='-1'>Carregando...</option>");
            },
            success: function (data) {
                var estruturaOrganizacionais = data.estruturaOrganizacionais;
                $(elemento).find("option").remove();
                for (x in estruturaOrganizacionais) {
                    $(elemento).append("<option value='" + estruturaOrganizacionais[x].value + "'>" + estruturaOrganizacionais[x].text + "</option>");
                }
            },
            error: function (xhr, st, str) {
                mostrarNotificacaoErro(str);
            },
            complete: function () {
                requisicaoCorrenteComboEstruturaOrganizacional = null;
                $(elemento).selectpicker("refresh");
            }
        });
}