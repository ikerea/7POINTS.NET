from odoo import models, fields

class BaliabideProject(models.Model):
    _inherit = 'project.task'

    tool_id = fields.Many2one('baliabideak.tresnak', string="Erabilitako Tresna")