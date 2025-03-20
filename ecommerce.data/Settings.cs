using System.Globalization;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace ecommerce.data
{
    public class Settings
    {
        public static string GetConnectionString()
        {
            return "";
        }
        public static string GetSalt()
        {
            return "";
        }
        public static List<string>? GetBadWordsRegexes()
        {
            List<string> RegexesList = new List<string>();

            try
            {
                using (SqlConnection conn = new SqlConnection(Settings.GetConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetBadWordsRegexes", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        conn.Open();

                        using (var reader = cmd.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                RegexesList.Add(reader.GetString(reader.GetOrdinal("Regex")));
                            };
                        }

                    }

                    return RegexesList;

                }
            }
            catch
            {
                return null;
            }
        }

    }
}
