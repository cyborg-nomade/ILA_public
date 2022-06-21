using System;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace CPTM.ILA.Web
{
    /// <summary>
    /// Configuração da Web API
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Registra as configurações da Web API.
        /// Define cabeçalhos CORS de resposta.
        /// Mapeia as rotas.
        /// Configura a formatação das respostas JSON
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            var corsAttr = new EnableCorsAttribute("*",
                "Origin,X-Requested-With,Content-Type,Accept,Authorization", "*") { SupportsCredentials = true };
            config.EnableCors(corsAttr);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(name: "ActionApi", routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional });

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            // JSON Formatter
            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.Add(new BrowserJsonFormatter());
        }
    }

    /// <inheritdoc />
    public class BrowserJsonFormatter : JsonMediaTypeFormatter
    {
        /// <inheritdoc />
        public BrowserJsonFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            SerializerSettings.Formatting = Formatting.Indented;
            SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            UseDataContractJsonSerializer = false;
        }

        /// <inheritdoc />
        public override void SetDefaultContentHeaders(Type type, HttpContentHeaders headers,
            MediaTypeHeaderValue mediaType)
        {
            base.SetDefaultContentHeaders(type, headers, mediaType);
            headers.ContentType = new MediaTypeHeaderValue("application/json");
        }
    }
}