import {Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({
  tableName: 'users', // Ensure the table name matches your database schema
  modelName: 'User', // Model name for Sequelize
  timestamps: true
})

class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;
}
