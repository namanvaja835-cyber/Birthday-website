import subprocess
import time
import re
import os
import sys

DESKTOP = r"C:\Users\NAMAN\Desktop"
LINK_FILE = os.path.join(DESKTOP, "Share_With_Her_Link.txt")

def start_tunnel():
    while True:
        try:
            print("Connecting to secure public tunnel...")
            cmd = [
                "ssh",
                "-o", "StrictHostKeyChecking=no",
                "-o", "ServerAliveInterval=30",
                "-o", "ServerAliveCountMax=3",
                "-R", "80:localhost:5000",
                "nokey@localhost.run"
            ]
            process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            
            public_url = None
            start_time = time.time()
            
            while process.poll() is None:
                line = process.stdout.readline()
                if line:
                    line_str = line.strip()
                    print(line_str)
                    match = re.search(r"https://[a-zA-Z0-9\-\.]+\.lhr\.life", line_str)
                    if match and not public_url:
                        public_url = match.group(0)
                        print(f"\n>>> ACTIVE PUBLIC HTTPS LINK: {public_url} <<<\n")
                        
                        # Write to Desktop text file for user
                        with open(LINK_FILE, "w", encoding="utf-8") as f:
                            f.write("=====================================================\n")
                            f.write("💖 ROMANTIC BIRTHDAY SURPRISE - LIVE PUBLIC LINK 💖\n")
                            f.write("=====================================================\n\n")
                            f.write("Send this exact link to your girlfriend on WhatsApp or SMS:\n\n")
                            f.write(f"👉 {public_url}\n\n")
                            f.write("She can open this link on her iPhone, Android phone,\n")
                            f.write("iPad, Mac, or any computer anywhere in the world!\n\n")
                            f.write("Local Wi-Fi Network Link (if on same Wi-Fi):\n")
                            f.write("👉 http://192.168.0.101:5000\n\n")
                            f.write("=====================================================\n")
                            f.write("Keep this running while she is viewing the surprise! ❤️\n")
                            f.write("=====================================================\n")
                
                time.sleep(0.1)
                
        except Exception as e:
            print("Tunnel error:", e)
            
        print("Reconnecting in 5 seconds...")
        time.sleep(5)

if __name__ == "__main__":
    start_tunnel()
