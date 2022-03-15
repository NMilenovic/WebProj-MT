import { Izdavac } from "./izdavac.js";
import { Izvodjac } from "./izvodjac.js";
import { Album } from "./album.js";
import { Korisnik } from "./korisnik.js";

export class GlavnaForma {
    constructor(listaKorisnika) {
        this.listaKorisnika = listaKorisnika;
        this.listaIzdavaca = [];
        this.listaIzvodjaca = [];
        this.trenutniKorisnik = null;
        this.cont = null;
        this.listaAlbuma = [];
        this.zanrovi = ["Rep", "Rock", "Metal", "Pop", "Jazz"];
    }
    //draw funckije
    crtaj(host) {
        if (!host)
            throw new Error("Roditeljski element ne postoji");
        this.cont = document.createElement("div");
        this.cont.className = "glavniKontejner";
        host.appendChild(this.cont);

        let sideForm = document.createElement("div");
        sideForm.className = "sideForm";
        this.cont.appendChild(sideForm);

        let mainForm = document.createElement("div");
        mainForm.className = "mainForm";
        this.cont.appendChild(mainForm);

        this.crtajSideForm(sideForm);
    }

    crtajSideForm(host) {
        if (!host)
            throw new Error("Roditeljski element ne postoji");
        let userInput = document.createElement("div");
        userInput.className = "userInput";
        let izdavacInput = document.createElement("div");
        izdavacInput.className = "izdavacInput";
        let izvodjacInput = document.createElement("div");
        izvodjacInput.className = "izvodjacInput";
        let albumInput = document.createElement("div");
        albumInput.className = "albumInput";
        let izmeniInput = document.createElement("div");
        izmeniInput.className = "izmeniInput";
        var niz = [userInput, izdavacInput, izvodjacInput, albumInput, izmeniInput];

        niz.forEach(p => {
            host.appendChild(p);
        });

        this.crtajUser(userInput);
        this.crtajIzdavac(izdavacInput);
        this.crtajIzvodjac(izvodjacInput);
        this.crtajAlbumInput(albumInput);
    }

    crtajUser(host) {
        if (!host)
            throw new Error("Roditeljski elemnt ne postoji");
        let l = document.createElement("label");
        l.innerHTML = "Izaberite vaše korisničko ime:";
        host.appendChild(l);

        let se = document.createElement("select");
        se.className = "korisnikSelect"
        host.appendChild(se);

        let op;
        this.listaKorisnika.forEach(p => {
            op = document.createElement("option");
            op.innerHTML = p.username;
            op.value = p.id;
            se.appendChild(op);
        })

        var btnUsernamePotvrda = document.createElement("button");
        btnUsernamePotvrda.className = "usernamePotvrda";
        btnUsernamePotvrda.innerHTML = "Potvrdi izbor";
        btnUsernamePotvrda.onclick = (ev) => {
            this.trenutniKorisnik = this.cont.querySelector(".korisnikSelect").value;
            this.disable();
            this.ucitajIzdavace();
            this.ucitajIzvodjace();

        }
        host.appendChild(btnUsernamePotvrda);
        var b = document.createElement("br");
        host.appendChild(b);

        l = document.createElement("label");
        l.innerHTML = "Ili unesite novo korisničko ime";
        host.appendChild(l);

        var ie = document.createElement("input");
        ie.className = "usernameInput";
        host.appendChild(ie);

        var btnNoviUser = document.createElement("button");
        btnNoviUser.className = "noviUser";
        btnNoviUser.innerHTML = "Dodaj"
        btnNoviUser.onclick = (ev) => {
            this.dodajKorisnika();

        }
        host.appendChild(btnNoviUser);
    }

    crtajIzdavac(host) {
        if (!host) {
            throw new Error("Roditeljski element ne postoji");
        }
        let l = document.createElement("label");
        l.innerHTML = "Izaberite izdavačku kuću";
        host.appendChild(l);

        let se = document.createElement("select");
        se.className = "izdavacSelect";
        host.appendChild(se);

        let btnPotvrdiIzdavaca = document.createElement("button");
        btnPotvrdiIzdavaca.innerHTML = "Izaberi";
        btnPotvrdiIzdavaca.className = "btnPotvrdiIzdavaca";
        btnPotvrdiIzdavaca.onclick = (ev) => {
            this.albumIzdavac();
        }
        host.appendChild(btnPotvrdiIzdavaca);

        var b = document.createElement("br");
        host.appendChild(b);

        l = document.createElement("label");
        l.innerHTML = "Dodaj izdavačku kuću:";
        host.appendChild(l);

        var ie = document.createElement("input");
        ie.className = "ieIzdavacInput";
        host.appendChild(ie);

        var btnDodajIzdavaca = document.createElement("button");
        btnDodajIzdavaca.innerHTML = "Dodaj izdavača";
        btnDodajIzdavaca.onclick = (ev) => {
            this.dodajIzdavaca();
        }
        host.appendChild(btnDodajIzdavaca);


    }

    crtajIzvodjac(host) {
        if (!host) {
            throw new Error("Roditeljski element ne postoji");
        }
        let l = document.createElement("label");
        l.innerHTML = "Izaberite izdavača:";
        host.appendChild(l);

        let se = document.createElement("select");
        se.className = "izvodjacSelect";
        host.appendChild(se);

        let btnPotvrdiIzvodjaca = document.createElement("button");
        btnPotvrdiIzvodjaca.innerHTML = "Izaberi";
        btnPotvrdiIzvodjaca.className = "btnPotvrdiIzvodjaca";
        btnPotvrdiIzvodjaca.onclick = (ev) => {
            this.albumIzvodjac();
        }
        host.appendChild(btnPotvrdiIzvodjaca);

        var b = document.createElement("br");
        host.appendChild(b);

        l = document.createElement("label");
        l.innerHTML = "Dodaj izvođača:";
        host.appendChild(l);

        var ie = document.createElement("input");
        ie.className = "ieIzvodjac";
        host.appendChild(ie);

        var btnDodajIzvodjaca = document.createElement("button");
        btnDodajIzvodjaca.innerHTML = "Dodaj izvođača";
        btnDodajIzvodjaca.onclick = (ev) => {
            this.dodajIzvodjaca();
        }
        host.appendChild(btnDodajIzvodjaca);
    }

    crtajAlbumInput(host) {
        if (!host)
            throw new Error("Roditeljski element ne postoji");
        var l = document.createElement('label');
        l.innerHTML = "Dodaj novi album:";
        host.appendChild(l);

        var b = document.createElement("br");
        host.appendChild(b);

        l = document.createElement("label");
        l.innerHTML = "Izdavača kuća:";
        host.appendChild(l);

        var se = document.createElement("select");
        se.className = "seAlbumIzdavac";
        host.appendChild(se);

        l = document.createElement("label");
        l.innerHTML = "Izvođač:";
        host.appendChild(l);

        se = document.createElement("select");
        se.className = "seAlbumIzvodjac";
        host.appendChild(se);

        b = document.createElement("br");
        host.appendChild(b);

        l = document.createElement("label");
        l.innerHTML = "Naziv albuma:";
        host.appendChild(l);

        var ie = document.createElement("input");
        ie.className = "ieAlbumNaziv";
        host.appendChild(ie);


        l = document.createElement("label");
        l.innerHTML = "Žanr:";
        host.appendChild(l);

        se = document.createElement("select");
        se.className = "seZanr";
        host.appendChild(se);

        var op;
        this.zanrovi.forEach((p, index) => {
            op = document.createElement("option");
            op.innerHTML = p;
            op.value = index;
            se.appendChild(op);
        })

        b = document.createElement("br");
        host.appendChild(b);

        l = document.createElement("label");
        l.innerHTML = "Godina izdanja:";
        host.appendChild(l);

        ie = document.createElement("input");
        ie.className = "ieGodinaIzdanja";
        host.appendChild(ie);

        var btnDodajAlbum = document.createElement("button");
        btnDodajAlbum.innerHTML = "Dodaj album";
        btnDodajAlbum.className = "btnDodajAlbum";
        btnDodajAlbum.onclick = (ev) => {
            this.dodajAlbum();
        }
        host.appendChild(btnDodajAlbum);

    }

    //fetch funckije

    dodajKorisnika() {
        var username = this.cont.querySelector(".usernameInput").value;
        if (!username) {
            alert("Morate uneti novi username!");
            return;
        }
        var flag = false;
            this.listaKorisnika.forEach(p =>{
                if(p.username == username)
                    {
                        flag = true;
                    }
            });
        
        if(flag == true)
        {
            alert("Korisnik vec postoji!");
            return;
        }

        var data = JSON.stringify({
            "username": username
        });

        fetch("https://localhost:5001/Korisnik/DodajKorisnika", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(p => {
            if (p.ok) {
                alert("Korisnik je dodat!");
                this.updateKorisnik();
            }
            else
                alert("Doslo je do greske prilikom dodavanja novog korisnika, pokusajte opet.");
        })
    }

    ucitajIzdavace() {
        fetch("https://localhost:5001/Izdavac/VratiIzdavace/" + this.trenutniKorisnik)
            .then(p => {
                p.json().then(izdavaci => {
                    izdavaci.forEach(izdavac => {
                        var i = new Izdavac(izdavac.id, izdavac.naziv);
                        this.listaIzdavaca.push(i);
                    })
                    this.updateIzdavac();
                })
            })
    }

    dodajIzdavaca() {
        var naziv = this.cont.querySelector(".ieIzdavacInput").value;
        if (!naziv) {
            alert("Morate uneti naziv izdavaca pre dodavanja!");
            return;
        }
        var flag = false;
            this.listaIzdavaca.forEach(p =>{
                if(p.naziv == naziv)
                    {
                        flag = true;
                    }
            });
        
        if(flag == true)
        {
            alert("Izdavač već postoji!");
            return;
        }
        var data = JSON.stringify({
            "naziv": naziv
        });
        fetch("https://localhost:5001/Izdavac/DodajIzdavaca/" + this.trenutniKorisnik, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(p => {
            if (p.ok) {
                this.listaIzdavaca = [];
                this.ucitajIzdavace();
                
            }
            else
                alert("Nije bilo moguci dodati izdavacku kucu, pokusajte ponovo");
            this.updateIzdavac();
           
        });


    }
    ucitajIzvodjace() {
        fetch("https://localhost:5001/Izvodjac/VratiIzvodjace/" + this.trenutniKorisnik)
            .then(p => {
                p.json().then(izvodjaci => {
                    izvodjaci.forEach(izvodjac => {
                        var i = new Izvodjac(izvodjac.id, izvodjac.naziv);
                        this.listaIzvodjaca.push(i);
                    })
                    this.updateIzvodjac();
                })
            })
    }

    dodajIzvodjaca() {
        var naziv = this.cont.querySelector(".ieIzvodjac").value;
        if (!naziv) {
            alert("Morate uneti ime novog izvodjaca pre dodavanja");
            return;
        }
        var flag = false;
            this.listaIzvodjaca.forEach(p =>{
                if(p.naziv == naziv)
                    {
                        flag = true;
                    }
            });
        
        if(flag == true)
        {
            alert("Izvođač već postoji!");
            return;
        }
        var data = JSON.stringify({
            "naziv": naziv
        });
        fetch("https://localhost:5001/Izvodjac/DodajIzvodjaca/" + this.trenutniKorisnik, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(p => {
            if (p.ok) {
                this.listaIzvodjaca = [];
                this.ucitajIzvodjace();
            }
            else
                alert("Doslo je do greske pri dodavanju izvodjaca, pokusajte ponovo");
        })
    }

    dodajAlbum() {
        var ik = this.cont.querySelector(".seAlbumIzdavac").value;
        var izv = this.cont.querySelector(".seAlbumIzvodjac").value;
        var nalbum = this.cont.querySelector(".ieAlbumNaziv").value;
        var zanr = this.cont.querySelector(".seZanr").value;
        var god = this.cont.querySelector(".ieGodinaIzdanja").value;

        if (!ik) {
            alert("Izaberite izdavacku kucu!");
            return;
        }
        if (!izv) {
            alert("Izaberite izvodjaca!");
            return;
        }
        if (!nalbum) {
            alert("Unesite naziv albuma!");
            return;
        }
        if (!zanr) {
            alert("Izaberite zanr!");
            return;
        }
        if (!god) {
            alert("Unesite godinu izdanja albuma!");
            return;
        }
        if (god > 2022 || god < 1950) {
            alert("Nevalidna godina izdanja albuma!");
            return;
        }
        var data = JSON.stringify(
            {
                "naziv": nalbum,
                "zanr": this.zanrovi[zanr],
                "godinaIzdanja": parseInt(god)
            });
        fetch("https://localhost:5001/Album/DodajAlbum/" + this.trenutniKorisnik + "/" + izv + "/" + ik, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(p => {
            if (p.ok)
                alert("Album je dodat!");
            else
                alert("Album nije dodat, pokušajte ponovo");
        })

    }

    albumIzdavac() {
        this.listaAlbuma = [];
        var mf = this.cont.querySelector(".mainForm");
        var i = this.cont.querySelector(".izdavacSelect").value;

        while (mf.firstChild != null)
            mf.removeChild(mf.firstChild)

        fetch("https://localhost:5001/Album/VratiAlbumIzdavac/" + this.trenutniKorisnik + "/" + i)
            .then(p => {
                p.json().then(albumi => {
                    albumi.forEach(album => {
                        var a = new Album(album.id, album.naziv, album.zanr, album.godinaIzdanja, album.izvodjac.naziv, album.izdavac.naziv);
                        this.listaAlbuma.push(a);
                    })
                    this.listaAlbuma.forEach(album => {
                        album.crtajAlbum(mf);
                    })
                })
            })
    }

    albumIzvodjac() {
        this.listaAlbuma = [];
        var mf = this.cont.querySelector(".mainForm");
        while (mf.firstChild != null)
            mf.removeChild(mf.firstChild);
        var i = this.cont.querySelector(".izvodjacSelect").value;
        fetch("https://localhost:5001/Album/VratiAlbumIzvodjac/" + this.trenutniKorisnik + "/" + i)
            .then(p => {
                p.json().then(albumi => {
                    albumi.forEach(album => {
                        var a = new Album(album.id, album.naziv, album.zanr, album.godinaIzdanja, album.izvodjac.naziv, album.izdavac.naziv);
                        this.listaAlbuma.push(a);
                    })
                    this.listaAlbuma.forEach(album => {
                        album.crtajAlbum(mf);
                    })
                })
            })
    }


    //ostale funckije
    disable() {
        var dugme = this.cont.querySelector(".usernamePotvrda");
        dugme.setAttribute("disabled", "disabled");

        var dugme2 = this.cont.querySelector(".noviUser");
        dugme2.setAttribute("disabled", "disabled");

        var ie = this.cont.querySelector(".usernameInput");
        ie.setAttribute("disabled", "disabled")
    }
    updateIzdavac() {
        var se = this.cont.querySelector(".izdavacSelect");
        var se1 = this.cont.querySelector(".seAlbumIzdavac");
        var op;

        while (se.firstChild != null)
            se.removeChild(se.firstChild);

        while (se.firstChild != null)
            se1.removeChild(se.firstChild);

        this.listaIzdavaca.forEach(p => {
            op = document.createElement("option");
            op.innerHTML = p.naziv;
            op.value = p.id;
            se.appendChild(op);

            op = document.createElement("option");
            op.innerHTML = p.naziv;
            op.value = p.id;
            se1.appendChild(op);
        })
    }
    updateIzvodjac() {
        var se = this.cont.querySelector(".izvodjacSelect");
        var se1 = this.cont.querySelector(".seAlbumIzvodjac");
        var op;

        while (se.firstChild != null) {
            se.removeChild(se.firstChild);
        }

        while (se1.firstChild != null)
            se1.removeChild(se1.firstChild);


        this.listaIzvodjaca.forEach(p => {
            op = document.createElement("option");
            op.innerHTML = p.naziv;
            op.value = p.id;
            se.appendChild(op);

            op = document.createElement("option");
            op.innerHTML = p.naziv;
            op.value = p.id;
            se1.appendChild(op);
        })
    }

    updateKorisnik() {
        var se = this.cont.querySelector(".korisnikSelect");

        while (se.firstChild != null) {
            se.removeChild(se.firstChild);
        }

        this.listaKorisnika = [];
        fetch("https://localhost:5001/Korisnik/VratiKorisnike")
            .then(p => {
                p.json().then(korisnici => {
                    korisnici.forEach(korisnik => {
                        var k = new Korisnik(korisnik.id, korisnik.username);
                        this.listaKorisnika.push(k);
                    });
                    let op;
                    this.listaKorisnika.forEach(p => {
                        op = document.createElement("option");
                        op.innerHTML = p.username;
                        op.value = p.id;
                        se.appendChild(op);
                    })
                });


            })
    }
}
