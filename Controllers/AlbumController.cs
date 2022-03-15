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
    public class AlbumController : ControllerBase
    {

        public ProjekatContext Context;
        
        public AlbumController(ProjekatContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("VratiAlbume{korisnikID}")]
        public async Task<List<Album>> VratiAlbume(int korisnikID)
        {
            return await Context.Albumi.Where(p => p.Korisnik.ID == korisnikID)
                        .Include(p => p.Izvodjac)
                        .Include(p => p.Izdavac)
                        .ToListAsync();
        }
        [HttpPost]
        [Route("DodajAlbum/{korisnikID}/{izvodjacID}/{izdavacID}")]
        public async Task<ActionResult> DodajAlbum([FromBody]Album album,int korisnikID,int izvodjacID,int izdavacID)
        {
            if(izvodjacID <= 0)
                return BadRequest("Los izvodjacID");
            if(izdavacID <=0)
                return BadRequest("Los izdavacID");
            if(korisnikID <= 0)
                return BadRequest("Los korisnikID");
            if(string.IsNullOrWhiteSpace(album.Naziv) || album.Naziv.Length > 50)
                return BadRequest("Los naziv albuma");
            if(album.GodinaIzdanja < 1950 || album.GodinaIzdanja > 2022)
                return BadRequest("Losa godina izdanja");
            if(string.IsNullOrWhiteSpace(album.Zanr))
                return BadRequest("Zanr nije unesen");
            try
            {
                Korisnik k = await Context.Korisnici.Where(p => p.ID == korisnikID).FirstOrDefaultAsync();
                var i = await Context.Izvodjaci.Where(p => p.ID == izvodjacID).FirstOrDefaultAsync();
                var izd = await Context.Izdavaci.Where(p => p.ID == izdavacID).FirstOrDefaultAsync();
                if(k == null || i == null || izd == null)
                    return BadRequest("Neki od kljucnih podataka ne postoji u bazi");
                album.Korisnik = k;
                album.Izdavac = izd;
                album.Izvodjac = i;
                Context.Albumi.Add(album);
                await Context.SaveChangesAsync();
                return Ok("Album je dodat");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("VratiAlbumIzdavac/{korisnikID}/{izdavacID}")]
        public async Task<List<Album>> VratiAlbumIzdavac(int korisnikID,int izdavacID)
        {
            return await Context.Albumi.Where(p => p.Korisnik.ID == korisnikID && p.Izdavac.ID == izdavacID)
                                .Include(p => p.Izdavac)
                                .Include(p =>p.Izvodjac).ToListAsync();
        }

        [HttpGet]
        [Route("VratiAlbumIzvodjac/{korisnikID}/{izvodjacID}")]
        public async Task<List<Album>> VratiAlbumIzvodjac(int korisnikID,int izvodjacID)
        {
            return await Context.Albumi.Where(p => p.Korisnik.ID == korisnikID && p.Izvodjac.ID == izvodjacID)
                                .Include(p => p.Izdavac)
                                .Include(p =>p.Izvodjac).ToListAsync();
        }

        [HttpDelete]
        [Route("ObrisiAlbum/{albumID}")]
        public async Task<ActionResult> ObrisiAlbum(int albumID)
        {
            if(albumID <= 0)
                return BadRequest("Los ID albuma");
            try{
                var album = await Context.Albumi.Where(p => p.ID == albumID).FirstOrDefaultAsync();
                if( album == null)
                    return BadRequest("Album ne postoji u bazi");
                Context.Albumi.Remove(album);
                await Context.SaveChangesAsync();
                return Ok("Album je obrisan");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("IzmeniNaziv")]
        public async Task<ActionResult> IzmeniAlbum([FromBody]Album album)
        {
            if(album == null)
               return BadRequest("Album ne postoji");
            try{
                
                var sAlbum = await Context.Albumi.Where(p => p.ID == album.ID).FirstOrDefaultAsync();
                if (sAlbum == null)
                    return BadRequest("Album ne postoji");
                sAlbum.Naziv = album.Naziv;
                await Context.SaveChangesAsync();
                return Ok("Album je izmenjen");

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}