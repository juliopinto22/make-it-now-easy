@echo off
del /q /f /s "%TEMP%\*"
del /q /f /s "C:\Windows\Temp\*"
ipconfig /flushdns
echo Limpeza concluida!
pause
