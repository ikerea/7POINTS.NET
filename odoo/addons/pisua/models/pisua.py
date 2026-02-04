from odoo import models, fields

class Pisua(models.Model):
    _name = 'pisua'
    _description = 'Pisua'

    name = fields.Char(string="Pisu Izena", required=True)
    code = fields.Char(string="Pisuaren Kodigoa")
    coordinator_id = fields.Many2one('res.users', string="Koordinatzailea")
    inquilino_ids = fields.Many2many('res.partner', string="Inkilinoak (Guztiak)")

