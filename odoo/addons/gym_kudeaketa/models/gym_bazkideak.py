from odoo import models, fields

class GymKudeaketa(models.Model):
    _name = "gym.bazkideak"
    _description = "Gym bazkideen kudeatzailea"

    name = fields.Char(string="Izena", required=True)
    birth_date = fields.Date(string="Jaiotze data", required=True)
    member_number = fields.Char(string="Bazkide zenbakia", required=True)
    subscription_type = fields.Selection([
       ('monthly', 'Hilerokoa'),
       ('yearly', 'Urtekoa'),
       ('student', 'Ikaslea'),
    ], string="Harpidetza mota", default='monthly')
    active = fields.Boolean(string="Aktiboa?", required=True)
    notes = fields.Text(string="Notak", required=False)