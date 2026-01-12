from odoo import models, fields


class Pelikula(models.Model): #models.Model heredatzea: Klasea Odoo-ko modeloa bihurtzeko
    _name = 'zinema.pelikula' #modeloaren izen teknikoa (eta DB-KO taularen izena)
    _description = 'Pelikula Kudeatzailea' #Odoo-n agertzen den azalpena

    name = fields.Char(string='Izena', required=True) #Erregistroak identifikatzeko izena
    author = fields.Char(string='Egilea', required=True) #Erregistroa
    release_date = fields.Date(string='Data', required=True)
    duration = fields.Integer(string='Iraupena', required=True)
    resume = fields.Char(string='Sinopsia', required=True)


    