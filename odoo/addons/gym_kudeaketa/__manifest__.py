{
    'name': 'Gym Bazkidetza',
    'version': '1.0',
    'summary': 'Gym baten bazkidetza',
    'description': 'Gimnasio bateko bazkideak kudeatzen dituen modulua',
    'author': 'Igor Viyuela',
    'category': 'Tools',
    'depends': ['base'],
    'data': [
        'security/groups.xml',
        'security/ir.model.access.csv',
        'views/gym_bazkideak_views.xml'
    ],
    'installable': True,
    'application': True,
}