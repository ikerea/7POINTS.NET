from odoo import models, fields

class Zereginak(models.Model):
    _name = 'zereginak'
    _description = 'Tareas de un piso'

    name = fields.Char(string="Título de la tarea", required=True)
    description = fields.Text(string="Descripción")
    pisua_id = fields.Many2one('pisua', string="Pisua")
    assigned_user_id = fields.Many2one('res.users', string="Usuario asignado")
    status = fields.Selection([('pending','Pendiente'), ('done','Hecho')], default='pending')

