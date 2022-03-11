using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Data.OracleClient;
using CPTM.Comum;

namespace CPTM.ILA.Web.Util
{
    public static class DbUtil
    {
        /// <summary>
        /// Obtém o valor da sequence
        /// </summary>
        /// <param name="context">Contexto</param>
        /// <param name="sequence">Nome da sequence</param>
        /// <returns></returns>
        public static Int32 ObterValorSequence(DbContext context, string sequence)
        {
            return Convert.ToInt32(context.Database.SqlQuery<Int64>(String.Concat("SELECT ", sequence, ".NEXTVAL FROM DUAL")).FirstOrDefault());
        }

        /// <summary>
        /// Obtém a data/hora atual do servidor de banco de dados
        /// </summary>
        /// <returns>Data/Hora atual</returns>
        /// <example>
        /// <code>
        ///     var dataHoraAtual = UtilRepositorio.ObterDataHoraAtual();
        /// </code>
        /// </example>
        public static DateTime ObterDataHoraAtual(DbContext context)
        {
            return Convert.ToDateTime(context.Database.SqlQuery<DateTime>("SELECT SYSDATE FROM DUAL").FirstOrDefault());
        }

        /// <summary>
        /// Executa a query no banco de dados da aplicação
        /// </summary>
        /// <param name="context"></param>
        /// <param name="query"></param>
        /// <param name="consulta"></param>
        /// <returns></returns>
        [Obsolete]
        public static List<string[]> ExecutarQuery(DbContext context, string query, bool consulta)
        {
            if ((query.ToUpper().IndexOf("UPDATE") > -1 || query.ToUpper().IndexOf("DELETE") > -1) && query.ToUpper().IndexOf("WHERE") == -1)
                throw new CPTMException("Não é permitida a execução de UPDATE ou DELETE sem WHERE.");

            using (OracleConnection connection = new OracleConnection(context.Database.Connection.ConnectionString))
            {
                if (consulta)
                {
                    var lista = new List<string[]>();

                    var dataAdapter = new OracleDataAdapter();
                    dataAdapter.SelectCommand = new OracleCommand(query, connection);
                    var dataSet = new DataSet("DataSet");
                    dataAdapter.Fill(dataSet, "Table");

                    var columnNames = dataSet.Tables[0].Columns.Cast<System.Data.DataColumn>()
                                     .Select(x => x.ColumnName)
                                     .ToArray();
                    lista.Add(columnNames);

                    foreach (System.Data.DataRow row in dataSet.Tables[0].Rows)
                    {
                        lista.Add(row.ItemArray.Select(x => x.ToString()).ToArray());
                    }

                    return lista;
                }
                else
                {
                    using (OracleCommand command = new OracleCommand(query, connection))
                    {
                        command.Connection.Open();
                        command.ExecuteNonQuery();
                        command.Connection.Close();

                        return null;
                    }
                }
            }
        }

        /// <summary>
        /// Essa classe foi criada somente para que a DLL do Oracle.ManagedDataAccess.EntityFramework seja copiada para o projeto Web.
        /// Somente DLLs utilizadas são copiadas para os outros projetos.
        /// </summary>
        internal static class OracleDummyClass
        {
            static OracleDummyClass()
            {
                Action<Type> noop = _ => { };
                var dummy = typeof(Oracle.ManagedDataAccess.EntityFramework.EFOracleFunctions);
                noop(dummy);
            }
        }
    }
}
