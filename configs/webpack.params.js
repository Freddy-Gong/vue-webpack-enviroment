const os = require('os').platform()

module.exports = {
  'require_path': os == 'linux' ? '/usr/local/lib/node_modules/' : '',
  'sprite_limit': 8192,
  'include_host': 'http://dream.163.com',
  'encode': 'utf-8',
  'cdn_path_dist': 'https://test.nie.163.com/test_cdn/dream/pc/zt/20210201145526/',
  'cdn_path_release': 'https://dream.res.netease.com/pc/zt/20210201145526/'
}
