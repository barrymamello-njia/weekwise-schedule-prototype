"""Update the one-file application's exact inline-script CSP hash."""
from pathlib import Path
import base64
import hashlib
import re

source = Path(__file__).resolve().parent / 'index.html'
html = source.read_text()
scripts = re.findall(r'<script>([\s\S]*?)</script>', html)
if len(scripts) != 1:
    raise SystemExit('Expected exactly one inline application script.')
digest = base64.b64encode(hashlib.sha256(scripts[0].encode()).digest()).decode()
html, count = re.subn(r"script-src 'sha256-[A-Za-z0-9+/=]+'", "script-src 'sha256-" + digest + "'", html)
if count != 1:
    raise SystemExit('Expected exactly one script-hash policy.')
source.write_text(html)
print('Inline-script security policy updated.')
