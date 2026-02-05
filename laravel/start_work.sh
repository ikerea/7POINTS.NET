#!/bin/bash

# Cargar variables de entorno de AWS (IMPORTANTE: Sin esto falla la conexión a BD/Odoo)
source /opt/elasticbeanstalk/support/envvars

# Si el script se detiene, matar los subprocesos
trap "kill 0" EXIT

echo "🚀 Iniciando orquestador de Laravel..."

# 1. Arrancar el Scheduler (Cron) en segundo plano
# (schedule:work ejecuta el cron cada minuto sin necesidad de configurar crontab en linux)
php artisan schedule:work &
PID_SCHED=$!
echo "[v] Scheduler iniciado (PID: $PID_SCHED)"

# 2. Arrancar los Workers (Colas) en segundo plano
php artisan queue:work --tries=3 --timeout=90 &
PID_QUEUE=$!
echo "[v] Queue Worker iniciado (PID: $PID_QUEUE)"

echo "-----------------------------------"
echo "Servicios corriendo. Esperando..."

# Mantener el script vivo mientras los procesos funcionen
wait