@echo off
chcp 65001 >nul
set PATH=D:\WorkBuddy\nodejs\node-v22.23.4-win-x64;%PATH%
cd /d "%~dp0"
echo 启动博客本地预览： http://localhost:4321
echo 按 Ctrl+C 停止
echo.
call npx astro dev --port 4321
pause
