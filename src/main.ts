import * as fs from 'fs'
import { exec } from 'child_process'

import Menu from './menu'
import Server from './server'

export function handler (filePath: string, port: string, ip: string) {
    const menu = new Menu()
    const server = new Server(filePath, port, ip)

    server.get('menu', (request, response) => {
        response.status(200).send(menu.get())
    })

    server.get('open', (request, response) => {
        let path = request.query.path
        fs.readFile(path, (error, result) => {
            if (error) {
                response.status(500).send(error)
            } else {
                response.status(200).send({ text: result.toString('utf8') })
            }
        })
    })

    server.post('save', (request, response) => {
        let path = request.body.path
        let data = request.body.data
        fs.writeFile(path, data, error => {
            if (error) {
                response.status(500).send(error)
            } else {
                response.status(200).send()
            }
        })
    })

    server.post('command', (request, response) => {
        let command = request.body.command
        exec(command, (error, result) => {
            if (error) {
                response.status(500).send(error)
            } else {
                response.status(200).send(result)
            }
        })
    })
}
