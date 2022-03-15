using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IzvodjacController : ControllerBase
    {

        public ProjekatContext Context;
        
        public IzvodjacController(ProjekatContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("VratiIzvodjace/{korisnikID}")]
        public async Task<List<Izvodjac>> VratiIzvodjace(int korisnikID)
        {
            return await Context.Izvodjaci.Where(p => p.Korisnik.ID == korisnikID).ToListAsync();   
        }

        [HttpPost]
        [Route("DodajIzvodjaca/{korisnikID}")]
        public async Task<ActionResult> DodajIzvodjaca([FromBody]Izvodjac izvodjac, int korisnikID)
        {
            if(korisnikID <=0)
                return BadRequest("Los ID korisnika");
            if(izvodjac == null)
                return BadRequest("Izvodjac je null");
            if(string.IsNullOrWhiteSpace(izvodjac.Naziv) || izvodjac.Naziv.Length > 50)
                return BadRequest("Los naziv izvodjaca");
            try
            {
                var korisnik = await Context.Korisnici.Where(p => p.ID == korisnikID).FirstOrDefaultAsync();
                if(korisnik == null)
                {
                    return BadRequest("Korisnik ne postoji!");
                }
                izvodjac.Korisnik = korisnik;
                Context.Izvodjaci.Add(izvodjac);
                await Context.SaveChangesAsync();
                return Ok("Izvodjac je dodat");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}