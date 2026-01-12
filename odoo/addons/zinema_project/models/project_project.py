from odoo import models, fields


class Projects(models.Model):
    _name = 'project.project'
    _inherit='project.project'

    pelikula_id = fields.Many2one('zinema.pelikula', string='Pelikula')


    