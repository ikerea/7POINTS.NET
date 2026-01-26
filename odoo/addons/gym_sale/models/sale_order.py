from odoo import models, fields

class SaleOrder(models.Model):
    _inherit = 'sale.order.line'

    member_id = fields.Many2one('gym.bazkideak', string="Bazkidea")