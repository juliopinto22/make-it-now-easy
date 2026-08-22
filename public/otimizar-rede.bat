@echo off
netsh int ip reset
netsh winsock reset
ipconfig /flushdns
echo Rede otimizada!
pause
