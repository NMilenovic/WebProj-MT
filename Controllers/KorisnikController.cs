using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;

namespace MT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : ControllerBase
    {

        public ProjekatContext Context;
        
        public KorisnikController(ProjekatContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("VratiKorisnike")]
        public async Task<List<Korisnik>> VratiKorisnike()
        {
            return await Context.Korisnici.ToListAsync();
        }

        [HttpPost]
        [Route("DodajKorisnika")]
        public async Task<ActionResult> DodajKorisnika([FromBody]Korisnik korisnik)
        {
            if(korisnik == null)
                return BadRequest("Korisnik je null");
            if(string.IsNullOrWhiteSpace(korisnik.Username) || korisnik.Username.Length > 50)
                return BadRequest("Nevalidno korisnicko ime");
            try
            {
                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik je dodat, id je {korisnik.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

       
    }
}
