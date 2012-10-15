class FixUsers < ActiveRecord::Migration
  def up
   create_table(:users) do |t|
      t.string :name, :null => false
      t.string :password_hash, :null => false
      t.string :password_salt, :null => false
      t.references :map
      t.references :server
      t.timestamps
    end
  end
end
