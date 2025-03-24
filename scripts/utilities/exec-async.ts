import { exec } from 'child_process'

export const execAsync = (command: string, options: any) =>
  new Promise((res) => {
    exec(command, options, (error) => res(error === null))
  })
