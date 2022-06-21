begin
execute immediate '
create table "ILA"."ILA_ACCESS_REQUESTS"
(
    "Id" number(9, 0) not null, 
    "UsernameSolicitante" nclob null, 
    "UsernameSuperior" nclob null, 
    "Justificativa" nclob null, 
    "EmailSuperiorPath" nclob null, 
    "TipoSolicitacaoAcesso" number(9, 0) not null,
    constraint "PK_ILA_ACCESS_REQUESTS" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ACCESS_REQUESTS"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ACCESS_REQUESTS"
before insert on "ILA"."ILA_ACCESS_REQUESTS"
for each row
begin
  select "ILA"."SQ_ILA_ACCESS_REQUESTS".nextval into :new."Id" from dual;
end;';

execute immediate '
create table "ILA"."ILA_GROUPS"
(
    "Id" number(9, 0) not null, 
    "Nome" nvarchar2(2000) null, 
    "AccessRequest_Id" number(9, 0) null,
    constraint "PK_ILA_GROUPS" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_GROUPS"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_GROUPS"
before insert on "ILA"."ILA_GROUPS"
for each row
begin
  select "ILA"."SQ_ILA_GROUPS".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_GROUPS_AccessRequest_Id" on "ILA"."ILA_GROUPS" ("AccessRequest_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_AGENTE_TRATAMENTO"
(
    "Id" number(9, 0) not null, 
    "Nome" nclob null, 
    "Area" nclob null, 
    "Telefone" nclob null, 
    "Email" nclob null,
    constraint "PK_ILA_AGENTE_TRATAMENTO" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_AGENTE_TRATAMENTO"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_AGENTE_TRATAMENTO"
before insert on "ILA"."ILA_AGENTE_TRATAMENTO"
for each row
begin
  select "ILA"."SQ_ILA_AGENTE_TRATAMENTO".nextval into :new."Id" from dual;
end;';

execute immediate '
create table "ILA"."ILA_CASES"
(
    "Id" number(9, 0) not null, 
    "Ref" nvarchar2(250) null, 
    "Nome" nvarchar2(250) null, 
    "Area" nclob null, 
    "DataCriacao" date not null, 
    "DataAtualizacao" date not null, 
    "DataEnvio" date null, 
    "DataAprovacao" date null, 
    "DataProxRevisao" date null, 
    "UsernameResponsavel" nvarchar2(250) null, 
    "GrupoCriadorId" number(9, 0) not null, 
    "Aprovado" number(1, 0) not null, 
    "Reprovado" number(1, 0) not null, 
    "ComentarioReprovacao" nclob null, 
    "EncaminhadoAprovacao" number(1, 0) not null, 
    "DadosPessoaisSensiveis" number(1, 0) not null, 
    "DescricaoFluxoTratamento" nclob null, 
    "AbrangenciaGeografica_Value" nclob null, 
    "FonteDados" nclob null, 
    "FrequenciaTratamento_Value" nclob null, 
    "QtdeDadosTratados" number(9, 0) not null, 
    "QtdeDadosSensiveisTratados" number(9, 0) not null, 
    "AreaTratamentoDados_Id" number(9, 0) null, 
    "CategoriasTitulares_Id" number(9, 0) null, 
    "Controlador_Id" number(9, 0) null, 
    "Encarregado_Id" number(9, 0) null, 
    "ExtensaoEncarregado_Id" number(9, 0) null, 
    "FasesCicloTratamento_Id" number(9, 0) null, 
    "FinalidadeTratamento_Id" number(9, 0) null, 
    "Operador_Id" number(9, 0) null,
    constraint "PK_ILA_CASES" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_CASES"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_CASES"
before insert on "ILA"."ILA_CASES"
for each row
begin
  select "ILA"."SQ_ILA_CASES".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_AreaTra_574054568" on "ILA"."ILA_CASES" ("AreaTratamentoDados_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_Catego_1020939422" on "ILA"."ILA_CASES" ("CategoriasTitulares_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_Controlador_Id" on "ILA"."ILA_CASES" ("Controlador_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_Encarregado_Id" on "ILA"."ILA_CASES" ("Encarregado_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_Extensa_977758667" on "ILA"."ILA_CASES" ("ExtensaoEncarregado_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_FasesC_1827524022" on "ILA"."ILA_CASES" ("FasesCicloTratamento_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_Finali_2122315897" on "ILA"."ILA_CASES" ("FinalidadeTratamento_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CASES_Operador_Id" on "ILA"."ILA_CASES" ("Operador_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_CATEGORIA_TITULARES"
(
    "Id" number(9, 0) not null, 
    "CriancasAdolescentes_Id" number(9, 0) null, 
    "OutrosGruposVulneraveis_Id" number(9, 0) null,
    constraint "PK_ILA_CATEGORIA_TITULARES" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_CATEGORIA_TITULARES"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_CATEGORIA_TITULARES"
before insert on "ILA"."ILA_CATEGORIA_TITULARES"
for each row
begin
  select "ILA"."SQ_ILA_CATEGORIA_TITULARES".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_CATEGORIA_TIT_804010919" on "ILA"."ILA_CATEGORIA_TITULARES" ("CriancasAdolescentes_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_CATEGORIA_TI_1718986993" on "ILA"."ILA_CATEGORIA_TITULARES" ("OutrosGruposVulneraveis_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_CAT_TITULARES"
(
    "Id" number(9, 0) not null, 
    "TipoCategoria_Value" nclob null, 
    "Descricao" nvarchar2(250) null, 
    "CategoriasTitulares_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_CAT_TITULARES" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_CAT_TITULARES"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_CAT_TITULARES"
before insert on "ILA"."ILA_ITEM_CAT_TITULARES"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_CAT_TITULARES".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_CAT_TIT_2146354117" on "ILA"."ILA_ITEM_CAT_TITULARES" ("CategoriasTitulares_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_CAT_TITULARES_EXTRA"
(
    "Id" number(9, 0) not null, 
    "TrataDados" nclob null, 
    "DescricaoDados" nvarchar2(250) null,
    constraint "PK_ILA_ITEM_CAT_TITUL_61863160" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_CAT_TIT_1364552725"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_CAT_TIT_1732561879"
before insert on "ILA"."ILA_ITEM_CAT_TITULARES_EXTRA"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_CAT_TIT_1364552725".nextval into :new."Id" from dual;
end;';

execute immediate '
create table "ILA"."ILA_ITEM_COMPARTILH_DADOS"
(
    "Id" number(9, 0) not null, 
    "NomeInstituicao" nclob null, 
    "TipoCompDados_Value" nclob null, 
    "NivelCompartilhamento_Value" nclob null, 
    "DescricaoDadosCompartilhados" nvarchar2(250) null, 
    "FinalidadeComp_Value" nclob null, 
    "DescricaoFinalidadeComp" nvarchar2(250) null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_COMPARTILH_DADOS" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_COMPARTILH_DADOS"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_COMPARTILH_DADOS"
before insert on "ILA"."ILA_ITEM_COMPARTILH_DADOS"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_COMPARTILH_DADOS".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_COMPART_1420820025" on "ILA"."ILA_ITEM_COMPARTILH_DADOS" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_CONTRATO_TI"
(
    "Id" number(9, 0) not null, 
    "NumeroContrato" nclob null, 
    "NumeroProcessoContratacao" nclob null, 
    "ObjetoContrato" nclob null, 
    "EmailGestorContrato" nclob null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_CONTRATO_TI" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_CONTRATO_TI"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_CONTRATO_TI"
before insert on "ILA"."ILA_ITEM_CONTRATO_TI"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_CONTRATO_TI".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_CONTRAT_1814979304" on "ILA"."ILA_ITEM_CONTRATO_TI" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_FASES_CICLO_TRATAMENTO"
(
    "Id" number(9, 0) not null, 
    "Coleta" number(1, 0) not null, 
    "Retencao" number(1, 0) not null, 
    "Processamento" number(1, 0) not null, 
    "Compartilhamento" number(1, 0) not null, 
    "Eliminacao" number(1, 0) not null,
    constraint "PK_ILA_FASES_CICLO_TRATAMENTO" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_FASES_CICLO_TRATAMENTO"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_FASES_CICLO_TRATAMENTO"
before insert on "ILA"."ILA_FASES_CICLO_TRATAMENTO"
for each row
begin
  select "ILA"."SQ_ILA_FASES_CICLO_TRATAMENTO".nextval into :new."Id" from dual;
end;';

execute immediate '
create table "ILA"."ILA_FINALIDADE_TRATAMENTO"
(
    "Id" number(9, 0) not null, 
    "HipoteseTratamento_Value" nclob null, 
    "DescricaoFinalidade" nclob null, 
    "PrevisaoLegal" nclob null, 
    "ResultadosTitular" nclob null, 
    "BeneficiosEsperados" nclob null,
    constraint "PK_ILA_FINALIDADE_TRATAMENTO" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_FINALIDADE_TRATAMENTO"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_FINALIDADE_TRATAMENTO"
before insert on "ILA"."ILA_FINALIDADE_TRATAMENTO"
for each row
begin
  select "ILA"."SQ_ILA_FINALIDADE_TRATAMENTO".nextval into :new."Id" from dual;
end;';

execute immediate '
create table "ILA"."ILA_ITEM_CAT_DADOS_PESSOAIS"
(
    "Id" number(9, 0) not null, 
    "Descricao" nclob null, 
    "TempoRetencao_Value" nclob null, 
    "FonteRetencao_Value" nclob null, 
    "LocalArmazenamento" nclob null, 
    "CategoriaDadosPessoais" number(9, 0) not null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_CAT_DADOS_PESSOAIS" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_CAT_DADOS_PESSOAIS"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_CAT_DADOS_PESSOAIS"
before insert on "ILA"."ILA_ITEM_CAT_DADOS_PESSOAIS"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_CAT_DADOS_PESSOAIS".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_CAT_DAD_1890698184" on "ILA"."ILA_ITEM_CAT_DADOS_PESSOAIS" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_MEDIDA_SEG_PRIV"
(
    "Id" number(9, 0) not null, 
    "Tipo_Value" nclob null, 
    "Descricao" nclob null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_MEDIDA_SEG_PRIV" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_MEDIDA_SEG_PRIV"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_MEDIDA_SEG_PRIV"
before insert on "ILA"."ILA_ITEM_MEDIDA_SEG_PRIV"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_MEDIDA_SEG_PRIV".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_MEDIDA__2024716702" on "ILA"."ILA_ITEM_MEDIDA_SEG_PRIV" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_OBS_PROCESSO"
(
    "Id" number(9, 0) not null, 
    "DescricaoObs" nclob null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_OBS_PROCESSO" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_OBS_PROCESSO"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_OBS_PROCESSO"
before insert on "ILA"."ILA_ITEM_OBS_PROCESSO"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_OBS_PROCESSO".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_OBS_PRO_1642253263" on "ILA"."ILA_ITEM_OBS_PROCESSO" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_RISCO_PRIVACIDADE"
(
    "Id" number(9, 0) not null, 
    "TipoRisco_Value" nclob null, 
    "Observacoes" nclob null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_RISCO_PRIVACIDADE" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_RISCO_PRIVACIDADE"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_RISCO_PRIVACIDADE"
before insert on "ILA"."ILA_ITEM_RISCO_PRIVACIDADE"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_RISCO_PRIVACIDADE".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_RISCO_PR_985027833" on "ILA"."ILA_ITEM_RISCO_PRIVACIDADE" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_ITEM_TRANSF_INTERNACIONAL"
(
    "Id" number(9, 0) not null, 
    "NomeOrganizacao" nclob null, 
    "Pais" nclob null, 
    "DadosTransferidos" nclob null, 
    "TipoGarantia" nvarchar2(250) null, 
    "Case_Id" number(9, 0) null,
    constraint "PK_ILA_ITEM_TRANSF__1452723587" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_ITEM_TRANSF__1834184578"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_ITEM_TRANSF_I_461849908"
before insert on "ILA"."ILA_ITEM_TRANSF_INTERNACIONAL"
for each row
begin
  select "ILA"."SQ_ILA_ITEM_TRANSF__1834184578".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_ITEM_TRANSF__2086094028" on "ILA"."ILA_ITEM_TRANSF_INTERNACIONAL" ("Case_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_CHANGELOGS"
(
    "Id" number(9, 0) not null, 
    "UserId" number(9, 0) not null, 
    "UsernameResp" nclob null, 
    "CaseId" number(9, 0) not null, 
    "CaseRef" nclob null, 
    "ChangeDate" date not null, 
    "CaseDiff" nclob null,
    constraint "PK_ILA_CHANGELOGS" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_CHANGELOGS"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_CHANGELOGS"
before insert on "ILA"."ILA_CHANGELOGS"
for each row
begin
  select "ILA"."SQ_ILA_CHANGELOGS".nextval into :new."Id" from dual;
end;';

execute immediate '
create table "ILA"."ILA_USERS"
(
    "Id" number(9, 0) not null, 
    "Username" nvarchar2(2000) null, 
    "IsComite" number(1, 0) not null, 
    "IsDPO" number(1, 0) not null, 
    "IsSystem" number(1, 0) not null, 
    "OriginGroup_Id" number(9, 0) null,
    constraint "PK_ILA_USERS" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_USERS"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_USERS"
before insert on "ILA"."ILA_USERS"
for each row
begin
  select "ILA"."SQ_ILA_USERS".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_USERS_OriginGroup_Id" on "ILA"."ILA_USERS" ("OriginGroup_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
create table "ILA"."ILA_GROUP_ACCESS_EXPIRATIONS"
(
    "Id" number(9, 0) not null, 
    "ExpirationDate" date not null, 
    "Group_Id" number(9, 0) null, 
    "User_Id" number(9, 0) null,
    constraint "PK_ILA_GROUP_ACCESS__774628606" primary key ("Id")
) segment creation immediate';

execute immediate '
create sequence "ILA"."SQ_ILA_GROUP_ACCESS__867244297"';

execute immediate '
create or replace trigger "ILA"."TR_ILA_GROUP_ACCESS_1459034283"
before insert on "ILA"."ILA_GROUP_ACCESS_EXPIRATIONS"
for each row
begin
  select "ILA"."SQ_ILA_GROUP_ACCESS__867244297".nextval into :new."Id" from dual;
end;';

begin
  execute immediate
  'create index "ILA"."IX_ILA_GROUP_ACCESS_1342853382" on "ILA"."ILA_GROUP_ACCESS_EXPIRATIONS" ("Group_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
begin
  execute immediate
  'create index "ILA"."IX_ILA_GROUP_ACCESS_1946052200" on "ILA"."ILA_GROUP_ACCESS_EXPIRATIONS" ("User_Id")';
exception
  when others then
    if sqlcode <> -1408 then
      raise;
    end if;
end;
execute immediate '
alter table "ILA"."ILA_GROUPS" add constraint "FK_ILA_GROUPS_AccessRequest_Id" foreign key ("AccessRequest_Id") references "ILA"."ILA_ACCESS_REQUESTS" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_AreaTr_1918748910" foreign key ("AreaTratamentoDados_Id") references "ILA"."ILA_AGENTE_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_Catego_1203941712" foreign key ("CategoriasTitulares_Id") references "ILA"."ILA_CATEGORIA_TITULARES" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_Controlador_Id" foreign key ("Controlador_Id") references "ILA"."ILA_AGENTE_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_Encarregado_Id" foreign key ("Encarregado_Id") references "ILA"."ILA_AGENTE_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_Extensa_682119535" foreign key ("ExtensaoEncarregado_Id") references "ILA"."ILA_AGENTE_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_FasesC_1314573516" foreign key ("FasesCicloTratamento_Id") references "ILA"."ILA_FASES_CICLO_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_Finalid_110228013" foreign key ("FinalidadeTratamento_Id") references "ILA"."ILA_FINALIDADE_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CASES" add constraint "FK_ILA_CASES_Operador_Id" foreign key ("Operador_Id") references "ILA"."ILA_AGENTE_TRATAMENTO" ("Id")';

execute immediate '
alter table "ILA"."ILA_CATEGORIA_TITULARES" add constraint "FK_ILA_CATEGORIA_TIT_855575857" foreign key ("CriancasAdolescentes_Id") references "ILA"."ILA_ITEM_CAT_TITULARES_EXTRA" ("Id")';

execute immediate '
alter table "ILA"."ILA_CATEGORIA_TITULARES" add constraint "FK_ILA_CATEGORIA_TI_1283613405" foreign key ("OutrosGruposVulneraveis_Id") references "ILA"."ILA_ITEM_CAT_TITULARES_EXTRA" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_CAT_TITULARES" add constraint "FK_ILA_ITEM_CAT_TITU_322349057" foreign key ("CategoriasTitulares_Id") references "ILA"."ILA_CATEGORIA_TITULARES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_COMPARTILH_DADOS" add constraint "FK_ILA_ITEM_COMPARTIL_28943175" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_CONTRATO_TI" add constraint "FK_ILA_ITEM_CONTRATO_219996094" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_CAT_DADOS_PESSOAIS" add constraint "FK_ILA_ITEM_CAT_DAD_1592774738" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_MEDIDA_SEG_PRIV" add constraint "FK_ILA_ITEM_MEDIDA__1406282644" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_OBS_PROCESSO" add constraint "FK_ILA_ITEM_OBS_PROC_206035287" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_RISCO_PRIVACIDADE" add constraint "FK_ILA_ITEM_RISCO_P_1249904625" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_ITEM_TRANSF_INTERNACIONAL" add constraint "FK_ILA_ITEM_TRANSF_I_408086650" foreign key ("Case_Id") references "ILA"."ILA_CASES" ("Id")';

execute immediate '
alter table "ILA"."ILA_USERS" add constraint "FK_ILA_USERS_OriginGroup_Id" foreign key ("OriginGroup_Id") references "ILA"."ILA_GROUPS" ("Id")';

execute immediate '
alter table "ILA"."ILA_GROUP_ACCESS_EXPIRATIONS" add constraint "FK_ILA_GROUP_ACCESS__999518448" foreign key ("Group_Id") references "ILA"."ILA_GROUPS" ("Id")';

execute immediate '
alter table "ILA"."ILA_GROUP_ACCESS_EXPIRATIONS" add constraint "FK_ILA_GROUP_ACCESS__669116138" foreign key ("User_Id") references "ILA"."ILA_USERS" ("Id")';

end;
