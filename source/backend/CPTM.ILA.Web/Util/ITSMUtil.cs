using System;
using System.Net;
using System.Threading.Tasks;
using RestSharp;

namespace CPTM.ILA.Web.Util
{
    public class ItsmUtil
    {
        private const string ItsmUrl = "https://10.200.77.162:8443/api/";
        private const string ApiLogin = "INTEGRACAO_CPTM_LGPD";
        private const string ApiPass = "INTEGRACAO_CPTM_LGPD";

        public static async Task<bool> AbrirChamado(string username, string descricao, TipoChamado tipoChamado)
        {
            ServicePointManager.ServerCertificateValidationCallback +=
                (sender, certificate, chain, sslPolicyErrors) => true;

            var loginClient = new RestClient(ItsmUrl + "jwt/login")
            {
                Timeout = -1
            };
            //client.RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

            var template = "";

            switch (tipoChamado)
            {
                case TipoChamado.ACESSO_AO_SISTEMA:
                    template = "INC AUT SOLICITACAO INVENTARIO LGPD AUTOMATIZADO";
                    break;
                case TipoChamado.DUVIDA:
                    template = "INC AUT DUVIDA INVENTARIO LGPD AUTOMATIZADO";
                    break;
                case TipoChamado.ACESSO_A_GRUPOS:
                    template = "INC AUT ACESSO GRUPO INVENTARIO LGPD AUTOMATIZADO";
                    break;
                case TipoChamado.ERRO:
                    template = "INC AUT ERRO INVENTARIO LGPD AUTOMATIZADO";
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(tipoChamado), tipoChamado, null);
            }


            var loginRequest = new RestRequest(Method.POST);
            loginRequest.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            loginRequest.AddHeader("Accept", "*/*");
            loginRequest.AddParameter("username", ApiLogin);
            loginRequest.AddParameter("password", ApiPass);
            var loginResponse = await loginClient.ExecuteAsync(loginRequest);


            var jwt = loginResponse.Content;

            var chamadoClient = new RestClient(ItsmUrl + "arsys/v1.0/entry/PDP:RF100_CriaIncidentePorEmail")
            {
                Timeout = -1
            };
            var request = new RestRequest(Method.POST);
            request.AddHeader("Authorization", "AR-JWT " + jwt);
            request.AddHeader("Content-Type", "application/json");
            request.AddJsonBody(new
            {
                values = new
                {
                    PDP_chrLoginUsuario = username,
                    PDP_chrTemplateDeIncidente = template,
                    PDP_ddlFormatoDeAbertura = "UNICO",
                    PDP_chrDescricao = descricao
                }
            });
            var response = await chamadoClient.ExecuteAsync(request);
            var enviado = response.IsSuccessful;

            return enviado;
        }
    }

    public enum TipoChamado
    {
        DUVIDA,
        ACESSO_A_GRUPOS,
        ACESSO_AO_SISTEMA,
        ERRO
    }
}