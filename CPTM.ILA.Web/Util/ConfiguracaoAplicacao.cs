using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Caching;
using CPTM.Comum;
using CPTM.ILA.Web.Models;

namespace CPTM.ILA.Web.Util
{
    /// <summary>
    /// Classe ConfiguracaoAplicacao
    /// </summary>
    public static class ConfiguracaoAplicacao
    {
        /// <summary>
        /// Método que retorna o objeto Usuario mantido no cache
        /// </summary>
        /// <returns>Objeto do tipo Usuario</returns>
        public static string ObterPorParametro(string parametro)
        {
            List<Configuracao> cache = MemoryCache.Default.Get(Constantes.ConfiguracaoListaTodas) as List<Configuracao>;

            // Verifica se existe no cache
            if (cache == null)
            {
                using(var _context = new ILAContext())
                {
                    cache = _context.Configuracao.ToList();
                }

                var tempoCache = cache.Where(x => x.Parametro.Equals(Constantes.ConfiguracaoCacheConfiguracaoLista)).FirstOrDefault();

                CacheItemPolicy policy = new CacheItemPolicy
                {
                    AbsoluteExpiration = DateTime.Now + TimeSpan.FromMinutes(Convert.ToInt32(tempoCache == null ? "0" : tempoCache.Valor))
                };
                MemoryCache.Default.Add(new CacheItem(Constantes.ConfiguracaoListaTodas, cache), policy);
            }

            var configuracao = cache
                                .Where(x => x.Parametro.Equals(parametro)).FirstOrDefault();

            if (configuracao == null)
                throw new Exception("Parâmetro não definido na tabela de configuração");

            return configuracao.Valor;
        }

        /// <summary>
        /// Método que limpa o cache para que as configurações possam ser recarregadas
        /// </summary>
        public static void LimparCache()
        {
            MemoryCache.Default.Remove(Constantes.ConfiguracaoListaTodas);
        }
    }
}
