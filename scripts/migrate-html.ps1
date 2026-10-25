$ErrorActionPreference = 'Stop'

$sourcePath = Join-Path $PSScriptRoot '..\index.html'
$source = [System.IO.File]::ReadAllText($sourcePath, [System.Text.Encoding]::UTF8)
$singleLine = [System.Text.RegularExpressions.RegexOptions]::Singleline

$styles = [regex]::Matches($source, '<style[^>]*>(.*?)</style>', $singleLine) |
  ForEach-Object { $_.Groups[1].Value }

$bodyMatch = [regex]::Match($source, '<body[^>]*>(.*)</body>', $singleLine)
if (-not $bodyMatch.Success) {
  throw 'Could not find the body element in index.html.'
}

$body = $bodyMatch.Groups[1].Value
$body = [regex]::Replace($body, '<style[^>]*>.*?</style>', '', $singleLine)
$body = [regex]::Replace($body, '<script[^>]*>.*?</script>', '', $singleLine)
$body = [regex]::Replace($body, '<meta\b[^>]*>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$body = [regex]::Replace($body, '<title[^>]*>.*?</title>', '', $singleLine)
$body = [regex]::Replace($body, '<link\b[^>]*>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$body = $body.Trim()

$inlineScripts = [regex]::Matches($source, '<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', $singleLine)
if ($inlineScripts.Count -eq 0) {
  throw 'Could not find the application script in index.html.'
}

$publicPath = Join-Path $PSScriptRoot '..\public'
$audioPath = Join-Path $publicPath 'audio'
New-Item -ItemType Directory -Force -Path $publicPath, $audioPath | Out-Null

[System.IO.File]::WriteAllText((Join-Path $PSScriptRoot '..\app\globals.css'), (($styles -join "`r`n`r`n") + "`r`n#neuro-root{display:contents}`r`n"), [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $publicPath 'neuro-content.html'), $body, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $publicPath 'neuro.js'), $inlineScripts[$inlineScripts.Count - 1].Groups[1].Value, [System.Text.UTF8Encoding]::new($false))
Copy-Item -LiteralPath (Join-Path $PSScriptRoot '..\audio\neuro-theme.mp3') -Destination (Join-Path $audioPath 'neuro-theme.mp3') -Force

Write-Output 'Extracted CSS, page markup, client JavaScript, and audio assets.'
