from odoo import models, fields

class PisuaGastuak(models.Model):
    _inherit = 'hr.expense'

    pisua_id = fields.Many2one('pisua', string='Piso Vinculado', index=True)
    partner_id = fields.Many2one('res.partner', string='Inquilino / Pagador')