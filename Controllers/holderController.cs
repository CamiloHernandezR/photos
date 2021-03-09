using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Photos.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Photos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class holderController : ControllerBase
    {
        
        [HttpGet]
        public async Task<IEnumerable<Holder>> Get()
        {
            string url = "https://jsonplaceholder.typicode.com/photos";
            using var client = new HttpClient();
            var resp = await client.GetStringAsync(url);
            return JsonSerializer.Deserialize<Holder[]>(resp);
        }

    }
}
