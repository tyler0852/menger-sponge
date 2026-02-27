# menger-sponge

## Authors
Tyler O'Brien (tjo656)
Nina De La Torre (nnd389)

## Notes:

- `make-menger.py` has been edited to assume the user is using the latest version of Python 3.12+

## Getting Started on macOS

Things you will need to compile TypeScript and run the program in your browser:
- Node.js + npm (recommended via nvm)
- TypeScript compiler (tsc)
- http-server
- Python 3

1) Install nvm (Node Version Manager)

Run the official installer:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Make sure to reload your source file (should only have to do this once):
```bash
source ~/.zshrc
```
  
If you want to verify:
```bash
command -v nvm
nvm --version
```

2) Install Node (LTS)
Install and use the latest LTS version:
```bash
nvm install --lts
nvm use --lts
node -v
npm -v
```

Make LTS the default for new terminals:
If you want to make LTS the defualt node that nvm uses:
```bash
nvm alias default 'lts/*'
```

3) Install required global tools
Install the TypeScript compiler and a local HTTP server:
```bash
npm install -g typescript http-server
tsc -v
http-server -v
```

## Running the Program

From the project root:

1) Build the web bundle:
```bash
python3 make-menger.py
```
This compiles the TypeScript sources in src/ and produces the runnable site in dist/.

2) Start the local server:
```bash
http-server dist -c-1
```

3) Open the port in your browser:
[http://127.0.0.1:8080](http://127.0.0.1:8080)
