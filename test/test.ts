import fs from 'fs'
import path from 'path'
import { test } from 'uvu'
import { execa } from 'execa'
import assert from 'uvu/assert'
import fetch from 'node-fetch'

const waitOn = (url: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          return res.ok ? resolve(true) : resolve(waitOn(url))
        })
        .catch(() => {
          return resolve(waitOn(url))
        })
    }, 50)
  })

test('build', async () => {
  await execa('npm', ['run', 'build-fixture'])
  const output = fs.readFileSync(
    path.join(__dirname, 'fixture/dist/index.js'),
    'utf-8',
  )
  assert.not.match(output, 'this_export_is_removed')
})

test('dev', async () => {
  const cmd = execa('npm', ['run', 'dev-fixture'])
  await waitOn('http://localhost:3737')

  const contents = await fetch(`http://localhost:3737/foo.ts`).then((res) =>
    res.text(),
  )
  assert.not.match(contents, 'this_export_is_removed')
  cmd.kill()
})

test.run()
