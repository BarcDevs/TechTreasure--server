import config from 'config'

interface NodeConfig {
  env: string
  port: string
  protocol: string
  host: string
  origin: string
  url: string
}

const nodeConfig: NodeConfig = {
  env: config.get<string>('env'),
  port: config.get<string>('port'),
  protocol: config.get<string>('protocol'),
  host: config.get<string>('host'),
  origin: config.get<string>('origin'),
  url: config.get<string>('url')
}

export default nodeConfig
