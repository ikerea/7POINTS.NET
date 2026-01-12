#ESTA ESTRUCTURA, A LA HORA DE CREAR UN MODULO ESTO ES OBLIGATORIO EN TODOS ELLOS
{
    'name': 'Zinema Project',
    'version': '1.0',
    'summary': 'Pelikulak proiektu moduluan integratu',
    'description': 'Hau pelikulak saltzeko aplikazioa bat da',
    'author': 'Igor Viyuela',
    'category': 'Tools',
    'depends': ['base', 'project', 'zinema'],
    'data' : [
        'views/project_views.xml'
    ],
    'installable': True,
    'application': False,
}