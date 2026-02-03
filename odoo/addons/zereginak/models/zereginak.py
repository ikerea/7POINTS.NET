# -*- coding: utf-8 -*-
from odoo import models, fields, api

class Zereginak(models.Model):
    _name = 'zereginak.zereginak'
    _description = 'Pisuaren Zereginak'

    # 1. Campo 'izena'
    # En Odoo se suele usar 'name' para que el sistema sepa cómo mostrar el registro.
    # Usamos string="Izena" para que la etiqueta se vea en euskera.
    name = fields.Char(string='Izena', required=True)

    # 2. Campo 'deskripzioa'
    deskripzioa = fields.Text(string='Deskripzioa')

    # 3. Campo 'egoera'
    # En Laravel usas un string, en Odoo lo mejor es un Selection (lista desplegable)
    state = fields.Selection([
        ('egin_gabe', 'Egin gabe'), # Valor técnico, Etiqueta visual
        ('prozesuan', 'Prozesuan'),
        ('eginda', 'Eginda'),
    ], string='Egoera', default='egin_gabe')

    # 4. Relación 'pisua_id' (BelongsTo)
    # ATENCIÓN: Debes saber el '_name' exacto del modelo de tu compañero.
    # He puesto 'pisua.pisua' como ejemplo, pero podría ser 'pisua.apartment' o similar.
    pisua_id = fields.Many2one(
        comodel_name='pisua.pisua', # <--- CAMBIA ESTO por el nombre del modelo de tu compañero
        string='Pisua',
        required=True
    )

    # 5. Relación 'erabiltzaileak' (BelongsToMany con Pivot)
    # Como tienes 'hasiera_data' y 'amaiera_data', usamos One2many hacia una tabla intermedia.
    egin_ids = fields.One2many(
        comodel_name='zereginak.egin',
        inverse_name='zeregina_id',
        string='Erabiltzaileak'
    )

# --- Modelo Intermedio (Equivalente a tu tabla pivote 'egin') ---

class ZereginakEgin(models.Model):
    _name = 'zereginak.egin'
    _description = 'Zereginak nork egin dituen'

    # Relación inversa hacia la tarea
    zeregina_id = fields.Many2one(
        comodel_name='zereginak.zereginak', 
        string='Zeregina',
        required=True,
        ondelete='cascade' # Si borras la tarea, se borra esta línea
    )

    # El usuario (User::class en Laravel)
    # En Odoo los usuarios están en el modelo 'res.users'
    erabiltzailea_id = fields.Many2one(
        comodel_name='res.users', 
        string='Erabiltzailea',
        required=True
    )

    # Los campos extra de tu pivot
    hasiera_data = fields.Datetime(string='Hasiera Data')
    amaiera_data = fields.Datetime(string='Amaiera Data')