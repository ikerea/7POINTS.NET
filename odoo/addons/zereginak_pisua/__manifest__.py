{
    'name': 'Pisuko Zereginak Lista'
    '',
    'version': '1.0',
    'summary': 'Pisuko zeregin guztiak listatzen duen extensioa',
    'depends': ['base', 'pisua'],  # <--- IMPORTANTE: Depende de tu módulo base
    'data': [
        'security/ir.model.access.csv',
        'views/zereginak_view.xml',
    ],
    'installable': True,
    'application': False,
}