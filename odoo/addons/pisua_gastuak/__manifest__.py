{
    'name': 'Gastos de Pisukide',
    'version': '1.0',
    'summary': 'Conecta los gastos de Odoo (hr_expense) con los pisos (pisua)',
    'author': 'Igor Viyuela',
    'category': 'Accounting',
    'depends': ['base', 'hr_expense', 'pisua'],
    'data': [
        'views/pisua_gastuak_view.xml',
    ],
    'installable': True,
    'application': False,
}