"""Dev server that refuses to let the browser cache anything.

python -m http.server sends Last-Modified with no Cache-Control, so browsers apply
heuristic freshness and happily serve a stale index.html after an edit. That turns
every iteration into "did it not work, or did I not see it?". This sends no-store
and answers conditional requests with a fresh 200 instead of a 304.
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def send_header(self, keyword, value):
        # Drop the validator entirely so no conditional request can ever 304.
        if keyword == "Last-Modified":
            return
        super().send_header(keyword, value)

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    root = sys.argv[2] if len(sys.argv) > 2 else "."
    import os
    os.chdir(root)
    print(f"serving {os.getcwd()} on http://localhost:{port} (no-store)")
    ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler).serve_forever()
