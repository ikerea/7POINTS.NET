#ESTA ESTRUCTURA, A LA HORA DE CREAR UN MODULO ESTO ES OBLIGATORIO EN TODOS ELLOS
{
    'name': 'Zinema Sales',
    'version': '1.0',
    'summary': 'Pelikulak saltzeko tokirik hobereena',
    'description': 'Hau pelikulak saltzeko aplikazioa bat da',
    'author': 'Igor Viyuela',
    'category': 'Tools',
    'depends': ['base', 'sale', 'zinema'],
    'data' : [
        'views/sale_order_views.xml'
    ],
    'installable': True,
    'application': False,
}