const path = require('path')
const copy = require('copy-concurrently')
const MAP_DIR = path.resolve('node_modules/@xdh/my/ui/lib/map/sources')
const TO_DIR = path.resolve('sources')

copy(MAP_DIR, TO_DIR)
