export class Album {
    constructor(id,naziv,zanr,godinaIzdanja,izvodjac,izdavac)
    {
        this.id = id;
        this.naziv = naziv;
        this.zanr = zanr;
        this.godinaIzdanja = godinaIzdanja;
        this.izvodjac = izvodjac;
        this.izdavac = izdavac;
        this.albumCont = null;
    }

    crtajAlbum(host)
    {
        if(!host)
            throw new Error("Roditeljski element ne postoji");
        this.albumCont = document.createElement("div");
        this.albumCont.className = "album";
        host.appendChild(this.albumCont);
        
        var b = document.createElement("br");

        var nazivAlbuma = document.createElement("label");
        nazivAlbuma.innerHTML = this.naziv;
        nazivAlbuma.className = "nazivAlbuma"; 
        this.albumCont.appendChild(nazivAlbuma);
        this.albumCont.appendChild(b);

        this.albumCont.innerHTML +="Godina izdanja: " +this.godinaIzdanja;
        this.albumCont.appendChild(b);
        this.albumCont.innerHTML += "Izvođač: "+this.izvodjac;
        this.albumCont.appendChild(b);
        this.albumCont.innerHTML += "Žanr: "+this.zanr;
        this.albumCont.appendChild(b);
        this.albumCont.innerHTML += "Izdavačka kuća: "+this.izdavac;

        let divZaButtone = document.createElement("div");
        divZaButtone.className = "divZaButtone";
        this.albumCont.appendChild(divZaButtone);

        let btnIzmeni = document.createElement("button");
        btnIzmeni.className = "btnIzmeni";
        btnIzmeni.innerHTML = "Izmeni naziv";
        btnIzmeni.onclick = (ev) =>{
            this.izmeniAlbum();
        }
        divZaButtone.appendChild(btnIzmeni);

        let btnObrisi = document.createElement("button");
        btnObrisi.className = "btnObrisi";
        btnObrisi.innerHTML = "Obrisi";
        btnObrisi.onclick =(ev) =>
        {
            this.obrisiAlbum(this.id);
        }
        divZaButtone.appendChild(btnObrisi);

       

    }

    obrisiAlbum(id)
    {
        fetch("https://localhost:5001/Album/ObrisiAlbum/"+id,{
            method: "DELETE",
            headers:{
                "Content-type" :"application/json"
            }
        }).then(p =>{
            if(p.ok)
            {
                this.albumCont.remove();
            } 
            else
                alert("Nije bilo moguće obrisati album, pokušajte ponovo.");
        })


    }

    izmeniAlbum()
    {
        var naziv = prompt("Unesite novo ime");

        if(!naziv)
            return;

        var data = JSON.stringify({
            "id":this.id,
            "naziv":naziv,
            "zanr":this.zanr,
            "godinaIzdanja":this.godinaIzdanja
        });
        fetch("https://localhost:5001/Album/IzmeniNaziv/",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:data
        }).then(p =>{
            if(p.ok)
            {
                var nazivv = this.albumCont.querySelector(".nazivAlbuma");
                nazivv.innerHTML = naziv;
            } 
            else
                alert("Nije bilo moguce promeniti naziv albuma, pokusajte ponovo");
                
                if(!naziv)
                    return;
        })

    }

}