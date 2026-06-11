param(
  [string]$Source
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$canonicalSource = Join-Path $projectRoot "brand\source\lemonmade-logo-original.png"
$logoDir = Join-Path $projectRoot "public\logo"
$ogDir = Join-Path $projectRoot "public\og"

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $canonicalSource), $logoDir, $ogDir | Out-Null

if ($Source) {
  $resolvedSource = (Resolve-Path -LiteralPath $Source).Path
  if ($resolvedSource -ne $canonicalSource) {
    Copy-Item -LiteralPath $resolvedSource -Destination $canonicalSource -Force
  }
}

if (-not (Test-Path -LiteralPath $canonicalSource)) {
  throw "Canonical source is missing. Pass -Source with the supplied LemonMade logo."
}

function New-BrandImage {
  param(
    [Parameter(Mandatory)] [string]$InputPath,
    [Parameter(Mandatory)] [string]$OutputPath,
    [Parameter(Mandatory)] [int]$Width,
    [Parameter(Mandatory)] [int]$Height,
    [System.Drawing.Rectangle]$Crop,
    [switch]$Contain,
    [ValidateSet("Png", "Jpeg")] [string]$Format = "Png"
  )

  $sourceImage = [System.Drawing.Image]::FromFile($InputPath)
  try {
    $bitmap = New-Object System.Drawing.Bitmap $Width, $Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

        if ($Contain) {
          $graphics.Clear([System.Drawing.Color]::FromArgb(255, 2, 8, 23))
          $sourceRectangle = if ($Crop) {
            $Crop
          }
          else {
            New-Object System.Drawing.Rectangle 0, 0, $sourceImage.Width, $sourceImage.Height
          }
          $scale = [Math]::Min($Width / $sourceRectangle.Width, $Height / $sourceRectangle.Height)
          $drawWidth = [int][Math]::Round($sourceRectangle.Width * $scale)
          $drawHeight = [int][Math]::Round($sourceRectangle.Height * $scale)
          $x = [int](($Width - $drawWidth) / 2)
          $y = [int](($Height - $drawHeight) / 2)
          $destination = New-Object System.Drawing.Rectangle $x, $y, $drawWidth, $drawHeight
          $graphics.DrawImage(
            $sourceImage,
            $destination,
            $sourceRectangle,
            [System.Drawing.GraphicsUnit]::Pixel
          )
        }
        elseif ($Crop) {
          $destination = New-Object System.Drawing.Rectangle 0, 0, $Width, $Height
          $graphics.DrawImage($sourceImage, $destination, $Crop, [System.Drawing.GraphicsUnit]::Pixel)
        }
        else {
          $graphics.DrawImage($sourceImage, 0, 0, $Width, $Height)
        }
      }
      finally {
        $graphics.Dispose()
      }

      if ($Format -eq "Jpeg") {
        $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
          Where-Object { $_.MimeType -eq "image/jpeg" } |
          Select-Object -First 1
        $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters 1
        $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
          [System.Drawing.Imaging.Encoder]::Quality,
          [long]90
        )
        try {
          $bitmap.Save($OutputPath, $jpegEncoder, $encoderParameters)
        }
        finally {
          $encoderParameters.Dispose()
        }
      }
      else {
        $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
      }
    }
    finally {
      $bitmap.Dispose()
    }
  }
  finally {
    $sourceImage.Dispose()
  }
}

$markCrop = New-Object System.Drawing.Rectangle 390, 20, 720, 430

@(
  (Join-Path $logoDir "lemonmade-logo.png"),
  (Join-Path $logoDir "lemonmade-logo-md.png"),
  (Join-Path $logoDir "lemonmade-logo-full.png"),
  (Join-Path $logoDir "lemonmade-logo-mark.png"),
  (Join-Path $ogDir "og-image.png")
) | ForEach-Object {
  if (Test-Path -LiteralPath $_) {
    Remove-Item -LiteralPath $_ -Force
  }
}

New-BrandImage -InputPath $canonicalSource -OutputPath (Join-Path $logoDir "lemonmade-logo-full.jpg") -Width 1200 -Height 800 -Format Jpeg
New-BrandImage -InputPath $canonicalSource -OutputPath (Join-Path $logoDir "lemonmade-logo-md.jpg") -Width 900 -Height 600 -Format Jpeg
New-BrandImage -InputPath $canonicalSource -OutputPath (Join-Path $logoDir "lemonmade-logo-mark.jpg") -Width 512 -Height 512 -Crop $markCrop -Contain -Format Jpeg
New-BrandImage -InputPath $canonicalSource -OutputPath (Join-Path $logoDir "favicon-192.png") -Width 192 -Height 192 -Crop $markCrop -Contain
New-BrandImage -InputPath $canonicalSource -OutputPath (Join-Path $logoDir "favicon-64.png") -Width 64 -Height 64 -Crop $markCrop -Contain
New-BrandImage -InputPath $canonicalSource -OutputPath (Join-Path $ogDir "og-image.jpg") -Width 1200 -Height 630 -Contain -Format Jpeg

Write-Output "Generated LemonMade brand assets from $canonicalSource"
