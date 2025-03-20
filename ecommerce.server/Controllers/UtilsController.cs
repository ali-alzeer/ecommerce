using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce.data;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UtilsController : ControllerBase
    {
        [HttpGet("regexes")]
        public ActionResult<List<string>> GetBadWordsRegexes()
        {
            List<string>? Regexes = Settings.GetBadWordsRegexes();
            if (Regexes == null)
            {
                return BadRequest("An error occurred during getting the regexes");
            }
            return Ok(Regexes);
        }
    }
}