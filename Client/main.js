import { GlavnaForma } from "./glavnaForma.js";
import { Korisnik } from "./korisnik.js";
var listaKorisnika = [];
fetch("https://localhost:5001/Korisnik/VratiKorisnike")
.then(p => {
    p.json().then(korisnici =>{
        korisnici.forEach(korisnik => {
            var k = new Korisnik(korisnik.id,korisnik.username);
            listaKorisnika.push(k);
        });
        var gf = new GlavnaForma(listaKorisnika);
        gf.crtaj(document.body);
    })
})

