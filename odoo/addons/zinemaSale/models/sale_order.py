from odoo import models, fields


class SaleOrderLine(models.Model): #models.Model heredatzea: Klasea Odoo-ko modeloa bihurtzeko
    _inherit='sale.order.line'

    pelikula_id = fields.Many2one('zinema.pelikula', string='Pelikula')


    