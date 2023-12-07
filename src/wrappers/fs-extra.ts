import {
  copyFile as copyFileOrig,
  ensureDir as ensureDirOrig,
  ensureFile as ensureFileOrig,
  exists as existsOrig,
  readJSON as readJSONOrig,
  readdir as readdirOrig,
  stat as statOrig,
  writeFile as writeFileOrig,
} from 'fs-extra'

export const copyFile = copyFileOrig
export const ensureDir = ensureDirOrig
export const ensureFile = ensureFileOrig
export const exists = existsOrig
export const readdir = readdirOrig
export const readJSON = readJSONOrig
export const stat = statOrig
export const writeFile = writeFileOrig
