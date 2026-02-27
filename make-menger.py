import os
import glob
##from distutils.dir_util import copy_tree # distutils was removed in Python 3.12, so we can use shutil.copytree instead
from shutil import copytree

srcfiles = glob.glob('./src/menger/*.ts')
cmd = 'tsc --allowJs -m ES6 -t ES6 --outDir dist --sourceMap --alwaysStrict ' + " ".join(srcfiles) + ' ./src/lib/vue/vue.js'
print('Building TypeScript: ' + cmd)
os.system(cmd)
##copytree('./src/menger/static', './dist')
copytree('./src/menger/static', './dist', dirs_exist_ok=True)
