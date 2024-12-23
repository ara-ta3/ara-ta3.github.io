import type { Config } from 'vike/types'

export const config = {
    meta: {
        title: {
            env: { server: false, client: true }
        },
        description: {
            env: { server: false, client: true }
        },
    } 
} satisfies Config
