from odoo import models, fields

class BaliabideTresnak(models.Model):
    _name = 'baliabideak.tresnak'
    _description = 'Baliabide tresnak kudeatzeko herraminta'

    name = fields.Char(string="Izena", required=True)
    serial_name = fields.Char(string="Serie Zenbakia", required=True)
    purchase_date = fields.Date(string="Erosketa data", required=True)
    value = fields.Float(string="Balioa", required=True)
    state = fields.Selection([
        ('available', 'Erabilgarri'),
        ('rented', 'Mailegua'),
        ('damaged', 'Hautsita')
    ], string="Egoera", default='available')
    is_electric = fields.Boolean(string="Elektrikoa da?", required=True)
    description = fields.Text(string="Deskripzioa", required=False)