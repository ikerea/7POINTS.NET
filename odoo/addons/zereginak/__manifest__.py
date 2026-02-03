{
    'name': "Zereginak",

    'summary': """
        Pisu bateko zereginak kudeatzeko modulua""",

    'description': """
        Zereginak Modulua
        =================
        Modulu hau pisu bateko zereginak gordetzeko eta kudeatzeko erabiliko da.
        Hemen funtzionalitate berriak eta beharrezko luzapenak gehituko dira.
    """,
    'author': "Pisukide",
    'category': 'Uncategorized',
    'version': '0.1',
    'depends': ['base', 'pisua'],

    # -------------------------------------------------------------------------
    # DATOS (Archivos XML y CSV)
    # -------------------------------------------------------------------------
    # Aquí cargarás tus vistas cuando las crees. 
    # De momento están comentadas para que no te den error al instalar.
    'data': [
        # 'security/ir.model.access.csv',
        # 'views/views.xml',
        # 'views/templates.xml',
    ],
    
    'application': True,
    'installable': True,
    'license': 'LGPL-3',
}