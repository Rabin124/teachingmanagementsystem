import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript'

@Table({
  tableName: 'users', // Ensure the table name matches your database schema
  modelName: 'User', // Model name for Sequelize
  timestamps: true
})

class User extends Model{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // Automatically generate a UUID
    // autoIncrement: true,
    // allowNull: false
  })
  @Column({
    type: DataType.STRING,
    // allowNull: false
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    // allowNull: false
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true, // Ensure email is unique
    // allowNull: false
  })
  declare email: string;

  @Column({
    type: DataType.ENUM('teacher','institute','super-admin','student'),
    defaultValue: 'student',
    // allowNull: false
  })
  declare role:string
}

export default User;