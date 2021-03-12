echo Installing/updating bot dependencies
call npm ci --only=production --loglevel=warn >NUL

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)

echo Bot başlatılıyor...
call npx tsc
call cd dist
call node main

if NOT ["%errorlevel%"]==["0"] (
  pause
  exit /b %errorlevel%
)