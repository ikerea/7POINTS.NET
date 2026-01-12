#ESTA ESTRUCTURA, A LA HORA DE CREAR UN MODULO ESTO ES OBLIGATORIO EN TODOS ELLOS
{
    'name': 'Zinema Kudeaketa',
    'version': '1.0',
    'summary': 'Pelikulak kudeatzeko zure tokirik gogokoena',
    'description': 'Hemen gorde zure pelikulak',
    'author': 'Igor Viyuela',
    'category': 'Tools',
    'depends': ['base'],
    'data' : [
        'security/groups.xml',
        'security/ir.model.access.csv',
        'views/pelikula_views.xml'
    ],
    'installable': True,
    'application': True,
}