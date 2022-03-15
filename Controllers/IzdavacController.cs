using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
namespace MT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IzdavacController : ControllerBase
    {

        public ProjekatContext Context;
        
        public IzdavacController(ProjekatContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("VratiIzdavace/{korisnikID}")]
         public async Task<List<Izdavac>> VratiIzdavace(int korisnikID)
        {
            return await Context.Izdavaci.Where(p => p.Korisnik.ID == korisnikID).ToListAsync();
        }

        [HttpPost]
        [Route("DodajIzdavaca/{korisnikID}")]
        public async Task<ActionResult> DodajIzdavaca([FromBody]Izdavac izdavac,int korisnikID)
        {
            if(korisnikID <=0)
                return BadRequest("Los ID korisnika");
            if(izdavac == null)
                return BadRequest("izdavac je null");
            if(string.IsNullOrWhiteSpace(izdavac.Naziv) || izdavac.Naziv.Length > 50)
                return BadRequest("Los naziv izdavaca");
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == korisnikID).FirstOrDefaultAsync();
                if(korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji!");
                }
                izdavac.Korisnik = korisnik;
                Context.Izdavaci.Add(izdavac);
                await Context.SaveChangesAsync();
                return Ok("Izdavac je dodat");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}