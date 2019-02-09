module.exports = {
  transform: {
    '^.+\\.js?$': '../../.config/wrapper.js'
  },
  modulePathIgnorePatterns: ['<rootDir>/build/']
}
