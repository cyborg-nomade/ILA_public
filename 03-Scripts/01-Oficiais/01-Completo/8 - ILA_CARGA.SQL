insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('APLICACAO_NOME', 'Nome do sistema', 'ILA', 2113, sysdate, null, null);
insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('GESTOR_SIGLA', 'Sigla da área gestora', 'GFI', 2113, sysdate, null, null);
insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('APLICACAO_VERSAO', 'Versão', '0.1', 2113, sysdate, null, null);
insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('GESTOR_ENDERECO_INTRANET', 'Endereço do site da área na Intranet', 'http://intranet/', 2113, sysdate, null, null);
insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('EMAIL_REMETENTE_NOME', 'Nome do remetente para envio de e-mail', 'ILA', 2113, sysdate, null, null);
insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('EMAIL_REMETENTE_EMAIL', 'Endereço do remetente para envio de e-mail', 'naoresponda@cptm.sp.gov.br', 2113, sysdate, null, null);
insert into ILA_CONFIGURACAO (parametro, tx_descricao, valor, id_codusuario_cadastro, dt_cadastro, id_codusuario_alteracao, dt_alteracao)
values ('CACHE_CONFIGURACAO_MINUTOS', 'Tempo (minutos) que as configurações ficam em cache', '60', 2113, sysdate, null, null);
commit;
