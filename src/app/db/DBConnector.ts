import mongoose from 'mongoose'
import dbConfig from 'Configs/database'
import LogHelper from 'Helpers/LogHelper'

export default class DBConnector {
  /**
   * Connect to database and set connection event listeners.
   */
  public async connect(): Promise<void> {
    // open the database connection
    await mongoose.connect(dbConfig.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    mongoose.connection.on('error', err => {
      LogHelper.log(
        'info',
        'Mongoose default connection has occured ' + err + ' error'
      )
    })

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        LogHelper.log(
          'error',
          'Mongoose default connection is disconnected due to application termination'
        )
        process.exit(0)
      })
    })
  }
}
