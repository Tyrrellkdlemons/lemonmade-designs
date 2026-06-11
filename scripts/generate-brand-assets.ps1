param(
  [string]$OriginalSource,
  [string]$CutoutSource,
  [string]$MarkSource,
  [string]$SocialSource
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $projectRoot "brand\source"
$canonicalOriginal = Join-Path $sourceDir "lemonmade-logo-original.png"
$canonicalCutout = Join-Path $sourceDir "lemonmade-logo-cutout.png"
$canonicalMark = Join-Path $sourceDir "lemonmade-logo-mark.png"
$canonicalSocial = Join-Path $sourceDir "lemonmade-og-card.png"
$logoDir = Join-Path $projectRoot "public\logo"
$ogDir = Join-Path $projectRoot "public\og"

New-Item -ItemType Directory -Force -Path $sourceDir, $logoDir, $ogDir | Out-Null

function Copy-CanonicalSource {
  param(
    [string]$InputPath,
    [Parameter(Mandatory)] [string]$Destination
  )

  if (-not $InputPath) {
    return
  }

  $resolvedSource = (Resolve-Path -LiteralPath $InputPath).Path
  if ($resolvedSource -ne $Destination) {
    Copy-Item -LiteralPath $resolvedSource -Destination $Destination -Force
  }
}

Copy-CanonicalSource -InputPath $OriginalSource -Destination $canonicalOriginal
Copy-CanonicalSource -InputPath $CutoutSource -Destination $canonicalCutout
Copy-CanonicalSource -InputPath $MarkSource -Destination $canonicalMark
Copy-CanonicalSource -InputPath $SocialSource -Destination $canonicalSocial

@(
  $canonicalOriginal,
  $canonicalCutout,
  $canonicalMark,
  $canonicalSocial
) | ForEach-Object {
  if (-not (Test-Path -LiteralPath $_)) {
    throw "Required brand master is missing: $_"
  }
}

function New-TransparentPng {
  param(
    [Parameter(Mandatory)] [string]$InputPath,
    [Parameter(Mandatory)] [string]$OutputPath,
    [Parameter(Mandatory)] [int]$Width,
    [Parameter(Mandatory)] [int]$Height
  )

  $sourceImage = [System.Drawing.Image]::FromFile($InputPath)
  try {
    $bitmap = New-Object System.Drawing.Bitmap $Width, $Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $bitmap.SetResolution($sourceImage.HorizontalResolution, $sourceImage.VerticalResolution)
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $Width, $Height)
      }
      finally {
        $graphics.Dispose()
      }

      $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $bitmap.Dispose()
    }
  }
  finally {
    $sourceImage.Dispose()
  }
}

# Keep the approved full, compact, and social compositions byte-for-byte.
Copy-Item -LiteralPath $canonicalCutout -Destination (Join-Path $logoDir "lemonmade-logo-full.png") -Force
Copy-Item -LiteralPath $canonicalMark -Destination (Join-Path $logoDir "lemonmade-logo-mark.png") -Force
Copy-Item -LiteralPath $canonicalSocial -Destination (Join-Path $ogDir "og-card.png") -Force

New-TransparentPng -InputPath $canonicalCutout -OutputPath (Join-Path $logoDir "lemonmade-logo-720.png") -Width 720 -Height 457
New-TransparentPng -InputPath $canonicalMark -OutputPath (Join-Path $logoDir "favicon-192.png") -Width 192 -Height 192
New-TransparentPng -InputPath $canonicalMark -OutputPath (Join-Path $logoDir "favicon-64.png") -Width 64 -Height 64

Write-Output "Generated transparent LemonMade brand assets from $sourceDir"
