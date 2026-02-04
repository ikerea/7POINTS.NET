from odoo import models, fields

class Pisua(models.Model):
    _name = 'pisua'
    _description = 'Pisua'

    name = fields.Char(string="Pisu Izena", required=True)
    code = fields.Char(string="Pisuaren Kodigoa")
    coordinator_id = fields.Many2one('res.users', string="Koordinatzailea")
    inquilino_ids = fields.Many2many('res.partner', string="Inkilinoak (Guztiak)")
    zereginak_ids = fields.One2many('pisua.zeregina' 'pisua_id', string="Zereginak")




class Zeregina(models.Model):
    _name = 'pisua.zeregina'
    _description = 'Pisuko Zereginak'

    name = fields.Char(string="Zeregina", required=True)    
    description = fields.Text(string="Deskripzioa")       
    date = fields.Date(string="Hasiera Data")             
    
    #Estado (Mapping de Laravel: egiteko, egiten, eginda)
    state = fields.Selection([
        ('egiteko', 'Pendiente'),
        ('egiten', 'En Proceso'),
        ('eginda', 'Hecho')
    ], string="Estado", default='egiteko')

    pisua_id = fields.Many2one('pisua', string="Piso Vinculado", required=True)
    
    asignado_ids = fields.Many2many('res.partner', string="Asignado a")