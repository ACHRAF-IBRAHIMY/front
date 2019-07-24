/* REPORT RANKING */
var ranking = [
    {
        "title":"COMMUNE CIN SEBAA",
        "Delai":3,
        "Attractivite":21,
        "Digital":7,
        "Ecosysteme":2,
        "Fiscalite":5,
        "Score":239,
        "Deff":"+2"
    },{
        "title":"COMMUNE BOUHA",
        "Delai":5,
        "Attractivite":16,
        "Digital":9,
        "Ecosysteme":1,
        "Fiscalite":3,
        "Score":214,
        "Deff":"+0"
    },{
        "title":"COMMUNE SIDI MOUMEN",
        "Delai":5,
        "Attractivite":16,
        "Digital":9,
        "Ecosysteme":1,
        "Fiscalite":3,
        "Score":214,
        "Deff":"-1"
    }
];

function sortByName(key1, key2){
return key1.title > key2.title;
}

function sortByNameR(key1, key2){
return key1.title < key2.title;
}

function sortByDelai(key1, key2){
return key1.Delai > key2.Delai;
}

function sortByDelaiR(key1, key2){
return key1.Delai < key2.Delai;
}

function sortByDigital(key1, key2){
return key1.Digital > key2.Digital;
}

function sortByDigitalR(key1, key2){
return key1.Digital < key2.Digital;
}

function sortByAttractivite(key1, key2){
return key1.Attractivite > key2.Attractivite;
}

function sortByAttractiviteR(key1, key2){
return key1.Attractivite < key2.Attractivite;
}

function sortByEcosysteme(key1, key2){
return key1.Ecosysteme > key2.Ecosysteme;
}

function sortByEcosystemeR(key1, key2){
return key1.Ecosysteme < key2.Ecosysteme;
}

function sortByScore(key1, key2){
return key1.Score > key2.Score;
}

function sortByAScoreR(key1, key2){
return key1.Score < key2.Score;
}

function sortByFiscalite(key1, key2){
return key1.Fiscalite > key2.Fiscalite;
}

function sortByFiscaliteR(key1, key2){
return key1.Fiscalite < key2.Fiscalite;
}