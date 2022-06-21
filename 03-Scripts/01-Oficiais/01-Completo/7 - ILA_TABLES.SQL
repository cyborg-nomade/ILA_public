-- ILA_CONFIGURACAO
create table ILA_CONFIGURACAO
(
  parametro               VARCHAR2(250) not null,
  tx_descricao            VARCHAR2(4000),
  valor                   VARCHAR2(4000),
  id_codusuario_cadastro  NUMBER(6) not null,
  dt_cadastro             DATE not null,
  id_codusuario_alteracao NUMBER(6),
  dt_alteracao            DATE
)
tablespace TSD_ILA
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table ILA_CONFIGURACAO
  is 'Registra as configura��es da aplica��o';
-- Add comments to the columns 
comment on column ILA_CONFIGURACAO.parametro
  is 'Nome do par�metro de configura��o';
comment on column ILA_CONFIGURACAO.tx_descricao
  is 'Descri��o da configura��o';
comment on column ILA_CONFIGURACAO.valor
  is 'Valor do par�metro de configura��o';
comment on column ILA_CONFIGURACAO.id_codusuario_cadastro
  is 'Id do usu�rio respons�vel pelo cadastro';
comment on column ILA_CONFIGURACAO.dt_cadastro
  is 'Data do cadastro';
comment on column ILA_CONFIGURACAO.id_codusuario_alteracao
  is 'Id do usu�rio respons�vel pela altera��o';
comment on column ILA_CONFIGURACAO.dt_alteracao
  is 'Data da altera��o';
-- Create/Recreate primary, unique and foreign key constraints 
alter table ILA_CONFIGURACAO
  add constraint PK_CONFIGURACAO primary key (PARAMETRO)
  using index 
  tablespace TSD_ILA
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

-- ILA_USUARIO_PREFERENCIA
create table ILA_USUARIO_PREFERENCIA
(
  id_codusuario NUMBER(8) not null,
  tx_categoria  VARCHAR2(100) not null,
  tx_valor      CLOB
)
tablespace TSD_ILA
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
-- Add comments to the table 
comment on table ILA_USUARIO_PREFERENCIA
  is 'Representa as prefer�ncias do usu�rio no sistema';
-- Add comments to the columns 
comment on column ILA_USUARIO_PREFERENCIA.id_codusuario
  is 'Id do usu�rio';
comment on column ILA_USUARIO_PREFERENCIA.tx_categoria
  is 'Categoria';
comment on column ILA_USUARIO_PREFERENCIA.tx_valor
  is 'Valores';
-- Create/Recreate primary, unique and foreign key constraints 
alter table ILA_USUARIO_PREFERENCIA
  add constraint PK_USUARIO_PREFERENCIA primary key (ID_CODUSUARIO, TX_CATEGORIA)
  using index 
  tablespace TSD_ILA
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

