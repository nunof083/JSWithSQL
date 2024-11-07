import sqlite3 from "sqlite3";
const db = new sqlite3.Database('albums.db');

const albums = [];
const emails = [];
const customerPerCountry = [];
const tracks = [];

db.serialize(() => {
    db.each("SELECT AlbumId, Title, ArtistId FROM albums", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            albums.push(row)
            console.log(row.AlbumId + ": " + row.Title + " - ArtistId: " + row.ArtistId);
        }
        /*}, () => {
        console.log(albums);*/
    });

    db.each("SELECT CustomerId, Email FROM customers", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            emails.push(row)
            console.log(row.CustomerId + ": " + row.Email);
        }
        /*}, () => {
        console.log(emails);*/
    });

    db.each("SELECT Country, COUNT(CustomerId) as CustomerCount FROM customers GROUP BY Country ORDER BY CustomerCount", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            customerPerCountry.push(row)
            console.log(row.Country + ": " + row.CustomerCount);
        }
        /*}, () => {
        console.log(customerPerCountry);*/
    });


    //ici, si on ne met pas DISTINCT, il va afficher toutes les musiques de tous les albums (pour voir ça il faut afficher les musiques)
    db.each(" SELECT DISTINCT t.MediaTypeId, t.AlbumId, a.Title, m.Name FROM tracks t JOIN albums a ON t.AlbumId = a.AlbumId JOIN media_types m ON t.MediaTypeId = m.MediaTypeId WHERE t.MediaTypeId = 1", (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            tracks.push(row);
            console.log(row.AlbumId + " - " + row.Title + "." + row.Name);
        }
    /*}, () => {
        console.log(tracks);*/
    });
});


db.close();