from odoo import models, fields

class Pisua(models.Model):
    _name = 'pisua'
    _description = 'Pisua'

    name = fields.Char(string="Pisu Izena", required=True)
    code = fields.Char(string="Pisuaren Kodigoa")
    zereginak_ids = fields.One2many('zereginak', 'pisua_id', string="Zereginak")
    coordinator_id = fields.Many2one('res.users', string="Koordinatzailea")

