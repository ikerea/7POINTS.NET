from odoo import models, fields


class Pisua(models.Model):
    _inherit = 'pisua'

    zereginak_ids = fields.One2many('pisua.zeregina', 'pisua_id', string="Tareas")


# 2. Creamos el modelo nuevo de Tareas
class Zeregina(models.Model):
    _name = 'pisua.zeregina'
    _description = 'Tarea del Piso'

    name = fields.Char(string="Tarea", required=True)
    description = fields.Text(string="Descripción")
    date = fields.Date(string="Fecha Inicio")
    
    state = fields.Selection([
        ('egiteko', 'Pendiente'),
        ('egiten', 'En Proceso'),
        ('eginda', 'Hecho')
    ], string="Estado", default='egiteko')

    # Relación con el piso (campo inverso)
    pisua_id = fields.Many2one('pisua', string="Piso Vinculado", required=True)
    
    # Relación con usuarios (Odoo Partners)
    asignado_ids = fields.Many2many('res.partner', string="Asignado a")